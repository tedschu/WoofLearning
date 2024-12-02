const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Sends Woof Reading interest email with username
router.post("/submit-username", async (req, res) => {
  const { username } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Woof Reading" <wooflearning@gmail.com>',
      to: "wooflearning@gmail.com",
      subject: "New request for Woof Reading access",
      text: `A new user, ${username}, has requested access.`,
      html: `<p>A new user, ${username}, has requested access.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Username submitted successfully." });
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).json({ error: "Failed to submit username." });
  }
});

// Gets all scores
router.get("/", async (req, res) => {
  try {
    const score = await prisma.score_reading.findMany({
      include: {
        user: true,
      },
    });
    res.send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
