const express = require("express");
const jwt = require("jsonwebtoken");

// Middleware to verify token and allow for loading of user data
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(500).send({ error: "No token was provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err)
      return res.status(403).send({ error: "Failed to authenticate token." });

    req.user = decodedUser.data.id;

    next();
  });
}

module.exports = { verifyToken };
