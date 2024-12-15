# Woof Learning System Architecture Overview

Woof Learning is a web application consisting of a math and reading game. The reading game is designed to help children improve their reading comprehension skills through interactive stories and quizzes. The math game is designed to be a fun and customizable way for users to practice math problems. It features a game-like interface where users can answer questions and then earn points and badges. The application uses a modern stack with a React frontend, Express.js backend, PostgreSQL database, and Node.js.

## High-Level Architecture

1. **Frontend**: React-based single-page application
2. **Backend**: Express.js server
3. **Database**: PostgreSQL with Prisma ORM
4. **Authentication**: JWT (JSON Web Tokens)
5. **External API**: Anthropic API for AI-generated content

## Component Breakdown

### Frontend (React)

- Built using modern React with functional components and hooks
- Key components include:
  - Game: Main gameplay interface
  - Login/Register: User authentication screens
  - AppSelector: allows the user to switch between the math and reading games
  - ScoreBar: Displays user progress and badges
  - Reading / StorySelector: Allows users to choose story topics
  - Math / GameSelector: Allows users to choose the type of math problems they want to practice
  - GamePlay: Manages core gameplay

### Backend (Express.js)

- RESTful API structure
- Key routes:
  - /auth: Handles user registration, login, and password reset
  - /api/users-math, /api/users-reading: User data management
  - /anthropic: Interfaces with Anthropic API for story generation and answer evaluation

### Database (PostgreSQL + Prisma)

- Stores user data, scores, badges, and game states
- Prisma ORM used for database interactions, providing type-safe database access

### Authentication

- JWT-based authentication system
- Tokens stored in localStorage on the client side
- Server-side middleware (verifyToken) for protected routes

### External Integrations

- Anthropic API: Used for generating stories, questions, and evaluating user answers

## Data Flow

1. User interacts with React frontend
2. Frontend makes API calls to Express backend
3. Backend authenticates requests using JWT
4. Backend interacts with PostgreSQL database via Prisma
5. Reading: For story generation and evaluation, backend communicates with Anthropic API
6. Results are sent back to the frontend for display

## Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT used for stateless authentication

## Scalability and Performance

- React frontend allows for efficient updates and rendering
- Express backend can be horizontally scaled
- Database queries optimized through Prisma ORM

## Development and Deployment

- Vite used as the build tool for the React frontend
- Backend uses standard Node.js/Express setup
- Environment variables used for configuration (e.g., database connection, API keys)
