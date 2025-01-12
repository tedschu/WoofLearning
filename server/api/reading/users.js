const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utilities/verifyToken");

const prisma = new PrismaClient();

// Updates a score_reading for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/score", verifyToken, async (req, res) => {
  try {
    const score = await prisma.score_reading.update({
      where: {
        user_id: parseInt(req.user),
      },
      data: req.body,
    });
    res.status(200).send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPdates a badge for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/badge", verifyToken, async (req, res) => {
  try {
    const badge = await prisma.badge_reading.update({
      where: {
        user_id: parseInt(req.user),
      },
      data: req.body,
    });
    res.status(200).send(badge);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
