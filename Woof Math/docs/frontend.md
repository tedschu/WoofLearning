# Woof Math Frontend Architecture

Table of Contents

1. Overview
2. Technology Stack
3. Project Structure
4. Key Components
5. Routing
6. State Management
7. API Integration
8. Authentication Flow
9. Game Logic

## Overview

The Woof Math frontend is a React-based single-page application (SPA) designed to a fun and customizable way for users to practice math problems. It features a game-like interface where users can answer questions and then earn points and badges.

## Technology Stack

- React.js
- Typescript
- React Router for navigation
- Material-UI for some UI components
- Custom CSS for styling

## Project Structure

src/
├── assets/ (images for badges and icons)
├── components/
│ ├── BadgeModal.tsx
│ ├── GamePlay.tsx
│ ├── Nav.tsx
│ ├── RecoverModal.tsx
│ ├── ResetPassModal.tsx
│ ├── ScoreBar.tsx
│ ├── Slider.tsx
├── pages/
│ ├── About.tsx
│ ├── Game.tsx
│ ├── Login.tsx
│ ├── Me.tsx
│ ├── Register.tsx
│ └── Welcome.tsx
├── App.tsx
├── index.css
└── main.tsx

## Key Components

- App.tsx: The main component that sets up routing and manages global state.
- Nav.tsx: The navigation bar component including username, present across all pages.
- GamePlay.tsx: The core game component where users generate math problems and answer questions.
- ScoreBar.tsx: Displays the user's current score and badges.
- BadgeModal.tsx: A modal component that appears when a user earns a new badge.
- Slider.tsx: Enables users to adjust the difficulty level of the stories.

## Routing

Routing is handled using React Router. The main routes are:

- /: The main game page
- /me: User profile page
- /register: User registration page
- /login: Login page
- /welcome: Welcome/landing page
- /about: Information about the application

## State Management

State management is primarily handled using React's useState and useEffect hooks. Key state variables include:

- isLoggedIn: Boolean indicating user's logged in status
- userInfo: Object containing user details
- userScore: Object tracking user's score
- userBadges: Object tracking user's earned badges

State is passed down to child components as props, and update functions are passed to allow child components to update the state.

## API Integration

API calls are made using the fetch API. Key integrations include:

- Authentication endpoints (login, register, password reset)
- User data retrieval and updates
- Score and badge updates

## Authentication Flow

- User logs in via the form.
- On successful authentication, a JWT token is stored in localStorage.
- The token is included in the Authorization header for subsequent API requests.
- If the token expires, the user is redirected to the Welcome page.

## Game Logic

The game flow is primarily managed in the GamePlay.tsx component:

1. User selects a math type and difficulty level (1-5).
2. A math equation is generated from random numbers based on the parameters the user set (ex. 2 + 2 for "addition" on difficulty level "1").
3. The user solves the math problem and inputs their response.
4. Answers are evaluated via frontend logic.
5. The user's score is updated based on correct answers.
6. Badges are awarded based on cumulative score milestones.

## Typescript Integration

Woof Math frontend utilizes TypeScript to enhance code quality, improve developer productivity, and increase overall maintainability of the codebase.

### TypeScript Setup

- The project uses a `tsconfig.json` file in the root directory to configure TypeScript compiler options.
- All React components are written in `.tsx` files, while utility functions and non-React modules use `.ts` extension.

## UI/UX Considerations

- Responsive design for both desktop and mobile users.
- Engaging animations for badge awards and score updates.
