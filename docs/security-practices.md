# Woof Learning Security Practices Documentation

## Overview

This document outlines the security practices implemented in the Woof Reading application. It covers authentication, data protection, API security, and general web application security best practices.

## Authentication

### JWT (JSON Web Tokens)

- Used for stateless authentication
- Implemented in `auth/index.js`

#### Token Generation

```javascript
const token = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48, // 48 hour expiration
    data: { id: userMatch.id, username: userMatch.username },
  },
  process.env.JWT_SECRET
);
```

#### Token Verification

- Middleware: `utilities/verifyToken.js`

```javascript
jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
  if (err)
    return res.status(403).send({ error: "Failed to authenticate token." });
  req.user = decodedUser.data.id;
  next();
});
```

### Password Security

- Passwords are hashed using bcrypt before storage
- Implemented in `auth/index.js`

```javascript
const saltRounds = 10;
const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
```

### Password Recovery Attempt Limiting

- Implemented for security question answers in `auth/index.js`

```javascript
const maxAnswerAttempts = 4;
let answerAttempts = 0;
```

## Data Protection

### Environment Variables

- Sensitive data (API keys, database credentials) stored in `.env` file
- Loaded using `dotenv` package

### Database Security

- Using Prisma ORM to prevent SQL injection
- Parameterized queries are used throughout

### Input Validation

- Client-side and server-side validation implemented
- Example in `GamePlay.jsx`:

```javascript
if (checkBadWords() === true) {
  setErrorText("Please only use nice words.");
} else {
  // Proceed with submission
}
```

## API Security

### Anthropic API

- API key stored as an environment variable
- Requests to Anthropic API are made server-side to prevent exposing the API key

## Frontend Security

### localStorage Usage

- JWTs stored in localStorage

### Content Security Policy

- Content Security Policy has been implemented using the Helmet middleware to enhance protection against Cross-Site Scripting (XSS) attacks and other injection vulnerabilities.

#### Implementation

The CSP is configured in the main server file using Helmet:

```javascript
const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.anthropic.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
      workerSrc: ["'none'"],
    },
  })
);
```

#### Policy Details

- **defaultSrc**: Restricts resource loading to the same origin by default.
- **scriptSrc**: Allows scripts only from the same origin, preventing inline scripts and eval().
- **styleSrc**: Allows styles from the same origin and Google Fonts, preventing inline styles.
- **imgSrc**: Permits images from the same origin and data URIs.
- **fontSrc**: Allows fonts from the same origin and Google Fonts.
- **connectSrc**: Enables connections to the same origin and the Anthropic API.
- **frameSrc** and **objectSrc**: Set to 'none' to prevent use of iframes and plugins.
- **upgradeInsecureRequests**: Upgrades HTTP requests to HTTPS.
- **workerSrc**: Set to 'none' to prevent Web Workers, as they are not currently used in the application.

## User Data Handling

### Data Minimization

- Only necessary user data is collected and stored

### Data Deletion

- Users can delete their account, which removes all associated data
- Implemented in `api/users.js`:

```javascript
router.delete("/:id", verifyToken, async (req, res) => {
  // Delete user data from all related tables
});
```

## Logging and Monitoring

- Basic request logging implemented using Morgan:

```javascript
app.use(morgan("dev"));
```
