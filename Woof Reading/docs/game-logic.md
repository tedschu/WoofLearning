# Woof Reading Game Logic Documentation

## Overview

Woof Reading is an educational game designed to improve children's reading comprehension skills. The game presents users with stories or poems, followed by questions to test their understanding. Users earn points and badges based on their performance.

## Core Game Loop

1. Story Topic Selection
2. Story Difficulty Selection
3. Story Generation
4. Question Presentation
5. Answer Evaluation
6. Score Update and Badge Award

### 1. Story Topic Selection

**Component**: `StorySelector.jsx`

- Users choose:
  - Story type (story, poem, or ballad)
  - Story topic (from a predefined list in `storyPrompts.js`)

**Key Function**: `selectPrompt()`

- Randomly selects a story prompt from the `storyPrompts` array

### 3. Story Difficulty Selection

**Component**: `Slider.jsx`

- Users can adjust difficulty using a slider (1-5 scale)
- Based on the difficulty level chosen, the length of the story and the potential point value (for answered questions) are set

**Key Functions**:

- `storyLength()`: Uses a switch statement on the slider value (1-5) to assign a word count story length, sets in state
- `assignPoints()`: Uses a switch statement on the slider value (1-5) to assign an increasing point value for each correct answer

### 2. Story Generation

**Component**: `GamePlay.jsx`

**Key Function**: `getStory()`

- Makes a GET request to `/anthropic/generate_story`
- Parameters:

  - `story_length`: Determined by difficulty (250-550 words)
  - `difficulty`: User-selected (1-5)
  - `story_topic`: Selected prompt
  - `story_type`: User-selected (story, poem, ballad)

- The Anthropic API generates:
  - Story title
  - Story body
  - 3 questions about the story

### 3. Question Presentation

**Component**: `GamePlay.jsx`

- Displays the generated story and questions
- User inputs answers in text fields

### 4. Answer Evaluation

**Component**: `GamePlay.jsx`

**Key Function**: `evaluateAnswers()`

- Makes a POST request to `/anthropic/evaluate_answers`
- Sends user answers along with the original story and questions
- Anthropic API evaluates answers and returns:
  - Correctness for each answer (boolean)
  - Feedback for incorrect answers
  - Overall score (0-3)

### 5. Score Update and Badge Award

**Component**: `GamePlay.jsx`

**Key Functions**:

- `calculateScore()`: Calculates points based on correct answers and difficulty
- `updateBadges()`: Checks if user has earned new badges based on total score

**Score Calculation**:

- Base points per correct answer: 10-18 (based on difficulty)
- Total possible points per story: 30-54

**Badge System**:

- Badges are awarded at specific score thresholds:
  - 100 points: Bernese badge
  - 250 points: Chihuahua badge
  - 500 points: Water Dog badge
  - 1000 points: Boxer badge
  - 1500 points: Husky badge
  - 2000 points: Golden badge
  - 2500 points: Cat badge
  - 3000 points: Goldendoodle Trophy

## State Management

- User state (scores, badges) is managed in the `App.jsx` component
- Game state (current story, user answers) is managed in `GamePlay.jsx`
- React hooks (`useState`, `useEffect`) are used for local state management

## API Interactions

- Story generation and answer evaluation use the Anthropic API
- User scores and badges are updated in the database via API calls to the Express backend

## Error Handling

- Input validation prevents empty submissions
- Error states exist for API failures (story generation, answer evaluation)
- A "bad words" filter (`badWords.js`) prevents inappropriate language in user answers

## Performance Considerations

- Story generation and answer evaluation are asynchronous to prevent UI blocking
- Loading indicators are shown during API calls

This game logic ensures an engaging, educational experience that adapts to the user's chosen difficulty and topic preferences while providing immediate feedback and rewards for progress.
