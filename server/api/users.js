const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utilities/verifyToken");

const prisma = new PrismaClient();

// Deletes a user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user);

    await prisma.score_math.deleteMany({
      where: { user_id: userId },
    });

    await prisma.badge_math.deleteMany({
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
    console.log(hashPassword, req.user);

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.user),
      },
      data: {
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

module.exports = router;
