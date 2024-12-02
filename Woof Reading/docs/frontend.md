# Woof Reading Frontend Architecture

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

The Woof Reading frontend is a React-based single-page application (SPA) designed to provide an interactive and engaging reading comprehension experience for users. It features a game-like interface where users can read stories, answer questions, and earn points and badges.

## Technology Stack

- React.js
- React Router for navigation
- Material-UI for some UI components
- Custom CSS for styling

## Project Structure

src/
├── assets/ (images for badges and icons)
├── components/
│ ├── BadgeModal.jsx
│ ├── CircularColor.jsx
│ ├── GamePlay.jsx
│ ├── Nav.jsx
│ ├── PositionedPopper.jsx
│ ├── RecoverModal.jsx
│ ├── ResetPassModal.jsx
│ ├── ScoreBar.jsx
│ ├── Slider.jsx
│ └── StorySelector.jsx
├── pages/
│ ├── About.jsx
│ ├── Game.jsx
│ ├── Login.jsx
│ ├── Me.jsx
│ ├── Prompts.jsx
│ ├── Register.jsx
│ └── Welcome.jsx
├── utils/
│ ├── badWords.js
│ └── storyPrompts.js
├── App.jsx
├── index.css
└── main.jsx

## Key Components

- App.jsx: The main component that sets up routing and manages global state.
- Nav.jsx: The navigation bar component including username, present across all pages.
- GamePlay.jsx: The core game component where users read stories and answer questions.
- ScoreBar.jsx: Displays the user's current score and badges.
- BadgeModal.jsx: A modal component that appears when a user earns a new badge.
- StorySelector.jsx: Allows users to select story topics and types from an array of prompts in utils/storyPrompts.
- Slider.jsx: Enables users to adjust the difficulty level of the stories.

## Routing

Routing is handled using React Router. The main routes are:

- /: The main game page
- /me: User profile page
- /register: User registration page
- /login: Login page
- /welcome: Welcome/landing page
- /about: Information about the application
- /prompts: Displays available story prompts

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
- Anthropic API for story generation and answer evaluation

## Authentication Flow

- User logs in via the form (currently, registration is handled via woofmath.com).
- On successful authentication, a JWT token is stored in localStorage.
- The token is included in the Authorization header for subsequent API requests.
- If the token expires, the user is redirected to the Welcome page.

## Game Logic

The game flow is primarily managed in the GamePlay.jsx component:

1. User selects a story topic and difficulty level.
2. A story is generated using the Anthropic API.
3. The user reads the story and answers questions.
4. Answers are evaluated using the Anthropic API.
5. The user's score is updated based on correct answers.
6. For any incorrect answers, feedback is passed to the UI from the API response.
7. Badges are awarded based on cumulative score milestones.

## UI/UX Considerations

- Responsive design for both desktop and mobile users.
- Accessibility features (to be detailed further).
- Engaging animations for badge awards and score updates.

## Future Enhancements

- Implement advanced caching strategies on generated stories for improved performance.
