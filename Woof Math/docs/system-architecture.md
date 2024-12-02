# Woof Math System Architecture Overview

The Woof Math frontend is a React-based single-page application (SPA) designed to a fun and customizable way for users to practice math problems. It features a game-like interface where users can answer questions and then earn points and badges. The application uses a modern stack with a React frontend, Express.js backend, PostgreSQL database, and Node.js.

## High-Level Architecture

1. **Frontend**: React-based single-page application
2. **Backend**: Express.js server
3. **Database**: PostgreSQL with Prisma ORM
4. **Authentication**: JWT (JSON Web Tokens)

## Component Breakdown

### Frontend (React)

- Built using modern React with functional components and hooks
- Key components include:
  - Game: Main gameplay interface
  - Login/Register: User authentication screens
  - ScoreBar: Displays user progress and badges
  - StorySelector: Allows users to choose story topics
  - GamePlay: Manages core gameplay

### Backend (Express.js)

- RESTful API structure
- Key routes:
  - /auth: Handles user registration, login, and password reset
  - /api/users: User data management
  - /api/scores: Score tracking

### Database (PostgreSQL + Prisma)

- Stores user data, scores, badges
- Prisma ORM used for database interactions, providing type-safe database access

### Authentication

- JWT-based authentication system
- Tokens stored in localStorage on the client side
- Server-side middleware (verifyToken) for protected routes

## Data Flow

1. User interacts with React frontend
2. Frontend makes API calls to Express backend
3. Backend authenticates requests using JWT
4. Backend interacts with PostgreSQL database via Prisma
5. Results are sent back to the frontend for display

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
- Environment variables used for configuration (e.g., database connection)
