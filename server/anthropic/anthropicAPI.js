const express = require("express");
const router = express.Router();
const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require("dotenv");
const path = require("path");

// this will point to the .env file and then load the env variables (namely the API key)
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Instantiates Anthropic SDK
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Function to establish connection to the Anthropic API
async function callAnthropicAPI(messages, system = "") {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
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

// Route to generate (GET) a new story based on user selection of story topic
router.get("/generate_story", async (req, res) => {
  try {
    const story_length = req.query.story_length;
    const difficulty = req.query.difficulty;
    const story_topic = req.query.story_topic;
    const story_type = req.query.story_type;

    if (!story_length || !difficulty || !story_topic || !story_type) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Generate approximately a ${story_length}-word ${story_type} about ${story_topic}, followed by 3 questions about the ${story_type}. The ${story_type} should have a difficulty level of ${difficulty} (out of 5) - for example, a "1" should use simple language at a first or second-grade reading level, whereas a "5" should be at a fifth or sixth-grade level. Return the result as a valid JSON object with the following structure:

            {
              "Title": "Your ${story_type} title",
              "Body": "Your ${story_type}",
              "Question_1": "First question",
              "Question_2": "Second question",
              "Question_3": "Third question"
            }
            
            Important:
            1. Ensure all JSON keys are in double quotes.
            2. The "Body" value should be a single string with paragraphs separated by "\\n\\n" (two backslashes followed by two 'n's).
            3. Do not use actual line breaks within the JSON string values. Use "\\n" for necessary line breaks.
            4. Escape any double quotes within the text values with a backslash.
            5. Use a single backslash () to escape apostrophes and quotation marks.
            6. The entire JSON object should be on a single line, with no line breaks between properties.
            7. If the difficulty level is 1, you should use simple words that are easy to read and understand for children. As the difficulty number increases (to 5), you can use more complex words.
            8. Try to keep the story length at around the word count specified.`,
          },
        ],
      },
    ];

    const system = `You are a reading tutor for students in grade school, and will be generating a ${story_type} to test reading comprehension. Everything needs to be age-appropriate, with no offensive language or themes.`;

    // Uses messages and system variables to call "callAnthropicAPI" function
    const response = await callAnthropicAPI(messages, system);

    console.log("Raw response:", response);

    // Parse the response, replacing all \n breaks and "\" with empty strings, and convert it to readable JSON (storyData)
    const cleanedResponse = response
      // .replace(/(?<!\\)\n/g, "\\\\n");
      .replace(/\\\'/g, "'") // Replace \\' with just '
      .replace(/\\'/g, "'"); // Replace \' with just '
    //.replace(/\\"/g, '"'); // Replace \' with just '   // This was causing parsing errors by unescaping " " in the stories
    // .replace(/'/g, "\\'") // Then replace all ' with \'
    // .replace(/\n/g, "\\n") // Replace newlines with \n
    // .replace(/[\u0000-\u0019]+/g, "");
    // .replace(/[^\x20-\x7E]/g, "");

    console.log("Cleaned response:", cleanedResponse);

    const storyData = JSON.parse(cleanedResponse);

    console.log("parsed response:", storyData);

    // Sends back storyData JSON object with Title, Story, Question 1, Question 2, Question 3 keys.
    res.status(200).json(storyData);
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: "Failed to generate story." });
  }
});

// Route to EVALUATE (POST) the user's answers
router.post("/evaluate_answers", async (req, res) => {
  try {
    // Pulls in variables from the story and user input from the request body
    const {
      story,
      question_1,
      answer_1,
      question_2,
      answer_2,
      question_3,
      answer_3,
    } = req.body;

    // Error handling in case any fields are missing
    if (
      !story ||
      !question_1 ||
      !answer_1 ||
      !question_2 ||
      !answer_2 ||
      !question_3 ||
      !answer_3
    ) {
      return res
        .status(400)
        .json({ error: "Make sure you're answering all the questions" });
    }

    // Need to "stringify" (e.g. convert JSON object to a string) the storyData
    const storyResponseData = JSON.stringify({
      story: story,
      question_1: question_1,
      answer_1: answer_1,
      question_2: question_2,
      answer_2: answer_2,
      question_3: question_3,
      answer_3: answer_3,
    });

    // Building "messages" and "system" inputs below which are then passed to the API
    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Using the JSON object below, review the answers to the three questions and evaluate whether the answers were correct. If the user has small spelling or punctuation errors, you can still evaluate it as "correct" and provide feedback where applicable.

            ${storyResponseData}
            
            Return the result as valid JSON with the following structure:
            
            {
            "evaluations" = [
            {
              "Question": "First question",
              "Answer": "First answer",
              "is_correct": true or false (boolean),
              "feedback": "Return feedback on first answer if "is_correct" is false. Focus your feedback on the correct answer, referencing where in the text the answer could be found, and do not tell the user to try again. Otherwise, return 'null'"
            },
          ...
        ],
            "overall_score": "0, 1, 2, or 3 based on the number of true values for is_correct"
            }
            
            Important:
            1. Ensure all JSON keys are in double quotes.
            2. Do not use actual line breaks within the JSON string values. Use "\\n" for necessary line breaks.
            3. Escape any double quotes within the text values with a backslash.
            4. The entire JSON object should be on a single line, with no line breaks between properties.`,
          },
        ],
      },
    ];

    const system =
      "You are a reading tutor for students in grade school, and will be reviewing the user's answers to the provided questions and providing feedback. ";

    // Uses messages and system variables to call "callAnthropicAPI" function
    const response = await callAnthropicAPI(messages, system);

    //console.log("Raw response:", response);

    // // Parse the response, replacing all \n breaks and "\" with empty strings, and convert it to readable JSON (storyData)
    const cleanedResponse = response.replace(/\\'/g, "'"); // Replace \' with just '
    console.log(JSON.stringify(response));

    const evaluationData = JSON.parse(cleanedResponse);

    // Sends back evaluationData JSON object with the answers and evaluations (is_correct, feedback)
    res.json(evaluationData);
  } catch (error) {
    console.error("Error evaluating data:", error);
    res.status(500).json({
      error: "Failed to evaluate answers.",
      rawResponse: error.response,
    });
  }
});

// Route to evaluate (POST) a user's incorrect equations and respond with feedback
router.post("/evaluate_incorrect_responses", async (req, res) => {
  try {
    // Pulls in incorrect equations data
    const incorrectEquations = req.body;

    // Need to "stringify" (e.g. convert JSON object to a string) the equations data
    const incorrectEquationsString = JSON.stringify(incorrectEquations);

    // // Building "messages" and "system" inputs below which are then passed to the API
    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${incorrectEquationsString}`,
          },
        ],
      },
    ];

    const system =
      "You will receive a set of math equations that a user answered incorrectly, followed by an 'overall_score.' These incorrect answers come from a program that grade school-aged kids are using to practice building their math skills. You will be providing insights back to the user on trends that you're seeing so they can improve their math skills. Be very brief, and in simple yet encouraging language, summarize your responses to focus on the types of questions they tend to get wrong, and also any tips to approach these problems. Be very positive, particularly if the 'overall score' is 85% or higher. If it's lower than 85%, you can acknowledge that the user may be having some challenges, and that you'll help them with advice. Don't repeat the number back to the user. For instance, if you see that most of the equations relate to multiplying by 9, clearly let the user know.";

    // Uses messages and system variables to call "callAnthropicAPI" function
    const response = await callAnthropicAPI(messages, system);

    console.log("Raw response:", response);

    res.json({
      feedback: response,
    });
  } catch (error) {
    console.error("Error evaluating data:", error);
    res.status(500).json({
      error: "Failed to evaluate answers.",
      details: error.message,
    });
  }
});

module.exports = router;
