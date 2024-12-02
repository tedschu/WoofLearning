# Woof Math API documentation

# Table of contents

1. Authentication
2. Users

# Authentication

Base URL: /auth

## Register a new user

- URL: /register
- Method: POST
- Body:
  {
  "email": "example_email",
  "username": "example_username",
  "password": "example_password",
  "security_question_1": "example security_question1",
  "security_answer_1": "example security_answer1",
  "security_question_2": "example security_question2",
  "security_answer_2": "example security_answer2",
  }
- Success response:
  - Code: 200
  - Body:
    {
    token: token,
    user: {
    "id": "user_id",
    "username": "example_username",
    "email": "example_email",
    "total_logins": "total_logins",
    "last_login": "last_login",
    },
    }

## Login

- URL: /login
- Method: POST
- Body:
  { username: "example_user", password: "example_password" }
- Success response:
  - Code: 200
  - Body:
    { "token": "token", "id": "user_id" }

## Find username

- URL: /find-username/:email
- Method: GET
- Success response:
  - Code: 200
  - Content:
    [
    {
    "username": "user1"
    },
    {
    "username": "user2"
    }
    ]

## Get security questions

- URL: /get-questions/:username
- Method: GET
- Success response:
  - Code: 200
  - Content:
    {
    "security_question_1": "What is your favorite ice cream flavor?",
    "security_question_2": "What's your pet's name?"
    }

## Get security answers

- URL: /check-answers
- Method: POST
- Body:
  {
  "username": "existinguser",
  "security_answer_1": "chocolate",
  "security_answer_2": "Snoopy"
  }
- Success response:
  - Code: 200
  - Content:
    {
    "message": "Success",
    "username": "existinguser"
    }

## Reset password

- URL: /reset-password
- Method: PUT
- Body:
  {
  "username": "existinguser",
  "password": "newpassword123"
  }
- Success response:
  - Code: 200
  - Content:
    {
    "message": "Password successfully updated."
    }

# Users

Base URL: /api/users

## Get current user

- URL: /me
- Method: GET
- Authentication: required
- Success response:
  - Code: 200
  - Content: User object

## Delete user

- URL: /:id
- Method: DELETE
- Authentication: Required
- Success response:
  - Code: 200
  - Content: User object

## Update user

- URL: /:id
- Method: PUT
- Authentication: Required
- Body:
  {
  "email": "updated@example.com",
  "username": "updateduser",
  "password": "newpassword123"
  }
- Success response:
  - Code: 200
  - Content: Updated user object

## Update user score

- URL: /:user_id/score
- Method: PUT
- Authentication: Required
- Body: Score object
- Success response:
  - Code: 200
  - Content: Updated score object

## Update user badge

- URL: /:user_id/badge
- Method: PUT
- Authentication: Required
- Body: Badge object
- Success response:
  - Code: 200
  - Content: Updated badge object
