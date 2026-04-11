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
  setBadgeLevel,
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
      hint_1: "",
      hint_2: "",
      hint_3: "",
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

  // Staggered reveal: how many question results are currently visible (0–3)
  const [revealedCount, setRevealedCount] = useState(0);

  // Hints: tracks which hints have been revealed per question
  const [hintsShown, setHintsShown] = useState([false, false, false]);
  // Tracks which questions had a hint used (affects points)
  const [hintsUsed, setHintsUsed] = useState([false, false, false]);

  // ***** STORY GENERATION *****

  const handleClick = () => {
    setCircularProgress(true);
    setTriggerNewStory(true);
    setShowEvaluationChecks(false);
    setRevealedCount(0);
    setGotWrong(false);
    setErrorText("");
    setPotentialPoints(pointsToWin);
    setHintsShown([false, false, false]);
    setHintsUsed([false, false, false]);
  };

  useEffect(() => {
    if (triggerNewStory) {
      getStory();
      setTriggerNewStory(false);
    }
  }, [triggerNewStory, storyLength, sliderValue, storyPrompt, storyType]);

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
        hint_1: data.Hint_1 ?? "",
        hint_2: data.Hint_2 ?? "",
        hint_3: data.Hint_3 ?? "",
      });
    } catch (error) {
      console.error("Error generating story:", error);
      setCircularProgress(false);
      throw error;
    }
  };

  // ***** USER ANSWERS AND EVALUATION *****

  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...storyResponseData };
    const inputName = event.target.name as keyof StoryResponseData;
    newObj[inputName] = event.target.value;
    setStoryResponseData(newObj);
  };

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

  const userResponsesArray = [
    storyResponseData.answer_1,
    storyResponseData.answer_2,
    storyResponseData.answer_3,
  ];

  const checkBadWords = () => {
    const lowerCaseBadWords = userResponsesArray.map((word) =>
      word.toLowerCase()
    );
    for (let i = 0; i < lowerCaseBadWords.length; i++) {
      if (badWords.includes(lowerCaseBadWords[i])) return true;
    }
  };

  useEffect(() => {
    if (triggerNewEvaluation) {
      evaluateAnswers(storyResponseData);
      setTriggerNewEvaluation(false);
    }
  }, [triggerNewEvaluation, storyResponseData]);

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
        setCircularProgressSubmit(false);
        throw new Error("Failed to evaluate the answers");
      }

      const data = await response.json();
      console.log(data);

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

      // Staggered reveal: show one result every 700ms
      setRevealedCount(0);
      setTimeout(() => setRevealedCount(1), 300);
      setTimeout(() => setRevealedCount(2), 1000);
      setTimeout(() => setRevealedCount(3), 1700);

      if (data.overall_score > 0) {
        calculateScore(data.overall_score);
        // Delay the success alert until all three are revealed
        setTimeout(() => setGotRight(true), 2000);
      } else {
        setTimeout(() => setGotWrong(true), 2000);
      }
    } catch (error) {
      console.error("Error evaluating answers:", error);
      setCircularProgressSubmit(false);
      throw error;
    }
  };

  function calculateScore(rawScore: number) {
    // Apply 1.5x multiplier if this round completes a streak of 3+ perfect scores
    const currentStreak = userScore.reading_perfect_streak ?? 0;
    const isStreakBonus = rawScore === 3 && currentStreak >= 2;
    const basePoints = potentialPoints * rawScore;
    const addToScore = isStreakBonus ? Math.round(basePoints * 1.5) : basePoints;

    // Deduct half points for each correct answer where a hint was used
    const hintPenalty = [0, 1, 2].reduce((total, i) => {
      const isCorrect = [
        evaluationData.is_correct_1,
        evaluationData.is_correct_2,
        evaluationData.is_correct_3,
      ][i];
      return total + (hintsUsed[i] && isCorrect ? Math.round(potentialPoints / 2) : 0);
    }, 0);

    const finalPoints = Math.max(0, addToScore - hintPenalty);

    function getReadingLevelKey(level: number): keyof UserScore {
      return `reading_L${level}_points` as keyof UserScore;
    }

    const readingKey = getReadingLevelKey(sliderValue);
    const updatedScore: Partial<UserScore> = {};
    updatedScore.reading_score = finalPoints + userScore.reading_score;
    updatedScore[readingKey] = finalPoints + userScore[readingKey];

    console.log("updatedScore is: ", updatedScore);

    postUserScore(updatedScore, rawScore);
    setPointsWon(finalPoints);
    updateBadges(updatedScore.reading_score);
  }

  const postUserScore = async (updatedScore: Partial<UserScore>, rawScore: number) => {
    try {
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users-reading/${userInfo.id}/score`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ ...updatedScore, overall_score: rawScore }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserScore((prevScores) => ({
          ...prevScores,
          ...updatedScore,
          reading_perfect_streak: data.reading_perfect_streak ?? prevScores.reading_perfect_streak,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  function updateBadges(newTotalScore: number) {
    setUserReadingBadges((prevBadges) => {
      const updatedBadges: Partial<UserReadingBadges> = {};

      if (newTotalScore >= 100 && !userReadingBadges.badge_1_1_bernese) {
        updatedBadges.badge_1_1_bernese = true;
        setModalBadge("badge_1_1_bernese");
      } else if (newTotalScore >= 250 && !userReadingBadges.badge_1_2_chihuahua) {
        updatedBadges.badge_1_2_chihuahua = true;
        setModalBadge("badge_1_2_chihuahua");
      } else if (newTotalScore >= 500 && !userReadingBadges.badge_1_3_waterdog) {
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
      } else if (newTotalScore >= 3000 && !userReadingBadges.badge_1_8_goldendoodle) {
        updatedBadges.badge_1_8_goldendoodle = true;
        setModalBadge("badge_1_8_goldendoodle");
        setBadgeLevel((prev) => ({ ...prev, reading_level: 2 }));
      } else if (newTotalScore >= 3250 && !userReadingBadges.badge_2_1_borderCollie) {
        updatedBadges.badge_2_1_borderCollie = true;
        setModalBadge("badge_2_1_borderCollie");
      } else if (newTotalScore >= 3500 && !userReadingBadges.badge_2_2_terrier) {
        updatedBadges.badge_2_2_terrier = true;
        setModalBadge("badge_2_2_terrier");
      } else if (newTotalScore >= 3750 && !userReadingBadges.badge_2_3_australianShepherd) {
        updatedBadges.badge_2_3_australianShepherd = true;
        setModalBadge("badge_2_3_australianShepherd");
      } else if (newTotalScore >= 4000 && !userReadingBadges.badge_2_4_shibaInu) {
        updatedBadges.badge_2_4_shibaInu = true;
        setModalBadge("badge_2_4_shibaInu");
      } else if (newTotalScore >= 4500 && !userReadingBadges.badge_2_5_cat) {
        updatedBadges.badge_2_5_cat = true;
        setModalBadge("badge_2_5_cat");
      } else if (newTotalScore >= 5000 && !userReadingBadges.badge_2_6_bernese) {
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

  const postUserBadges = async (updatedBadges: Partial<UserReadingBadges>) => {
    try {
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users-reading/${userInfo.id}/badge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedBadges),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update badges");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gotRight) {
      timer = setTimeout(() => {
        setGotRight(false);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [gotRight]);

  const selectPrompt = () => {
    const randomIndex = Math.floor(Math.random() * storyPrompts.length);
    const prompt = storyPrompts[randomIndex];
    setStoryPrompt(prompt);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const hints = [storyResponseData.hint_1, storyResponseData.hint_2, storyResponseData.hint_3];
  const questions = [storyResponseData.question_1, storyResponseData.question_2, storyResponseData.question_3];
  const answerKeys = ["answer_1", "answer_2", "answer_3"] as const;
  const isCorrects = [evaluationData.is_correct_1, evaluationData.is_correct_2, evaluationData.is_correct_3];
  const feedbacks = [evaluationData.feedback_1, evaluationData.feedback_2, evaluationData.feedback_3];

  const currentStreak = userScore.reading_perfect_streak ?? 0;

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

              {/* Streak display */}
              {currentStreak >= 1 && (
                <div className="streakBadge">
                  🔥 {currentStreak} perfect {currentStreak === 1 ? "round" : "rounds"} in a row!
                  {currentStreak >= 2 && (
                    <span className="streakBonus"> Next perfect round = 1.5× points!</span>
                  )}
                </div>
              )}

              <form action="" className="answerForm" onSubmit={submit}>
                {questions.map((question, i) => (
                  <div key={i}>
                    <p>{question}</p>

                    {/* Hint button — only shown before submission */}
                    {!showEvaluationChecks && hints[i] && (
                      <div className="hintContainer">
                        {hintsShown[i] ? (
                          <p className="hintText">💡 {hints[i]}</p>
                        ) : (
                          <button
                            type="button"
                            className="hintButton"
                            onClick={() => {
                              const updated = [...hintsShown];
                              updated[i] = true;
                              setHintsShown(updated);
                              const usedUpdated = [...hintsUsed];
                              usedUpdated[i] = true;
                              setHintsUsed(usedUpdated);
                            }}
                          >
                            Need a hint?
                          </button>
                        )}
                      </div>
                    )}

                    <div className="answerInputBox">
                      <div className="empty"></div>
                      <input
                        type="text"
                        placeholder="Your answer..."
                        name={answerKeys[i]}
                        autoComplete="off"
                        value={storyResponseData[answerKeys[i]]}
                        onChange={setFormValues}
                      />
                      {/* Staggered reveal: only show icon when this question's index < revealedCount */}
                      {showEvaluationChecks && revealedCount > i && (
                        <div className={`rightWrongIcon resultReveal`}>
                          {isCorrects[i] ? (
                            <CheckCircleIcon className="checkIcon" />
                          ) : (
                            <TipsAndUpdatesIcon className="bulbIcon" />
                          )}
                        </div>
                      )}
                    </div>

                    {showEvaluationChecks && revealedCount > i && (
                      <div className="feedback resultReveal">
                        {!isCorrects[i] && feedbacks[i]}
                        {isCorrects[i] && hintsUsed[i] && (
                          <span className="hintPenaltyNote"> (half points — hint used)</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {circularProgressSubmit && <CircularColor />}
                {gotRight && revealedCount >= 3 && (
                  <div className="rightAnswerAlert">
                    <h4>
                      Yay! You got {evaluationData.score} correct, for +{pointsWon} points!
                      {currentStreak >= 3 && (
                        <span> 🔥 Streak bonus applied!</span>
                      )}
                    </h4>
                  </div>
                )}
                {gotWrong && revealedCount >= 3 && (
                  <div className="wrongAnswerAlert">
                    <h4>Good effort. Keep trying!</h4>
                  </div>
                )}
                {!showEvaluationChecks && (
                  <div className="readingButtonSpacer">
                    <button className="button login">SUBMIT</button>
                  </div>
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
