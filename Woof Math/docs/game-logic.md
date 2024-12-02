# Woof Math Game Logic Documentation

## Overview

The Woof Math frontend is a React-based single-page application (SPA) designed to a fun and customizable way for users to practice math problems. It features a game-like interface where users can answer questions and then earn points and badges.

## Core Game Loop

1. Math Type Selection
2. Math Difficulty Selection
3. Number Generation
4. Equation Presentation
5. Answer Evaluation
6. Score Update and Badge Award

### 1. Math Type Selection

**Component**: `GameSelector.tsx`

- Users choose:
  - Type of math they want to practice (addition, subtraction, multiplication, division)

**Key Function**: `handleChange()`

- Sets user math type selection into state.

### 2. Math Difficulty Selection

**Component**: `Slider.tsx`

- Users can adjust difficulty using a slider (1-5 scale)

**Key Function**: `handleSliderChange()`

- Sets user math type selection into state.

### 3. Number Generation

**Component**: `NumberGenerator.tsx`

**Key Functions**:

- `getRandomNumber()`: Accepts min and max values and generates a random number.
- `switch(gameSelector)`:
  - Sets the min and max values for the random numbers to be generated based on the state values from GameSelector and Slider, and calls getRandomNumber. For example, if GameSelector is "addition" and Slider is "1", switch statement would call getRandomNumber(1, 9) to generate a number between 1 and 9. As Slider increases, so can the min / max values passed to getRandomNumber.
  - Sets the potential points that can be added to a user's score if the question is answered correctly (see "Woof Math Scoring System" below).
- `getDivisionEquation()`: If the user selects "division" in GameSelector, this function will change how the random numbers are used so that the resulting equation can be divided cleanly (e.g. no remainders). Specifically, it multiplies the two random numbers to get a "result" (10) (ex. 2 \* 5 = 10), and then stores that result as the first number in the equation, and the multiplier as the second, so the user will see (10 / 5 = \_\_\_).

# Woof Math Scoring System

The Woof Math scoring system is designed to reward players based on the difficulty level they choose (represented by a slider value from 1 to 5) and the type of math operation they're performing. This dynamic scoring system ensures that more challenging problems yield higher potential points, encouraging players to push their mathematical skills.

## Scoring Table

The following table outlines the points awarded for each correct answer based on the slider value (difficulty level) and the type of math operation:

| Slider Value | Addition | Subtraction | Multiplication | Division |
| ------------ | -------- | ----------- | -------------- | -------- |
| 1            | 3        | 4           | 5              | 6        |
| 2            | 7        | 8           | 9              | 10       |
| 3            | 12       | 13          | 14             | 15       |
| 4            | 18       | 19          | 20             | 21       |
| 5            | 28       | 29          | 30             | 31       |

### 4. Question Presentation

**Component**: `GamePlay.tsx`

- Displays the generated equation
- User inputs answers in field

### 5. Answer Evaluation

**Component**: `GamePlay.tsx`

**Key Functions**:

- `findAnswer()`: Calculates the result of the displayed equation and sets into questionResult state value.
- `checkResult()`: Checks if the user's answer (userAnswer) is equal to the result (questionResult). If the answer matches, it calls subsequent functions to update the scores and badges in the database and to display to the user.

### 6. Score Update and Badge Award

**Component**: `GamePlay.tsx`

**Key Functions**:

- `getTotalScore()`: Calculates the updated total score if the user had answered a question correctly.
- `postUserScore()`: Calculates points based on correct answers and difficulty.
- `updateBadges()`: Checks if user has earned new badges based on total score. Several badges ("husky", "cat") require a user to have earned minimum point thresholds in every type of math to earn the badge (ex. at least 250 points in all math types).

**Badge System**:

- Badges are awarded at specific score thresholds:
  - 100 points: Bernese badge
  - 500 points: Chihuahua badge
  - 1000 points: Boxer badge
  - 250 points in each math type (>1000 total): Husky badge
  - 2000 points: Golden badge
  - 500 points in each math type (>2000 total): Cat badge
  - 3000 points: Goldendoodle Trophy

## State Management

- User state (scores, badges) is managed in the `App.tsx` component
- Game state (current story, user answers) is managed in `GamePlay.tsx`
- React hooks (`useState`, `useEffect`) are used for local state management

## API Interactions

- User scores and badges are updated in the database via API calls to the Express backend
