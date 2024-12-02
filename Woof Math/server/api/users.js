const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utilities/verifyToken");

const prisma = new PrismaClient();

// WORKS: Gets a single user
// validate and find user info
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.user),
      },
      include: {
        score: true,
        badge: true,
        game_state: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deletes a user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user);

    await prisma.score.deleteMany({
      where: { user_id: userId },
    });

    await prisma.badge.deleteMany({
      where: { user_id: userId },
    });

    await prisma.game_state.deleteMany({
      where: { user_id: userId },
    });

    await prisma.score_reading.deleteMany({
      where: { user_id: userId },
    });

    await prisma.badge_reading.deleteMany({
      where: { user_id: userId },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

// Update a user (ex update email or password)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.user),
      },
      data: {
        // name: req.body.name,
        birth_year: req.body.birth_year,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// UPdates a score for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/score", verifyToken, async (req, res) => {
  try {
    const score = await prisma.score.update({
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

// UPdates a badge for a given user (e.g. on submit button in gamePlay)
router.put("/:user_id/badge", verifyToken, async (req, res) => {
  try {
    const badge = await prisma.badge.update({
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
