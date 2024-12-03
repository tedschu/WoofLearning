const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utilities/verifyToken");

const prisma = new PrismaClient();

// Gets a single user: user data, scores, badges
// validate and find user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.user),
      },
      include: {
        score_math: true,
        badge_math: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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

module.exports = router;
