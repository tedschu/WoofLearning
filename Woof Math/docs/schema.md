# Woof Math Database Schema Documentation

## Overview

The Woof Math application uses Prisma to manage the schema plus a PostgreSQL database to store user information, scores, badges, and (at a later date) game states. This database is also shared with another frontend application, Woof Reading. This document outlines the structure of the database tables and their relationships.

## Tables

1. Users
2. Scores
3. Badges
4. Game States
5. Reading Scores (for Woof Reading application)
6. Reading Badges (for Woof Reading application)

## Users

The `users` table stores essential information about registered users.

| Column Name         | Type         | Constraints        | Description                             |
| ------------------- | ------------ | ------------------ | --------------------------------------- |
| id                  | INTEGER      | PK, AUTO INCREMENT | Unique identifier for the user          |
| email               | VARCHAR(255) | UNIQUE, NOT NULL   | User's email address                    |
| username            | VARCHAR(255) | UNIQUE, NOT NULL   | User's chosen username                  |
| password            | VARCHAR(255) | NOT NULL           | Hashed password                         |
| birth_year          | INTEGER      |                    | User's birth year                       |
| security_question_1 | TEXT         | NOT NULL           | First security question                 |
| security_answer_1   | TEXT         | NOT NULL           | Answer to first security question       |
| security_question_2 | TEXT         | NOT NULL           | Second security question                |
| security_answer_2   | TEXT         | NOT NULL           | Answer to second security question      |
| total_logins        | INTEGER      | DEFAULT 0          | Number of times the user has logged in  |
| last_login          | TIMESTAMP    |                    | Timestamp of the user's last login      |
| created_at          | TIMESTAMP    | DEFAULT NOW()      | Timestamp of when the user was created  |
| updated_at          | TIMESTAMP    | DEFAULT NOW()      | Timestamp of last update to user record |

## Scores

The `scores` table keeps track of user scores for different math operations.

| Column Name          | Type      | Constraints        | Description                              |
| -------------------- | --------- | ------------------ | ---------------------------------------- |
| id                   | INTEGER   | PK, AUTO INCREMENT | Unique identifier for the score record   |
| user_id              | INTEGER   | FK (users.id)      | Reference to the user                    |
| addition_score       | INTEGER   | DEFAULT 0          | User's score for addition                |
| subtraction_score    | INTEGER   | DEFAULT 0          | User's score for subtraction             |
| multiplication_score | INTEGER   | DEFAULT 0          | User's score for multiplication          |
| division_score       | INTEGER   | DEFAULT 0          | User's score for division                |
| created_at           | TIMESTAMP | DEFAULT NOW()      | Timestamp of when the record was created |
| updated_at           | TIMESTAMP | DEFAULT NOW()      | Timestamp of last update to the record   |

## Badges

The `badges` table stores information about badges earned by users.

| Column Name | Type      | Constraints        | Description                               |
| ----------- | --------- | ------------------ | ----------------------------------------- |
| id          | INTEGER   | PK, AUTO INCREMENT | Unique identifier for the badge record    |
| user_id     | INTEGER   | FK (users.id)      | Reference to the user                     |
| bernese     | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Bernese badge |
| created_at  | TIMESTAMP | DEFAULT NOW()      | Timestamp of when the record was created  |
| updated_at  | TIMESTAMP | DEFAULT NOW()      | Timestamp of last update to the record    |

## Game States

The `game_state` table is currently unused but is planned to store the current game state for each user in Woof Math.

| Column Name   | Type      | Constraints        | Description                              |
| ------------- | --------- | ------------------ | ---------------------------------------- |
| id            | INTEGER   | PK, AUTO INCREMENT | Unique identifier for the game state     |
| user_id       | INTEGER   | FK (users.id)      | Reference to the user                    |
| current_level | INTEGER   | DEFAULT 1          | Current game level of the user           |
| created_at    | TIMESTAMP | DEFAULT NOW()      | Timestamp of when the record was created |
| updated_at    | TIMESTAMP | DEFAULT NOW()      | Timestamp of last update to the record   |

## Reading Scores

The `score_reading` table keeps track of user scores for Woof Reading application activities.

| Column Name | Type      | Constraints        | Description                              |
| ----------- | --------- | ------------------ | ---------------------------------------- |
| id          | INTEGER   | PK, AUTO INCREMENT | Unique identifier for the score record   |
| user_id     | INTEGER   | FK (users.id)      | Reference to the user                    |
| score       | INTEGER   | DEFAULT 0          | User's reading score                     |
| created_at  | TIMESTAMP | DEFAULT NOW()      | Timestamp of when the record was created |
| updated_at  | TIMESTAMP | DEFAULT NOW()      | Timestamp of last update to the record   |

## Reading Badges

The `badge_reading` table stores information about Woof Reading-related badges earned by users.

| Column Name         | Type      | Constraints        | Description                                     |
| ------------------- | --------- | ------------------ | ----------------------------------------------- |
| id                  | INTEGER   | PK, AUTO INCREMENT | Unique identifier for the badge record          |
| user_id             | INTEGER   | FK (users.id)      | Reference to the user                           |
| bernese             | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Bernese badge       |
| boxer               | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Boxer badge         |
| cat                 | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Cat badge           |
| chihuahua           | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Chihuahua badge     |
| golden              | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Golden badge        |
| husky               | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Husky badge         |
| waterdog            | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Waterdog badge      |
| goldendoodle_trophy | BOOLEAN   | DEFAULT FALSE      | Whether the user has earned Goldendoodle Trophy |
| created_at          | TIMESTAMP | DEFAULT NOW()      | Timestamp of when the record was created        |
| updated_at          | TIMESTAMP | DEFAULT NOW()      | Timestamp of last update to the record          |

## Relationships

1. A user can have one score record for Woof Math (1:1 relationship between Users and Scores)
2. A user can have one badge record for Woof Math (1:1 relationship between Users and Badges)
3. A user can have one game state record for Woof Math (1:1 relationship between Users and Game States)
4. A user can have one reading score record for Woof Reading (1:1 relationship between Users and Reading Scores)
5. A user can have one reading badge record for Woof Reading (1:1 relationship between Users and Reading Badges)

## Notes

1. All tables include `created_at` and `updated_at` timestamps for tracking record creation and modification times.
2. The `users` table includes security questions and answers for account recovery purposes.
3. The `badge` table includes multiple badge types, allowing for a variety of achievements in the math game.
