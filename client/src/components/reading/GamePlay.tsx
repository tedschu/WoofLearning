import React, { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import storyPrompts from "../../utils/storyPrompts";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CircularColor from "./CircularColor";
import badWords from "../../utils/badWords";
import { Link } from "react-router-dom";
import {
  UserScore,
  BadgeLevel,
  BadgeProgress,
  UserReadingBadges,
  UserInfo,
  ModalBadgeType,
  StorySelectorProps,
  StoryType,
  StoryResponseData,
  EvaluationData,
} from "../../types/types";

type GamePlayProps = {
  sliderValue: number;
  userScore: UserScore;
  setUserScore: React.Dispatch<React.SetStateAction<UserScore>>;
  userInfo: UserInfo;
  userReadingBadges: UserReadingBadges;
  setUserReadingBadges: React.Dispatch<React.SetStateAction<UserReadingBadges>>;
  gotRight: boolean;
  gotWrong: boolean;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalBadge: ModalBadgeType;
  setModalBadge: React.Dispatch<React.SetStateAction<ModalBadgeType>>;
  badgeLevel: BadgeLevel;
  setBadgeLevel: React.Dispatch<React.SetStateAction<BadgeLevel>>;
  badgeProgress: BadgeProgress;
  setBadgeProgress: React.Dispatch<React.SetStateAction<BadgeProgress>>;
  storyLength: number;
  storyPrompt: string;
  setStoryPrompt: React.Dispatch<React.SetStateAction<string>>;
  storyType: StoryType;
  pointsToWin: number;
  setPointsToWin: React.Dispatch<React.SetStateAction<number>>;
};

function GamePlay({
  sliderValue,
  userScore,
  setUserScore,
  userInfo,
  gotRight,
  gotWrong,
  setGotRight,
  setGotWrong,
  userReadingBadges,
  setUserReadingBadges,
  setIsModalOpen,
  setModalBadge,
  storyLength,
  storyPrompt,
  setStoryPrompt,
  storyType,
  pointsToWin,
  setPointsToWin,
  setBadgeLevel,
  badgeLevel,
}: GamePlayProps) {
  const [triggerNewStory, setTriggerNewStory] = useState(false);
  const [triggerNewEvaluation, setTriggerNewEvaluation] = useState(false);
  const [storyResponseData, setStoryResponseData] = useState<StoryResponseData>(
    {
      title: "",
      body: "",
      question_1: "",
      question_2: "",
      question_3: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
    }
  );
  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    is_correct_1: "",
    feedback_1: "",
    is_correct_2: "",
    feedback_2: "",
    is_correct_3: "",
    feedback_3: "",
    score: "",
  });
  const [showEvaluationChecks, setShowEvaluationChecks] = useState(false);
  const [pointsWon, setPointsWon] = useState(0);
  const [circularProgress, setCircularProgress] = useState(false);
  const [circularProgressSubmit, setCircularProgressSubmit] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [potentialPoints, setPotentialPoints] = useState(0);

  // ***** STORY GENERATION *****

  // Handles button click "write story," setting TriggerNewStory = true which also triggers the useEffect above
  const handleClick = () => {
    setCircularProgress(true);
    setTriggerNewStory(true);
    setShowEvaluationChecks(false);
    setGotWrong(false);
    setErrorText("");
    setPotentialPoints(pointsToWin);
  };

  // Triggers the getStory function but only after all input values (slider, prompt, storylength, storyType) have been updated
  useEffect(() => {
    if (triggerNewStory) {
      getStory();
      setTriggerNewStory(false);
    }
  }, [triggerNewStory, storyLength, sliderValue, storyPrompt, storyType]);

  // Function to hit generate_story endpoint (e.g. Anthropic API) to get a story based on values passed in
  const getStory = async () => {
    try {
      const queryParams = new URLSearchParams({
        story_length: storyLength.toString(),
        difficulty: sliderValue.toString(),
        story_topic: storyPrompt,
        story_type: storyType,
      });

      const response = await fetch(
        `/anthropic/generate_story?${queryParams.toString()}`
      );

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Server response:", textResponse);
        console.log("Status:", response.status);
        throw new Error("Failed to generate the story");
      }

      const data = await response.json();
      console.log("Success data ", data);
      setCircularProgress(false);
      setStoryResponseData({
        title: data.Title,
        body: data.Body,
        question_1: data.Question_1,
        question_2: data.Question_2,
        question_3: data.Question_3,
        answer_1: "",
        answer_2: "",
        answer_3: "",
      });

      //return await response.json();
    } catch (error) {
      console.error("Error generating story:", error);
      setCircularProgress(false);
      throw error;
    }
  };

  // ***** USER ANSWERS AND EVALUATION *****
  // Handles user input values in "answer" boxes
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...storyResponseData };
    const inputName = event.target.name as keyof StoryResponseData;
    newObj[inputName] = event.target.value;
    setStoryResponseData(newObj);
  };

  // Submit button that calls "evaluateAnswers" function / API call
  // Only calls evaluateAnswers IF there are no user responses (answers) that are "bad words", from the badWords list.
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkBadWords() === true) {
      setErrorText("Please only use nice words.");
    } else {
      setTriggerNewEvaluation(true);
      setCircularProgressSubmit(true);
      setErrorText("");
    }
  };

  // Stores user responses (answers) into a separate array so that checkBadWords function can iterate through
  const userResponsesArray = [
    storyResponseData.answer_1,
    storyResponseData.answer_2,
    storyResponseData.answer_3,
  ];

  // Checks userResponsesArray for "bad words" and returns "true" to the submit function, which will throw an error message to the user.
  const checkBadWords = () => {
    const lowerCaseBadWords = userResponsesArray.map((word) =>
      word.toLowerCase()
    );

    for (let i = 0; i < lowerCaseBadWords.length; i++) {
      if (badWords.includes(lowerCaseBadWords[i])) return true;
    }
  };

  // Triggers the evaluateAnswers function but only after all input values (storyResponseData) have been updated
  useEffect(() => {
    if (triggerNewEvaluation) {
      evaluateAnswers(storyResponseData);
      setTriggerNewEvaluation(false);
    }
  }, [triggerNewEvaluation, storyResponseData]);

  // Function to hit evaluate_answers endpoint (e.g. Anthropic API) to get a story based on values passed in
  const evaluateAnswers = async (storyResponseData: StoryResponseData) => {
    try {
      const response = await fetch("/anthropic/evaluate_answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          story: storyResponseData.body,
          question_1: storyResponseData.question_1,
          answer_1: storyResponseData.answer_1,
          question_2: storyResponseData.question_2,
          answer_2: storyResponseData.answer_2,
          question_3: storyResponseData.question_3,
          answer_3: storyResponseData.answer_3,
        }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Server response:", textResponse);
        setErrorText("Make sure you've answered all the questions.");
        throw new Error("Failed to evalaute the answers");
        setCircularProgressSubmit(false);
      }

      const data = await response.json();
      console.log(data);

      // Sets API response data into evaluationData state
      setCircularProgressSubmit(false);
      setEvaluationData({
        is_correct_1: data.evaluations[0].is_correct,
        feedback_1: data.evaluations[0].feedback,
        is_correct_2: data.evaluations[1].is_correct,
        feedback_2: data.evaluations[1].feedback,
        is_correct_3: data.evaluations[2].is_correct,
        feedback_3: data.evaluations[2].feedback,
        score: data.overall_score,
      });

      setShowEvaluationChecks(true);
      // Only calculate updated score if the user got at least 1 question correct (e.g. at least 1 point)
      if (data.overall_score > 0) {
        calculateScore(data.overall_score);
        setGotRight(true);
      } else if (data.overall_score == 0) {
        setGotWrong(true);
      }

      //return await response.json();
    } catch (error) {
      console.error("Error evaluating answers:", error);
      setCircularProgressSubmit(false);
      throw error;
    }
  };

  // Takes in raw evaluation score (0 - 3 questions correct) and adds multipliers to create point system.
  // Multiplier increases as the difficulty slider increases
  function calculateScore(rawScore: number) {
    let addToScore = potentialPoints * rawScore;

    let updatedScore = addToScore + userScore.reading_score;

    postUserScore(updatedScore);
    setPointsWon(addToScore);
    updateBadges(updatedScore);
  }

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserScore = async (updatedScore: number) => {
    try {
      const storedToken = localStorage.getItem("token");
      console.log("updatedScore is:", updatedScore);

      const response = await fetch(`/api/users-reading/${userInfo.id}/score`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          reading_score: updatedScore,
        }),
      });

      const data = await response.json();
      console.log(data);

      // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
      if (response.ok) {
        setUserScore((prevScores) => ({
          ...prevScores,
          reading_score: updatedScore,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function setting the logic on updating badges (true / false) based on point totals
  function updateBadges(newTotalScore: number) {
    setUserReadingBadges((prevBadges) => {
      const updatedBadges: Partial<UserReadingBadges> = {};

      if (newTotalScore >= 100 && !userReadingBadges.badge_1_1_bernese) {
        updatedBadges.badge_1_1_bernese = true;
        setModalBadge("badge_1_1_bernese");
      } else if (
        newTotalScore >= 250 &&
        !userReadingBadges.badge_1_2_chihuahua
      ) {
        updatedBadges.badge_1_2_chihuahua = true;
        setModalBadge("badge_1_2_chihuahua");
      } else if (
        newTotalScore >= 500 &&
        !userReadingBadges.badge_1_3_waterdog
      ) {
        updatedBadges.badge_1_3_waterdog = true;
        setModalBadge("badge_1_3_waterdog");
      } else if (newTotalScore >= 1000 && !userReadingBadges.badge_1_4_boxer) {
        updatedBadges.badge_1_4_boxer = true;
        setModalBadge("badge_1_4_boxer");
      } else if (newTotalScore >= 1500 && !userReadingBadges.badge_1_5_husky) {
        updatedBadges.badge_1_5_husky = true;
        setModalBadge("badge_1_5_husky");
      } else if (newTotalScore >= 2000 && !userReadingBadges.badge_1_6_golden) {
        updatedBadges.badge_1_6_golden = true;
        setModalBadge("badge_1_6_golden");
      } else if (newTotalScore >= 2500 && !userReadingBadges.badge_1_7_cat) {
        updatedBadges.badge_1_7_cat = true;
        setModalBadge("badge_1_7_cat");
      } else if (
        newTotalScore >= 3000 &&
        !userReadingBadges.badge_1_8_goldendoodle
      ) {
        updatedBadges.badge_1_8_goldendoodle = true;
        setModalBadge("badge_1_8_goldendoodle");
        // SETS badgeLevel to "2" WHICH WILL RENDER THE SECOND SET (LEVEL) OF BADGES
        setBadgeLevel((prev) => ({
          ...prev,
          reading_level: 2,
        }));
      } else if (
        newTotalScore >= 3250 &&
        !userReadingBadges.badge_2_1_borderCollie
      ) {
        updatedBadges.badge_2_1_borderCollie = true;
        setModalBadge("badge_2_1_borderCollie");
      } else if (
        newTotalScore >= 3500 &&
        !userReadingBadges.badge_2_2_terrier
      ) {
        updatedBadges.badge_2_2_terrier = true;
        setModalBadge("badge_2_2_terrier");
      } else if (
        newTotalScore >= 3750 &&
        !userReadingBadges.badge_2_3_australianShepherd
      ) {
        updatedBadges.badge_2_3_australianShepherd = true;
        setModalBadge("badge_2_3_australianShepherd");
      } else if (
        newTotalScore >= 4000 &&
        !userReadingBadges.badge_2_4_shibaInu
      ) {
        updatedBadges.badge_2_4_shibaInu = true;
        setModalBadge("badge_2_4_shibaInu");
      } else if (newTotalScore >= 4500 && !userReadingBadges.badge_2_5_cat) {
        updatedBadges.badge_2_5_cat = true;
        setModalBadge("badge_2_5_cat");
      } else if (
        newTotalScore >= 5000 &&
        !userReadingBadges.badge_2_6_bernese
      ) {
        updatedBadges.badge_2_6_bernese = true;
        setModalBadge("badge_2_6_bernese");
      } else if (newTotalScore >= 6000 && !userReadingBadges.badge_2_7_poodle) {
        updatedBadges.badge_2_7_poodle = true;
        setModalBadge("badge_2_7_poodle");
      } else if (newTotalScore >= 7500 && !userReadingBadges.badge_2_8_golden) {
        updatedBadges.badge_2_8_golden = true;
        setModalBadge("badge_2_8_golden");
      }

      if (Object.keys(updatedBadges).length > 0) {
        const newBadges = { ...prevBadges, ...updatedBadges };
        postUserBadges(updatedBadges);
        openModal();
        return newBadges;
      }
      return prevBadges;
    });
  }

  // Function to pass the updated badges to the database
  const postUserBadges = async (updatedBadges: Partial<UserReadingBadges>) => {
    try {
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}/badge_reading`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedBadges),
      });

      const data = await response.json();

      // State values now being set in updateBadges
      // if (response.ok) {
      //   //setUserBadges(data.badge);
      // }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Controls alert to user after submitting their answers, showing how many questions they got right and points accrued. Visible for 3.5 seconds.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gotRight) {
      timer = setTimeout(() => {
        setGotRight(false);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [gotRight]);

  // On "find another story" button. Finds a random value in the storyPrompt array and sets it in state (storyPrompt)
  const selectPrompt = () => {
    const randomIndex = Math.floor(Math.random() * storyPrompts.length);
    const prompt = storyPrompts[randomIndex];
    setStoryPrompt(prompt);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  };

  // Opens modal window showing new badge
  const openModal = () => {
    // console.log("Inside openModal: ", modalBadge);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="storyContainer">
        <button onClick={handleClick} className="button StoryGenerate">
          FETCH THE STORY <AutoAwesomeIcon style={{ fontSize: "22px" }} />
        </button>
        <div className="storyContentContainer">
          {circularProgress && <CircularColor />}
          <h1 className="gamePlayHeaders">{storyResponseData.title}</h1>
          <p className="preserve-linebreaks">{storyResponseData.body}</p>
          <br />

          {storyResponseData.body && (
            <>
              <h3 className="gamePlayHeaders">
                Answer these to win up to {potentialPoints * 3} points!
              </h3>
              <form action="" className="answerForm" onSubmit={submit}>
                <p>{storyResponseData.question_1}</p>
                <div className="answerInputBox">
                  <div className="empty"></div>
                  <input
                    type="text"
                    placeholder="Your answer..."
                    name="answer_1"
                    autoComplete="off"
                    value={storyResponseData.answer_1}
                    onChange={setFormValues}
                  />
                  {showEvaluationChecks && (
                    <div className="rightWrongIcon">
                      {evaluationData.is_correct_1 ? (
                        <CheckCircleIcon className="checkIcon" />
                      ) : (
                        <TipsAndUpdatesIcon className="bulbIcon" />
                      )}
                    </div>
                  )}
                </div>
                {showEvaluationChecks && (
                  <div className="feedback">
                    {!evaluationData.is_correct_1 && evaluationData.feedback_1}
                  </div>
                )}
                <p>{storyResponseData.question_2}</p>
                <div className="answerInputBox">
                  <div className="empty"></div>
                  <input
                    type="text"
                    placeholder="Your answer..."
                    name="answer_2"
                    autoComplete="off"
                    value={storyResponseData.answer_2}
                    onChange={setFormValues}
                  />
                  {showEvaluationChecks && (
                    <div className="rightWrongIcon">
                      {evaluationData.is_correct_2 ? (
                        <CheckCircleIcon className="checkIcon" />
                      ) : (
                        <TipsAndUpdatesIcon className="bulbIcon" />
                      )}
                    </div>
                  )}
                </div>
                {showEvaluationChecks && (
                  <div className="feedback">
                    {!evaluationData.is_correct_2 && evaluationData.feedback_2}
                  </div>
                )}
                <p>{storyResponseData.question_3}</p>
                <div className="answerInputBox">
                  <div className="empty"></div>
                  <input
                    type="text"
                    placeholder="Your answer..."
                    name="answer_3"
                    autoComplete="off"
                    value={storyResponseData.answer_3}
                    onChange={setFormValues}
                  />
                  {showEvaluationChecks && (
                    <div className="rightWrongIcon">
                      {evaluationData.is_correct_3 ? (
                        <CheckCircleIcon className="checkIcon" />
                      ) : (
                        <TipsAndUpdatesIcon className="bulbIcon" />
                      )}
                    </div>
                  )}
                </div>
                {showEvaluationChecks && (
                  <div className="feedback">
                    {!evaluationData.is_correct_3 && evaluationData.feedback_3}
                  </div>
                )}
                {circularProgressSubmit && <CircularColor />}
                {gotRight && (
                  <div className="rightAnswerAlert">
                    <h4>
                      Yay! You got {evaluationData.score} correct, for +
                      {pointsWon} points!
                    </h4>
                  </div>
                )}
                {gotWrong && (
                  <div className="wrongAnswerAlert">
                    <h4>Good effort. Keep trying!</h4>
                  </div>
                )}
                {!showEvaluationChecks && (
                  <button className="button login">SUBMIT</button>
                )}
              </form>
            </>
          )}

          {showEvaluationChecks && (
            <button className="button nextStory" onClick={selectPrompt}>
              TRY ANOTHER STORY
            </button>
          )}
          {errorText && <h3 style={{ color: "red" }}>{errorText}</h3>}
        </div>
        <p className="ai-disclaimer">
          {" "}
          <AutoAwesomeIcon
            style={{ fontSize: "16px", color: "#d4492b" }}
          />{" "}
          Woof Reading uses AI to build these stories. Learn more{" "}
          <Link to={"/About"} className="ai-link">
            here
          </Link>
          .
        </p>
      </div>
    </>
  );
}

export default GamePlay;
