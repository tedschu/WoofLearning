const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Creates a new user via registration, adds a token
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      security_question_1,
      security_answer_1,
      security_question_2,
      security_answer_2,
    } = req.body;

    // Checks to see if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists.",
      });
    }

    if (
      !email ||
      !username ||
      !password ||
      !security_question_1 ||
      !security_answer_1 ||
      !security_question_2 ||
      !security_answer_2
    ) {
      return res
        .status(400)
        .json({ error: "Make sure you've filled out all fields." });
    }

    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        security_question_1: req.body.security_question_1,
        security_answer_1: req.body.security_answer_1,
        security_question_2: req.body.security_question_2,
        security_answer_2: req.body.security_answer_2,
        total_logins: 1,
        last_login: new Date().toISOString(),
        score_math: {
          create: {
            addition_score: 0,
            subtraction_score: 0,
            multiplication_score: 0,
            division_score: 0,
          },
        },
        badge_math: {
          create: {
            Level_1_1: false,
          },
        },
        score_reading: {
          create: {
            score: 0,
          },
        },
        badge_reading: {
          create: {
            Level_1_1: false,
          },
        },
      },
      include: {
        score_math: true,
        badge_math: true,
        score_reading: true,
        badge_reading: true,
      },
    });

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: { id: newUser.id, username: newUser.username },
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        total_logins: newUser.total_logins,
        last_login: newUser.last_login,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Logs in a user if user exists, adds token
// Increments login_count and updates last_login (accessible in user GET, but can add updateUserStats to res.send if needed)
router.post("/login", async (req, res) => {
  try {
    //gets user and pass from body
    const username = req.body.username;
    const password = req.body.password;

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    //checks if the user exists
    const userMatch = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!userMatch) {
      res.status(401).send({ message: "Invalid login credentials" });
    }

    const passMatch = await bcrypt.compare(password, userMatch.password);
    if (!passMatch) {
      res.status(401).send({ message: "Invalid login credentials" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        total_logins: {
          increment: 1,
        },
        last_login: new Date().toISOString(),
      },
    });

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: { id: userMatch.id, username: userMatch.username },
      },
      process.env.JWT_SECRET
    );
    res.status(200).send({ token: token, id: userMatch.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// validate and find user info
router.get("/find-username/:email", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          equals: req.params.email,
          mode: "insensitive",
        },
      },
      select: {
        username: true,
      },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No user was found with this email" });
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Returns security questions for a given username
// Part of password recovery process
router.get("/get-questions/:username", async (req, res) => {
  try {
    const users = await prisma.user.findFirst({
      where: {
        username: {
          equals: req.params.username,
          mode: "insensitive",
        },
      },
      select: {
        security_question_1: true,
        security_question_2: true,
      },
    });

    console.log(users);

    if (!users) {
      return res.status(404).json({ message: "This username does not exist" });
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const maxAnswerAttempts = 4;
let answerAttempts = 0;

// Takes in a user's security answer inputs and verifies if they match
router.post("/check-answers", async (req, res) => {
  try {
    console.log("Request body: ", req.body);
    //gets username and security answers
    const { username, security_answer_1, security_answer_2 } = req.body;

    if (answerAttempts >= maxAnswerAttempts) {
      return res.status(400).json({
        message: "You have maxed out your answer attempts. Try again later.",
      });
    }

    //checks if the user exists
    const answerMatch = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: {
        security_answer_1: true,
        security_answer_2: true,
        username: true,
      },
    });

    if (!answerMatch) {
      return res.status(400).json({ message: "User not found." });
    }
    console.log("answerAttempts: ", answerAttempts);

    if (
      security_answer_1.toLowerCase() ==
        answerMatch.security_answer_1.toLowerCase() &&
      security_answer_2.toLowerCase() ==
        answerMatch.security_answer_2.toLowerCase()
    ) {
      return res
        .status(200)
        .json({ message: "Success", username: answerMatch.username });
    } else {
      answerAttempts++;
      return res.status(400).json({ message: "Your answers don't match." });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Allows user to reset password
router.put("/reset-password", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (password.length == 0) {
      return res
        .status(400)
        .json({ message: "Make sure you enter a new password." });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    const updatePassword = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
      },
    });

    if (updatePassword) {
      res.status(200).json({ message: "Password successfully updated." });
    } else {
      res.status(400).json({ message: "Password not updated." });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
