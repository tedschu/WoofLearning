# Woof Math Authentication System Documentation

## Table of Contents

1. Overview
2. Technologies Used
3. User Registration
4. User Login
5. Password Reset Process
6. JWT (JSON Web Token)
7. Token Verification
8. Security Measures
9. API Endpoints

## Overview

The Woof Math application uses a JWT (JSON Web Token)-based authentication system. This system provides secure user registration, login, and password reset functionalities, as well as protected routes that require authentication.

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt (for password hashing)
- PostgreSQL (as the database)

## User Registration

1. **Process:**

   - User submits registration data (email, username, password, security questions and answers).
   - Server validates the data.
   - Password is hashed using bcrypt.
   - User data is stored in the database.
   - A JWT is generated and returned to the client.

2. **Security Measures:**

   - Passwords are hashed before storage.
   - Email and username uniqueness is enforced.
   - Security questions are used for account recovery.

3. **Code Snippet:**
   ```javascript
   const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
   const newUser = await prisma.user.create({
     data: {
       email: req.body.email,
       username: req.body.username,
       password: hashPassword,
       // ... other fields
     },
   });
   ```

## User Login

1. **Process:**

   - User submits username and password.
   - Server validates the credentials.
   - If valid, a JWT is generated and returned.

2. **Security Measures:**

   - Passwords are compared using bcrypt.
   - Login attempts are tracked (total_logins field).

3. **Code Snippet:**
   ```javascript
   const passMatch = await bcrypt.compare(password, userMatch.password);
   if (passMatch) {
     const token = jwt.sign(
       {
         exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
         data: { id: userMatch.id, username: userMatch.username },
       },
       process.env.JWT_SECRET
     );
     res.status(200).send({ token: token, id: userMatch.id });
   }
   ```

## Password Reset Process

1. **Steps:**

   - User requests password reset by providing their username.
   - System retrieves security questions for the user.
   - User answers security questions.
   - If answers are correct, user can set a new password.

2. **Security Measures:**

   - Limited attempts for answering security questions.
   - New password is hashed before storage.

3. **Code Snippet:**
   ```javascript
   const hashPassword = await bcrypt.hash(password, saltRounds);
   const updatePassword = await prisma.user.update({
     where: { id: user.id },
     data: { password: hashPassword },
   });
   ```

## JWT (JSON Web Token)

1. **Structure:**

   - Header: Contains token type and hashing algorithm.
   - Payload: Contains claims (user id, username, expiration time).
   - Signature: Ensures token integrity.

2. **Configuration:**

   - Tokens expire after 48 hours.
   - Token secret is stored in environment variables.

3. **Usage:**
   - Tokens are included in the Authorization header of requests.
   - Format: `Authorization: Bearer <token>`

## Token Verification

1. **Process:**

   - Extract token from Authorization header.
   - Verify token signature and expiration.
   - If valid, attach user ID to the request object.

2. **Code Snippet:**
   ```javascript
   function verifyToken(req, res, next) {
     const authHeader = req.headers["authorization"];
     const token = authHeader.split(" ")[1];
     jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
       if (err)
         return res
           .status(403)
           .send({ error: "Failed to authenticate token." });
       req.user = decodedUser.data.id;
       next();
     });
   }
   ```

## Security Measures

1. **Password Hashing:** All passwords are hashed using bcrypt before storage.
2. **JWT Secret:** Stored in environment variables, not in the codebase.
3. **Token Expiration:** JWTs expire after 48 hours, requiring re-authentication.
4. **HTTPS:** All communications should be over HTTPS in production.
5. **Limited answer attempts:** For security questions, there's a limit on the number of answer attempts (maxAnswerAttempts set to 4).

## API Endpoints

1. **Registration:** `POST /auth/register`
2. **Login:** `POST /auth/login`
3. **Find Username:** `GET /auth/find-username/:email`
4. **Get Security Questions:** `GET /auth/get-questions/:username`
5. **Check Security Answers:** `POST /auth/check-answers`
6. **Reset Password:** `PUT /auth/reset-password`

For detailed API documentation, refer to the API Documentation file.
