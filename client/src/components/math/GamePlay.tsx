import React from "react";
import { useState, useEffect } from "react";
import NumberGenerator from "./NumberGenerator";

import {
  GameSelectorType,
  UserScore,
  UserInfo,
  UserBadges,
  ModalBadgeType,
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
  userBadges: UserBadges;
  setUserBadges: React.Dispatch<React.SetStateAction<UserBadges>>;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalBadge: ModalBadgeType;
  setModalBadge: React.Dispatch<React.SetStateAction<ModalBadgeType>>;
};

function GamePlay({
  sliderValue,
  gameSelector,
  setUserScore,
  userInfo,
  gotRight,
  gotWrong,
  setGotRight,
  setGotWrong,
  userBadges,
  setUserBadges,
  setTotalScore,
  setIsModalOpen,
  setModalBadge,
}: GamePlayProps) {
  const [questionCount, setQuestionCount] = useState(1);
  const [mathOperator, setMathOperator] = useState("+");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);
  const [thirdNumber, setThirdNumber] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | number>("");
  const [questionResult, setQuestionResult] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // passes to NumberGenerator. Will update with expected value (score) to add to userScore IF the question is answered correctly.
  const [addToScore, setAddToScore] = useState(0);

  const openModal = () => {
    // console.log("Inside openModal: ", modalBadge);
    setIsModalOpen(true);
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
      // FUNCTION TO SET USERSCORE WILL GO HERE
      setUserScore((prevScore) => {
        const updatedScores = getUpdatedScores(
          gameSelector,
          addToScore,
          prevScore
        );

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
    }
  }

  function updateBadges(newTotalScore: number, newUserScore: UserScore) {
    setUserBadges((prevBadges) => {
      const updatedBadges: Partial<UserBadges> = {};

      if (newTotalScore >= 100 && !userBadges.bernese) {
        updatedBadges.bernese = true;
        setModalBadge("bernese");
      } else if (newTotalScore >= 500 && !userBadges.chihuahua) {
        updatedBadges.chihuahua = true;
        setModalBadge("chihuahua");
      } else if (newTotalScore >= 1000 && !userBadges.boxer) {
        updatedBadges.boxer = true;
        setModalBadge("boxer");
      } else if (
        newTotalScore >= 1000 &&
        newUserScore.addition_score >= 250 &&
        newUserScore.subtraction_score >= 250 &&
        newUserScore.multiplication_score >= 250 &&
        newUserScore.division_score >= 250 &&
        !userBadges.husky
      ) {
        updatedBadges.husky = true;
        setModalBadge("husky");
      } else if (newTotalScore >= 2000 && !userBadges.golden) {
        updatedBadges.golden = true;
        setModalBadge("golden");
      } else if (
        newTotalScore >= 2000 &&
        newUserScore.addition_score >= 500 &&
        newUserScore.subtraction_score >= 500 &&
        newUserScore.multiplication_score >= 500 &&
        newUserScore.division_score >= 500 &&
        !userBadges.cat
      ) {
        updatedBadges.cat = true;
        setModalBadge("cat");
      } else if (newTotalScore >= 3000 && !userBadges.goldendoodle_trophy) {
        updatedBadges.goldendoodle_trophy = true;
        setModalBadge("goldendoodle_trophy");
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

      const response = await fetch(`/api/users/${userInfo.id}/score`, {
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
        //setUserBadges(data.badge);
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
    setUserAnswer("");
    setGotRight(false);
    setGotWrong(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    findAnswer();
    setSubmitted(true);
  };

  // Controls alert when question was right. Visible for 3 seconds.
  useEffect(() => {
    let timer: number;
    if (gotRight) {
      timer = setTimeout(() => {
        setGotRight(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [gotRight]);

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserBadges = async (
    updatedBadges: Partial<UserBadges>
  ): Promise<void> => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}/badge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedBadges),
      });

      const data = await response.json();
      //console.log(data);

      // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
      if (response.ok) {
        //setUserBadges(data.badge);
        // console.log(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // console.log(hasNewBadge);

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h3>
            Question #{questionCount} (for
            <span className="pointsHighlight"> {addToScore} points</span>):
          </h3>

          <form onSubmit={handleSubmit}>
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
            <div className="answerSubmit">
              <button
                className="button submit"
                type="submit"
                // autoFocus
              >
                SUBMIT
              </button>
            </div>
          </form>

          {/* Prompt based on response goes here (e.g. "yay, you got it right") see MUI components */}
          <div className="answerAlert"></div>
          {gotRight && (
            <div className="rightAnswerAlert">
              <h4>Yay! You got it right! That's +{addToScore} points!</h4>
            </div>
          )}
          {gotWrong && (
            <div className="wrongAnswerAlert">
              <h4>Oops. Try again!</h4>
            </div>
          )}

          <button className="buttonGrayText skip" onClick={handleQuestionCount}>
            SKIP QUESTION
          </button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
