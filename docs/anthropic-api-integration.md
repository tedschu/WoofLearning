# Woof Reading Anthropic API Integration Documentation

## Overview

Woof Reading uses the Anthropic API to generate stories and evaluate user answers. This integration is crucial for creating dynamic, AI-generated content and providing intelligent feedback to users.

## Setup

The Anthropic API integration is handled in `anthropicAPI.js`.

### Dependencies

```javascript
const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require("dotenv");
```

### Configuration

The API key is loaded from environment variables:

```javascript
dotenv.config({ path: path.join(__dirname, "..", ".env") });
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

## Core Functions

### 1. callAnthropicAPI

This function is the main interface for making requests to the Anthropic API.

```javascript
async function callAnthropicAPI(messages, system = "") {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1200,
      temperature: 0.7,
      system: system,
      messages: messages,
    });
    return response.content[0].text;
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    throw error;
  }
}
```

- Uses the `claude-3-haiku-20240307` model
- Sets a max token limit of 1200
- Uses a temperature of 0.7 for balanced creativity and coherence

## API Endpoints

### 1. Generate Story

**Endpoint**: `GET /anthropic/generate_story`

**Purpose**: Generates a story based on user-specified parameters.

**Query Parameters**:

- `story_length`: Desired length of the story
- `difficulty`: Difficulty level (1-5)
- `story_topic`: Topic of the story
- `story_type`: Type of content (story, poem, ballad)

**Process**:

1. Constructs a prompt for the Anthropic API
2. Calls `callAnthropicAPI` with the constructed prompt
3. Parses the response and returns it as JSON

**Response Format**:

```json
{
  "Title": "Story title",
  "Body": "Story content",
  "Question_1": "First question",
  "Question_2": "Second question",
  "Question_3": "Third question"
}
```

### 2. Evaluate Answers

**Endpoint**: `POST /anthropic/evaluate_answers`

**Purpose**: Evaluates user answers to story questions.

**Request Body**:

```json
{
  "story": "Full story text",
  "question_1": "First question",
  "answer_1": "User's answer to first question",
  "question_2": "Second question",
  "answer_2": "User's answer to second question",
  "question_3": "Third question",
  "answer_3": "User's answer to third question"
}
```

**Process**:

1. Constructs a prompt for the Anthropic API including the story, questions, and user answers
2. Calls `callAnthropicAPI` with the constructed prompt
3. Parses the response and returns it as JSON

**Response Format**:

```json
{
  "evaluations": [
    {
      "Question": "Question text",
      "Answer": "User's answer",
      "is_correct": true/false,
      "feedback": "Feedback text if incorrect, null if correct"
    },
    // ... (for each question)
  ],
  "overall_score": 0-3
}
```

## Error Handling

- API calls are wrapped in try-catch blocks
- Errors are logged to the console and propagated to the client
- HTTP 500 status is returned for failed API calls

## Security Considerations

- The Anthropic API key is stored as an environment variable
- Input validation is performed to ensure required parameters are present
- User-provided content is sanitized before being sent to the Anthropic API

## Performance Optimization

- Responses from the Anthropic API are cleaned and parsed to ensure proper JSON formatting
- The `max_tokens` parameter is set to 1200 to balance response length and API call speed

## Usage in Frontend

The Anthropic API endpoints are called from the `GamePlay.jsx` component:

- `getStory()` function calls the generate story endpoint
- `evaluateAnswers()` function calls the evaluate answers endpoint

Both functions handle the API responses and update the game state accordingly.

This integration allows Woof Reading to provide dynamic, AI-generated content and intelligent feedback, creating a personalized and engaging learning experience for users.
