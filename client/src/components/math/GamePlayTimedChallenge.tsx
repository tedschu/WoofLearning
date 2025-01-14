import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import NumberGenerator from "./NumberGenerator";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import wow1 from "../../assets/wow_1.png";
import wow2 from "../../assets/wow_2.png";
import wow3 from "../../assets/wow_3.png";
import mega from "../../assets/mega.png";
import check from "../../assets/check.png";
import xMark from "../../assets/x-mark.png";

import {
  GameSelectorType,
  UserScore,
  UserInfo,
  UserMathBadges,
  ModalBadgeType,
  BadgeLevel,
  BadgeProgress,
} from "../../types/types";

type GamePlayProps = {
  sliderValue: number;
  gameSelector: GameSelectorType;
  userScore: UserScore;
  setUserScore: React.Dispatch<React.SetStateAction<UserScore>>;
  userInfo: UserInfo;
  gotRight: boolean;
  gotWrong: boolean;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  userMathBadges: UserMathBadges;
  setUserMathBadges: React.Dispatch<React.SetStateAction<UserMathBadges>>;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalBadge: ModalBadgeType;
  setModalBadge: React.Dispatch<React.SetStateAction<ModalBadgeType>>;
  badgeLevel: BadgeLevel;
  setBadgeLevel: React.Dispatch<React.SetStateAction<BadgeLevel>>;
  badgeProgress: BadgeProgress;
  setBadgeProgress: React.Dispatch<React.SetStateAction<BadgeProgress>>;
  setIsTimedChallengeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTimedChallengeRunning: boolean;
  setIsTimedChallengeRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

type IncorrectEquation = {
  equation: string;
};

function GamePlayTimedChallenge({
  sliderValue,
  gameSelector,
  setUserScore,
  userInfo,
  gotRight,
  gotWrong,
  setGotRight,
  setGotWrong,
  userMathBadges,
  setUserMathBadges,
  setTotalScore,
  setIsModalOpen,
  setModalBadge,
  setBadgeLevel,
  isTimedChallengeRunning,
  setIsTimedChallengeRunning,
  challengeTopScores,
  setChallengeTopScores,
}: GamePlayProps) {
  const [questionCount, setQuestionCount] = useState(1);
  const [mathOperator, setMathOperator] = useState("+");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);
  const [thirdNumber, setThirdNumber] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | number>("");
  const [questionResult, setQuestionResult] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [addToScore, setAddToScore] = useState(0); // passes to NumberGenerator. Will update with expected value (score) to add to userScore IF the question is answered correctly.

  // NEW STATE VALUES SPECIFIC TO TIMED CHALLENGE COMPONENT
  const [challengePoints, setChallengePoints] = useState<number>(0); // Aggregates 'addToScore' to capture all points won in a given challenge
  const [questionsAttempted, setQuestionsAttempted] = useState<number>(1); // Aggregates the number of questions attempted in a given challenge
  const [questionsCorrect, setQuestionsCorrect] = useState<number>(0); // Aggregates the number of questions the user answered correctly in a given challenge
  const [incorrectEquations, setIncorrectEquations] = useState<
    IncorrectEquation[]
  >([]); // Stores all equations that the user answered incorrectly in an array of objects to eventually pass to Anthropic API for analysis
  // const [isTimedChallengeRunning, setIsTimedChallengeRunning] =
  //   useState<boolean>(false); // manages state for the 60 second timed challenge
  const [hasAnswer, setHasAnswer] = useState(true);
  const [showChallengeResults, setShowChallengeResults] = useState(false); // Controls box showing results of each challenge

  const images = [wow1, wow2, wow3, mega];
  const [randomLogo, setRandomLogo] = useState<string>(images[0]);

  // Function to open badge modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // ON PAGE LOAD, RESETS GAME COUNTS (QUESTION COUNT, ETC.)
  useEffect(() => {
    setQuestionsAttempted(0);
    setQuestionsCorrect(0);
    setShowChallengeResults(false);
    setHasAnswer(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer === "") {
      setHasAnswer(false);
      return;
    }

    findAnswer();
    setSubmitted(true);
    setHasAnswer(true);
  };

  // Determines the correct answer to the generated question AND stores value in questionResult
  // Compares userAnswer to questionResult to determine if answer is correct
  function findAnswer() {
    if (firstNumber === null || secondNumber === null) {
      console.error("First or second number is null");
      return;
    }

    let result = 0;

    switch (mathOperator) {
      case "+":
        result = firstNumber + secondNumber;
        if (thirdNumber && sliderValue === 5) result += thirdNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        if (thirdNumber && sliderValue === 5) result -= thirdNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        if (thirdNumber && sliderValue === 5) result *= thirdNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }
    setQuestionResult(Math.round(result));
  }

  // User input field (answer) results
  const setAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(parseInt(e.target.value));
    //console.log(value);
  };

  function checkResult() {
    if (userAnswer === questionResult) {
      setGotWrong(false);
      // FUNCTION TO SET USERSCORE
      setUserScore((prevScore) => {
        const updatedScores = getUpdatedScores(
          gameSelector,
          addToScore,
          prevScore
        );

        setChallengePoints((prevPoints) => prevPoints + addToScore); // Aggregates points for a given timed challenge when the user answers questions correctly
        setQuestionsCorrect((prevNum) => prevNum + 1);

        const newTotalScore = getTotalScore(updatedScores, prevScore);
        const newUserScore = { ...prevScore, ...updatedScores };
        updateBadges(newTotalScore, newUserScore);

        setTotalScore(newTotalScore);
        postUserScore(updatedScores);

        setUserAnswer("");
        handleQuestionCount(); // ensures next question loads automatically upon rightAnswer
        setGotRight(true);

        return { ...prevScore, ...updatedScores };
      });
    } else {
      setGotWrong(true);
      setGotRight(false);
      handleQuestionCount(); // ensures next question loads automatically upon rightAnswer

      // BUILDS THE incorrectQuestions STATE (ARRAY OF OBJECTS THAT REPRESENT AN EQUATION THAT THE USER ANSWERED INCORRECTLY)

      setIncorrectEquations((prevEquations) => {
        const equationBuilder =
          firstNumber?.toString() +
          " " +
          mathOperator +
          " " +
          secondNumber?.toString() +
          (thirdNumber && sliderValue == 5
            ? " " + mathOperator + " " + thirdNumber?.toString()
            : "") +
          " = " +
          userAnswer;

        const newObject = { equation: equationBuilder };

        return [...prevEquations, newObject];
      });
    }
  }

  function updateBadges(newTotalScore: number, newUserScore: UserScore) {
    setUserMathBadges((prevBadges) => {
      const updatedBadges: Partial<UserMathBadges> = {};

      if (newTotalScore >= 100 && !userMathBadges.badge_1_1_bernese) {
        updatedBadges.badge_1_1_bernese = true;
        setModalBadge("badge_1_1_bernese");
      } else if (newTotalScore >= 250 && !userMathBadges.badge_1_2_chihuahua) {
        updatedBadges.badge_1_2_chihuahua = true;
        setModalBadge("badge_1_2_chihuahua");
      } else if (newTotalScore >= 500 && !userMathBadges.badge_1_3_waterdog) {
        updatedBadges.badge_1_3_waterdog = true;
        setModalBadge("badge_1_3_waterdog");
      } else if (newTotalScore >= 1000 && !userMathBadges.badge_1_4_boxer) {
        updatedBadges.badge_1_4_boxer = true;
        setModalBadge("badge_1_4_boxer");
      } else if (
        newTotalScore >= 1000 &&
        newUserScore.addition_score >= 250 &&
        newUserScore.subtraction_score >= 250 &&
        newUserScore.multiplication_score >= 250 &&
        newUserScore.division_score >= 250 &&
        !userMathBadges.badge_1_5_husky
      ) {
        updatedBadges.badge_1_5_husky = true;
        setModalBadge("badge_1_5_husky");
      } else if (newTotalScore >= 2000 && !userMathBadges.badge_1_6_golden) {
        updatedBadges.badge_1_6_golden = true;
        setModalBadge("badge_1_6_golden");
      } else if (
        newTotalScore >= 2000 &&
        newUserScore.addition_score >= 500 &&
        newUserScore.subtraction_score >= 500 &&
        newUserScore.multiplication_score >= 500 &&
        newUserScore.division_score >= 500 &&
        !userMathBadges.badge_1_7_cat
      ) {
        updatedBadges.badge_1_7_cat = true;
        setModalBadge("badge_1_7_cat");
      } else if (
        newTotalScore >= 3000 &&
        !userMathBadges.badge_1_8_goldendoodle
      ) {
        updatedBadges.badge_1_8_goldendoodle = true;
        updatedBadges.badge_level = 2;
        setModalBadge("badge_1_8_goldendoodle");
        // SETS badgeLevel to "2" WHICH WILL RENDER THE SECOND SET (LEVEL) OF BADGES
        setBadgeLevel((prev) => ({
          ...prev,
          math_level: 2,
        }));
      } else if (
        newTotalScore >= 3250 &&
        !userMathBadges.badge_2_1_borderCollie
      ) {
        updatedBadges.badge_2_1_borderCollie = true;
        setModalBadge("badge_2_1_borderCollie");
      } else if (newTotalScore >= 4000 && !userMathBadges.badge_2_2_terrier) {
        updatedBadges.badge_2_2_terrier = true;
        setModalBadge("badge_2_2_terrier");
      } else if (
        newTotalScore >= 5000 &&
        !userMathBadges.badge_2_3_australianShepherd
      ) {
        updatedBadges.badge_2_3_australianShepherd = true;
        setModalBadge("badge_2_3_australianShepherd");
      } else if (newTotalScore >= 6000 && !userMathBadges.badge_2_4_shibaInu) {
        updatedBadges.badge_2_4_shibaInu = true;
        setModalBadge("badge_2_4_shibaInu");
      } else if (newTotalScore >= 7000 && !userMathBadges.badge_2_5_cat) {
        updatedBadges.badge_2_5_cat = true;
        setModalBadge("badge_2_5_cat");
      } else if (newTotalScore >= 8000 && !userMathBadges.badge_2_6_bernese) {
        updatedBadges.badge_2_6_bernese = true;
        setModalBadge("badge_2_6_bernese");
      } else if (newTotalScore >= 10000 && !userMathBadges.badge_2_7_poodle) {
        updatedBadges.badge_2_7_poodle = true;
        setModalBadge("badge_2_7_poodle");
      } else if (newTotalScore >= 15000 && !userMathBadges.badge_2_8_golden) {
        updatedBadges.badge_2_8_golden = true;
        setModalBadge("badge_2_8_golden");
      }

      if (Object.keys(updatedBadges).length > 0) {
        const newBadges = { ...prevBadges, ...updatedBadges };
        postUserMathBadges(updatedBadges);
        openModal();
        return newBadges;
      }
      return prevBadges;
    });
  }

  // Function to create an object for the score that's being updated (ex. addition) to pass into body / update DB
  function getUpdatedScores(
    gameSelector: GameSelectorType,
    addToScore: number,
    currentScore: UserScore
  ): Partial<UserScore> {
    const updatedScores: Partial<UserScore> = {};
    switch (gameSelector) {
      case "addition":
        updatedScores.addition_score = addToScore + currentScore.addition_score;
        break;
      case "subtraction":
        updatedScores.subtraction_score =
          addToScore + currentScore.subtraction_score;
        break;
      case "multiplication":
        updatedScores.multiplication_score =
          addToScore + currentScore.multiplication_score;
        break;
      case "division":
        updatedScores.division_score = addToScore + currentScore.division_score;
        break;
    }

    function getMathLevelKey(level: number): keyof UserScore {
      const key = `math_L${level}_points` as keyof UserScore;
      return key;
    }

    const mathKey = getMathLevelKey(sliderValue);

    // UPDATES POINTS BY LEVEL (EX. "math_L1_points") IN "SCORE_MATH" TABLE
    updatedScores[mathKey] = addToScore + currentScore[mathKey];

    return updatedScores;
  }

  // ****
  function getTotalScore(
    updatedScores: Partial<UserScore>,
    prevScore: UserScore
  ): number {
    const newTotalScore =
      (updatedScores.addition_score !== undefined
        ? updatedScores.addition_score
        : prevScore.addition_score) +
      (updatedScores.subtraction_score !== undefined
        ? updatedScores.subtraction_score
        : prevScore.subtraction_score) +
      (updatedScores.multiplication_score !== undefined
        ? updatedScores.multiplication_score
        : prevScore.multiplication_score) +
      (updatedScores.division_score !== undefined
        ? updatedScores.division_score
        : prevScore.division_score);

    return newTotalScore;
  }

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserScore = async (
    updatedScores: Partial<UserScore>
  ): Promise<void> => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users-math/${userInfo.id}/score`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedScores),
      });

      const data = await response.json();

      // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
      if (response.ok) {
        //setuserMathBadges(data.badge);
        setTotalScore(
          data.addition_score +
            data.subtraction_score +
            data.multiplication_score +
            data.division_score
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      checkResult();
      setSubmitted(false);
    }
  }, [submitted, userAnswer, questionResult]);

  // Increments questionCount when user hits "next question"
  // Using functions passed to a setter (rather than directly setting value) ensures that the most
  // up-to-date value of state is used, lessening the need for useEffect dependencies.
  // Use functional updates when your new state depends on the previous state
  function handleQuestionCount() {
    setQuestionCount((prevCount) => prevCount + 1);
    setQuestionsAttempted((prevCount) => prevCount + 1);
    setUserAnswer("");
    // setGotRight(false);
    // setGotWrong(false);
  }

  // Controls alert when question was right. Visible for 3 seconds.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gotRight || gotWrong) {
      timer = setTimeout(() => {
        setGotRight(false);
        setGotWrong(false);
      }, 900);
    }
    return () => clearTimeout(timer);
  }, [gotRight, gotWrong]);

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserMathBadges = async (
    updatedBadges: Partial<UserMathBadges>
  ): Promise<void> => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users-math/${userInfo.id}/badge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedBadges),
      });

      // const data = await response.json();
      //console.log(data);

      if (response.ok) {
        return;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // TIED TO "START GAME" BUTTON
  function handleStartGame() {
    setIsTimedChallengeRunning(true);
    setQuestionsAttempted(0);
    setQuestionsCorrect(0);
    setIncorrectEquations([]);
    setChallengePoints(0);
    setShowChallengeResults(false);
    randomImage();
  }

  // Callback function that is passed to the Timer component, and is called when timer state === 0 (e.g. game is over)
  const handleTimeUp = useCallback(() => {
    setIsTimedChallengeRunning(false);
    setShowChallengeResults(true);

    // Function to pass the challenge score and data to the database
    const postUserChallengeResults = async (): Promise<void> => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await fetch(`/api/users-math/timed-challenge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            user_id: userInfo.id,
            math_type: gameSelector,
            level: sliderValue,
            points_added: challengePoints,
            questions_attempted: questionsAttempted,
            questions_correct: questionsCorrect,
            incorrect_questions: incorrectEquations,
          }),
        });
        if (response.ok) {
          return;
        }
      } catch (error) {
        console.error("Error passing challenge data:", error);
      }
    };

    // Only makes API call if the user actually attempted to answer questions
    if (questionsAttempted > 0) postUserChallengeResults();

    //
  }, [
    userInfo.id,
    gameSelector,
    sliderValue,
    challengePoints,
    questionsAttempted,
    questionsCorrect,
    incorrectEquations,
  ]);

  function randomImage() {
    const random = Math.floor(Math.random() * 3) + 1;

    setRandomLogo(images[random]);
  }

  // ****
  // TODO: WRITE FUNCTION THAT OUTPUTS TOP SCORE FOR LEVEL + MATH TYPE
  function topScore() {
    // sliderValue
    // gameSelector

    const mathType = challengeTopScores.formattedScores.filter(
      (score) => score.math_type === gameSelector
    );

    const finalTopScore = mathType.filter(
      (score) => score.level === sliderValue
    );

    console.log(finalTopScore);
  }

  console.log(gameSelector);

  return (
    <>
      <div className="gamePlayContainer-challenge">
        <div className="gamePlay-challenge">
          <div className="gamePlay-challengeTimer">
            <h1
              className={`timerBox ${
                isTimedChallengeRunning ? "" : "inactive"
              }`}
            >
              <Timer
                isTimedChallengeRunning={isTimedChallengeRunning}
                setIsTimedChallengeRunning={setIsTimedChallengeRunning}
                onTimeUp={handleTimeUp}
              />
            </h1>
          </div>
          {/* Displays a container showing challenge results at the end of the challenge */}
          {showChallengeResults && (
            <>
              <div className="challengeResults">
                <div className="challengeResults-logoContainer">
                  <img
                    src={randomLogo}
                    className="challengeResults-woofLogo"
                    alt=""
                  />
                </div>
                <div className="challengeResults-text">
                  <h3>Here's how you did:</h3>
                  <ul>
                    <li> {challengePoints} points added</li>
                    <li>
                      {questionsCorrect} of {questionsAttempted} questions
                      correct (that's{" "}
                      {questionsAttempted === 0 ? (
                        <>0%</>
                      ) : (
                        <>
                          {Math.round(
                            (questionsCorrect / questionsAttempted) * 100
                          )}
                          %
                        </>
                      )}
                      )
                    </li>
                  </ul>
                  <Link to={"/me"} className="challengeResults-link">
                    <h4>See more about your progress</h4>
                  </Link>
                </div>
              </div>
            </>
          )}
          {!isTimedChallengeRunning && (
            <>
              <button
                className="button-challengeStart"
                onClick={handleStartGame}
              >
                START NEW GAME
              </button>
            </>
          )}

          {isTimedChallengeRunning && (
            <>
              <h3>
                Question #{questionsAttempted + 1} (for
                <span className="pointsHighlight"> {addToScore} points</span>):
              </h3>

              <form className="formContainer" onSubmit={handleSubmit}>
                <div className="questionContainer">
                  <NumberGenerator
                    sliderValue={sliderValue}
                    gameSelector={gameSelector}
                    setFirstNumber={setFirstNumber}
                    setSecondNumber={setSecondNumber}
                    setThirdNumber={setThirdNumber}
                    setMathOperator={setMathOperator}
                    firstNumber={firstNumber}
                    secondNumber={secondNumber}
                    thirdNumber={thirdNumber}
                    mathOperator={mathOperator}
                    questionCount={questionCount}
                    setAddToScore={setAddToScore}
                  />
                  <div className="equalSpace">=</div>
                  <div className="answerBox">
                    <input
                      type="number"
                      placeholder="Your answer..."
                      value={userAnswer}
                      onChange={setAnswer}
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      className="answer-input"
                      // style={{
                      //   border: "1px solid #ccc",
                      //   outline: "none",
                      //   "&:focus": {
                      //     border: "2px solid #7dc2e0",
                      //     // boxShadow: "0 0 5px rgba(166, 213, 234, 0.5)",
                      //   },
                      // }}
                    />
                  </div>
                </div>
                {/* SUBMIT BUTTON */}
                <div className="answerSubmitChallenge">
                  <div></div>
                  <button
                    className="button submit"
                    type="submit"
                    // autoFocus
                  >
                    SUBMIT
                  </button>
                  <div className="answerSubmit-gridRight">
                    {gotRight && <img src={check} alt="" />}
                    {gotWrong && <img src={xMark} alt="" />}
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Prompt based on response goes here (e.g. "yay, you got it right") see MUI components */}
          {/* <div className="answerAlert"></div> */}
          {/* {gotRight && (
            <div className="rightAnswerAlert">
              <h4>Yay! You got it right! That's +{addToScore} points!</h4>
            </div>
          )}
          {gotWrong && (
            <div className="wrongAnswerAlert">
              <h4>Incorrect. Keep going!</h4>
            </div>
          )} */}
          {!hasAnswer && (
            <div className="wrongAnswerAlert">
              <h4>Make sure you answer!</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GamePlayTimedChallenge;
