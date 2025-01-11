const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utilities/verifyToken");
const { connect } = require("http2");

const prisma = new PrismaClient();

// Updates a score for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/score", verifyToken, async (req, res) => {
  try {
    const score = await prisma.score_math.update({
      where: {
        user_id: parseInt(req.user),
      },
      data: req.body,
    });
    res.send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Updates a badge for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/badge", verifyToken, async (req, res) => {
  try {
    const badge = await prisma.badge_math.update({
      where: {
        user_id: parseInt(req.user),
      },
      data: req.body,
    });
    res.send(badge);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds a new data row for a user's timed challenge data in math_timed_challenge table (inc. score, timestamp, math_type, level, questions_attempted, questions_correct)
router.post("/timed-challenge", verifyToken, async (req, res) => {
  try {
    const testResult = await prisma.math_timed_scores.create({
      data: {
        user: {
          connect: { id: req.body.user_id },
        },
        timestamp: new Date().toISOString(),
        math_type: req.body.math_type,
        level: req.body.level,
        points_added: req.body.points_added,
        questions_attempted: req.body.questions_attempted,
        questions_correct: req.body.questions_correct,
        // ALSO PASSES THE INCORRECT EQUATIONS TO THE Incorrect_question TABLE
        incorrect_questions: {
          create: req.body.incorrect_questions.map((question) => ({
            equation: question.equation,
            user: {
              connect: { id: req.body.user_id },
            },
          })),
        },
      },
      include: {
        incorrect_questions: true,
      },
    });

    return res.status(200).send(testResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to save challenge result" });
  }
});

// Route to pull results summary data for timed challenges (on account / results screen)
router.get(
  "/timed-challenge/summary-results",
  verifyToken,
  async (req, res) => {
    try {
      // Pulls count of total challenges taken for a given user
      const totalChallenges = await prisma.math_timed_scores.count({
        where: {
          user_id: parseInt(req.user), // pulls user_id from middleware verifyToken
        },
      });

      // Pulls count of the type of challenge (math_type) that the user has completed most frequently
      const mostFrequentChallenge = await prisma.math_timed_scores.groupBy({
        by: ["math_type"],
        where: {
          user_id: parseInt(req.user),
        },
        _count: {
          math_type: true,
        },
        orderBy: {
          _count: {
            math_type: "desc",
          },
        },
        take: 1,
      });

      // Pulls data to show overall % score (average) for all challenges
      const questionScores = await prisma.math_timed_scores.aggregate({
        where: {
          user_id: parseInt(req.user),
        },
        _sum: {
          questions_attempted: true,
          questions_correct: true,
        },
      });

      const percentScore = Math.round(
        (questionScores._sum.questions_correct /
          questionScores._sum.questions_attempted) *
          100
      );

      // Pulls summed scores (points_added) from all challenges to show an aggregate total
      const totalPoints = await prisma.math_timed_scores.aggregate({
        where: {
          user_id: parseInt(req.user),
        },
        _sum: {
          points_added: true,
        },
      });

      // Pulls data to show overall % score (average) for last 10 challenges (to pass to Anthropic)
      const questionScoresLastTen = await prisma.math_timed_scores.aggregate({
        where: {
          user_id: parseInt(req.user),
        },
        orderBy: {
          id: "desc",
        },
        _sum: {
          questions_attempted: true,
          questions_correct: true,
        },
        take: 10,
      });

      const percentScoreLastTen = Math.round(
        (questionScoresLastTen._sum.questions_correct /
          questionScoresLastTen._sum.questions_attempted) *
          100
      );

      res.status(200).send({
        totalChallenges,
        mostFrequentChallenge: mostFrequentChallenge[0] || null,
        percentScore,
        totalPoints,
        percentScoreLastTen,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

// Route to pull incorrect equations for the last 10 timed challenges - passes to Anthropic API
router.get(
  "/timed-challenge/incorrect-equations",
  verifyToken,
  async (req, res) => {
    try {
      // ** TODO: First, groupBy to get a list of the last 10 (highest, desc) challenge_ids stored in a variable.
      // Second, to use findMany to pull all records associated with the challenge_ids in teh stored variable

      // Pulls the last (most recent) 10 challenge_ids for a given user
      const lastTenChallengeIds = await prisma.incorrect_question.groupBy({
        by: ["challenge_id"],
        where: {
          user_id: parseInt(req.user),
        },
        orderBy: {
          challenge_id: "desc",
        },
        take: 10,
      });

      // Pulls all incorrect equations for a given user for the last 10 challenges (by challenge_ids specified in lastTenChallengeIds above)
      const incorrectEquationsLastTen =
        await prisma.incorrect_question.findMany({
          where: {
            user_id: parseInt(req.user),
            challenge_id: {
              in: lastTenChallengeIds.map((id) => id.challenge_id),
            },
          },
          orderBy: {
            challenge_id: "desc",
          },
        });

      res.status(200).send({
        //lastTenChallengeIds,
        incorrectEquationsLastTen,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
