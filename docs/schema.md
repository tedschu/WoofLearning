# Database Schema Documentation

## Overview

This document outlines the database schema for a learning application with math and reading modules. The database is built using PostgreSQL and Prisma as the ORM.

## Models

### User

Primary model containing user authentication and profile information.

| Field               | Type     | Attributes                    | Description                        |
| ------------------- | -------- | ----------------------------- | ---------------------------------- |
| id                  | Int      | @id @default(autoincrement()) | Primary identifier                 |
| name                | String?  | Optional                      | User's full name                   |
| birth_year          | Int?     | Optional                      | User's birth year                  |
| email               | String   | Required                      | User's email address               |
| username            | String   | @unique, Required             | Unique username                    |
| password            | String   | Required                      | Hashed password                    |
| security_question_1 | String   | Required                      | First security question            |
| security_question_2 | String   | Required                      | Second security question           |
| security_answer_1   | String   | Required                      | Answer to first security question  |
| security_answer_2   | String   | Required                      | Answer to second security question |
| total_logins        | Int      | Required                      | Count of total user logins         |
| last_login          | DateTime | Required                      | Timestamp of last login            |

Relations:

- One-to-one with Score_math
- One-to-one with Badge_math
- One-to-one with Score_reading
- One-to-one with Badge_reading

### Score_math

Tracks user progress and scores in mathematics.

| Field                | Type | Attributes                    | Description                        |
| -------------------- | ---- | ----------------------------- | ---------------------------------- |
| id                   | Int  | @id @default(autoincrement()) | Primary identifier                 |
| addition_score       | Int? | @default(0)                   | Score for addition exercises       |
| subtraction_score    | Int? | @default(0)                   | Score for subtraction exercises    |
| multiplication_score | Int? | @default(0)                   | Score for multiplication exercises |
| division_score       | Int? | @default(0)                   | Score for division exercises       |
| math_L1_points       | Int? | @default(0)                   | Points for Level 1                 |
| math_L2_points       | Int? | @default(0)                   | Points for Level 2                 |
| math_L3_points       | Int? | @default(0)                   | Points for Level 3                 |
| math_L4_points       | Int? | @default(0)                   | Points for Level 4                 |
| math_L5_points       | Int? | @default(0)                   | Points for Level 5                 |
| user_id              | Int  | @unique                       | Foreign key to User                |

### Badge_math

Tracks achievements and badges earned in mathematics.

| Field       | Type | Attributes                    | Description         |
| ----------- | ---- | ----------------------------- | ------------------- |
| id          | Int  | @id @default(autoincrement()) | Primary identifier  |
| badge_level | Int  | @default(1)                   | Current badge level |
| badges      | Int  | @default(0)                   | Total badges earned |
| user_id     | Int  | @unique                       | Foreign key to User |

Badge Fields (all Boolean? @default(false)):

- Level 1: bernese, chihuahua, waterdog, boxer, husky, golden, cat, goldendoodle
- Level 2: borderCollie, terrier, australianShepherd, shibaInu, cat, bernese, poodle, golden

### Score_reading

Tracks user progress and scores in reading.

| Field             | Type | Attributes                    | Description           |
| ----------------- | ---- | ----------------------------- | --------------------- |
| id                | Int  | @id @default(autoincrement()) | Primary identifier    |
| reading_score     | Int? | @default(0)                   | Overall reading score |
| reading_L1_points | Int? | @default(0)                   | Points for Level 1    |
| reading_L2_points | Int? | @default(0)                   | Points for Level 2    |
| reading_L3_points | Int? | @default(0)                   | Points for Level 3    |
| reading_L4_points | Int? | @default(0)                   | Points for Level 4    |
| reading_L5_points | Int? | @default(0)                   | Points for Level 5    |
| user_id           | Int  | @unique                       | Foreign key to User   |

### Badge_reading

Tracks achievements and badges earned in reading.

| Field       | Type | Attributes                    | Description         |
| ----------- | ---- | ----------------------------- | ------------------- |
| id          | Int  | @id @default(autoincrement()) | Primary identifier  |
| badge_level | Int  | @default(1)                   | Current badge level |
| badges      | Int  | @default(0)                   | Total badges earned |
| user_id     | Int  | @unique                       | Foreign key to User |

Badge Fields (all Boolean? @default(false)):

- Level 1: bernese, chihuahua, waterdog, boxer, husky, golden, cat, goldendoodle
- Level 2: borderCollie, terrier, australianShepherd, shibaInu, cat, bernese, poodle, golden

## Relationships

- Each User has one Score_math record
- Each User has one Badge_math record
- Each User has one Score_reading record
- Each User has one Badge_reading record
- All relationships are enforced through unique foreign keys
