# Woof Learning Frontend Architecture

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

The Woof Learning frontend is a React-based application designed to provide an interactive and engaging math and reading comprehension experience for users. It features a game-like interface where users can read practice math, read stories, answer questions, and earn points and badges.

## Technology Stack

- React.js
- React Router for navigation
- Material-UI for some UI components
- Custom CSS for styling

## Project Structure

src/
├── assets/ (images for badges and icons)
├── components/
│ ├── math/
│ │ ├── GamePlay.tsx
│ │ ├── GameSelector.tsx
│ │ ├── NumberGenerator.tsx
│ │ ├── RecoverBar.tsx
│ │ └── Slider.tsx
│ ├── reading/
│ │ ├── CircularColor.tsx
│ │ ├── GamePlay.tsx
│ │ ├── ScoreBar.tsx
│ │ ├── Slider.tsx
│ │ └── StorySelector.tsx
│ ├── BadgeModal.tsx
│ ├── Nav.tsx
│ ├── RecoverModal.tsx
│ └── ResetPassModal.tsx
├── pages/
│ ├── math/
│ │ └── GameMath.tsx
│ ├── reading/
│ │ ├── GameReading.tsx
│ │ └── Prompts.tsx
│ ├── About.tsx
│ ├── AppSelector.tsx
│ ├── Login.tsx
│ ├── Me.tsx
│ ├── Register.tsx
│ └── Welcome.tsx
├── types/
│ ├── images.d.ts
│ └── types.ts
├── utils/
│ ├── badWords.ts
│ └── storyPrompts.ts
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

## Key Components

- App.tsx: The main component that sets up routing and manages global state.
- Nav.tsx: The navigation bar component including username, present across all pages.
- Reading / GamePlay.tsx: The core game component where users read stories and answer questions.
- Math / GamePlay.tsx: The core game component where users practice solving math problems.
- ScoreBar.tsx: Displays the user's current score and badges.
- BadgeModal.tsx: A modal component that appears when a user earns a new badge.
- StorySelector.tsx: Allows users to select story topics and types from an array of prompts in utils/storyPrompts.
- GameSelector.tsx: Allows user to choose between different types of math problems (ex. subtraction, addition)
- Slider.tsx: Enables users to adjust the difficulty level of the stories.
- AppSelector.tsx: Allows user to choose between math and reading games.

## Routing

Routing is handled using React Router. The main routes are:

- /: The main game page
- /math: The math gameplay page
- /reading: The reading gameplay page
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

## Game Logic: Reading

The game flow is primarily managed in the Reading / GamePlay.tsx component:

1. User selects a story topic and difficulty level.
2. A story is generated using the Anthropic API.
3. The user reads the story and answers questions.
4. Answers are evaluated using the Anthropic API.
5. The user's score is updated based on correct answers.
6. For any incorrect answers, feedback is passed to the UI from the API response.
7. Badges are awarded based on cumulative score milestones.

## Game Logic: Math

The game flow is primarily managed in the Math / GamePlay.tsx component:

1. User selects a math type and difficulty level (1-5).
2. A math equation is generated from random numbers based on the parameters the user set (ex. 2 + 2 for "addition" on difficulty level "1").
3. The user solves the math problem and inputs their response.
4. Answers are evaluated via frontend logic.
5. The user's score is updated based on correct answers.
6. Badges are awarded based on cumulative score milestones.

## UI/UX Considerations

- Responsive design for both desktop and mobile users.
- Accessibility features (to be detailed further).
- Engaging animations for badge awards and score updates.

## Future Enhancements

- Implement advanced caching strategies on generated stories for improved performance.
