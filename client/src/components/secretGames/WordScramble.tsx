// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import wordScrambleBank from "./wordScrambleBank";
import englishWords from "an-array-of-english-words";

function getRandomWord(difficulty, usedWords) {
  const bank = wordScrambleBank[`level${difficulty}`];
  const available = bank.filter((w) => !usedWords.includes(w));
  const pool = available.length > 0 ? available : bank;
  return pool[Math.floor(Math.random() * pool.length)];
}

function scrambleWord(word) {
  if (word.length <= 1) return word;
  let scrambled;
  let attempts = 0;
  do {
    scrambled = word.split("").sort(() => Math.random() - 0.5).join("");
    attempts++;
  } while (scrambled === word && attempts < 100);
  return scrambled;
}

const englishWordSet = new Set(englishWords);

// Accept any real English word that uses the same letters as the current word
function isValidAnswer(userInput, currentWord) {
  const input = userInput.trim().toLowerCase();
  const sortLetters = (s) => s.split("").sort().join("");
  return (
    sortLetters(input) === sortLetters(currentWord) &&
    englishWordSet.has(input)
  );
}

function calculatePoints(timeLeft, correct) {
  if (!correct) return 0;
  if (timeLeft >= 12) return 17;
  if (timeLeft >= 8) return 12;
  if (timeLeft >= 4) return 10;
  return 8;
}

const difficultyMarks = [
  { value: 1, label: "Easy" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Hard" },
];

function WordScramble() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [gamePhase, setGamePhase] = useState("setup");
  const [difficulty, setDifficulty] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [roundNumber, setRoundNumber] = useState(1);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(17);
  const [usedWords, setUsedWords] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  // Timer
  useEffect(() => {
    if (gamePhase !== "playing") return;
    if (timeLeft <= 0) {
      setLastResult({ correct: false, points: 0 });
      setGamePhase("turnResult");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gamePhase, timeLeft]);

  // Auto-focus input when playing phase begins
  useEffect(() => {
    if (gamePhase === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gamePhase]);

  function startGame() {
    setCurrentPlayer(1);
    setRoundNumber(1);
    setScores({ 1: 0, 2: 0 });
    setUsedWords([]);
    setGamePhase("turnStart");
  }

  function startTurn() {
    const word = getRandomWord(difficulty, usedWords);
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput("");
    setTimeLeft(17);
    setUsedWords((prev) => [...prev, word]);
    setGamePhase("playing");
  }

  function handleSubmit() {
    const correct = isValidAnswer(userInput, currentWord);
    const points = calculatePoints(timeLeft, correct);
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + points,
    }));
    setLastResult({ correct, points });
    setGamePhase("turnResult");
  }

  function advanceTurn() {
    if (currentPlayer === 1) {
      // Player 1 just finished — hand to Player 2 within the same round
      setCurrentPlayer(2);
      setGamePhase("turnStart");
    } else {
      // Player 2 just finished — end of round
      if (roundNumber >= 4) {
        setGamePhase("gameOver");
      } else {
        setRoundNumber((prev) => prev + 1);
        setCurrentPlayer(1);
        setGamePhase("turnStart");
      }
    }
  }

  function resetGame() {
    setGamePhase("setup");
    setDifficulty(1);
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
    setRoundNumber(1);
    setCurrentWord("");
    setScrambledWord("");
    setUserInput("");
    setTimeLeft(17);
    setUsedWords([]);
    setLastResult(null);
  }

  const nextPlayer = currentPlayer === 1 ? 2 : 1;

  return (
    <div className="wordScrambleContainer">

      {/* ── SETUP ── */}
      {gamePhase === "setup" && (
        <div className="wordScrambleCard">
          <h1 className="wordScrambleTitle">Word Scramble</h1>
          <p className="wordScrambleSubtext">
            Take turns unscrambling words. 4 rounds — fastest and most accurate wins!
          </p>
          <p className="wordScrambleLabelText">Difficulty</p>
          <Box sx={{ width: 240 }}>
            <Slider
              value={difficulty}
              onChange={(_, val) => setDifficulty(val)}
              min={1}
              max={3}
              step={1}
              marks={difficultyMarks}
              valueLabelDisplay="off"
              sx={{
                "& .MuiSlider-markLabel": {
                  fontFamily: "Chicle",
                  color: "#0085bd",
                  fontSize: "16px",
                },
                "& .MuiSlider-thumb": { color: "#dd6e55" },
                "& .MuiSlider-track": { color: "#7dc2e0" },
                "& .MuiSlider-rail": { color: "#a6d5ea" },
              }}
            />
          </Box>
          <button className="wordScrambleButton" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {/* ── TURN START ── */}
      {gamePhase === "turnStart" && (
        <div className="wordScrambleCard">
          <h2 className="wordScramblePlayerHeader">
            Player {currentPlayer}'s Turn!
          </h2>
          <p className="wordScrambleSubtext">
            Hand the device to Player {currentPlayer}, then press continue.
          </p>
          <button className="wordScrambleButton" onClick={startTurn}>
            I'm Ready!
          </button>
        </div>
      )}

      {/* ── PLAYING ── */}
      {gamePhase === "playing" && (
        <div className="wordScrambleCard">
          <p className="wordScrambleRoundHeader">
            Player {currentPlayer} — Round {roundNumber} of 4
          </p>
          <p className="wordScramblePrompt">Unscramble this word:</p>
          <div className="wordScrambleScrambledWord">{scrambledWord}</div>
          <div
            className="wordScrambleTimer"
            style={{ color: timeLeft < 5 ? "#d4492b" : "#0085bd" }}
          >
            {timeLeft}s
          </div>
          <input
            ref={inputRef}
            className="wordScrambleInput"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your answer..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button className="wordScrambleButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* ── TURN RESULT ── */}
      {gamePhase === "turnResult" && lastResult && (
        <div className="wordScrambleCard">
          <div
            className="wordScrambleResultIcon"
            style={{ color: lastResult.correct ? "#0085bd" : "#d4492b" }}
          >
            {lastResult.correct ? "✓" : "✗"}
          </div>
          <h2 className="wordScrambleResultText">
            {lastResult.correct ? "Correct!" : "Not quite!"}
          </h2>
          {!lastResult.correct && (
            <p className="wordScrambleCorrectWord">
              The word was: <strong>{currentWord}</strong>
            </p>
          )}
          <p className="wordScramblePoints">+{lastResult.points} pts</p>
          <div className="wordScrambleScores">
            <span>Player 1: {scores[1]}</span>
            <span>Player 2: {scores[2]}</span>
          </div>
          <button className="wordScrambleButton" onClick={advanceTurn}>
            {currentPlayer === 2 && roundNumber >= 4
              ? "See Results"
              : `Pass to Player ${nextPlayer}`}
          </button>
        </div>
      )}

      {/* ── GAME OVER ── */}
      {gamePhase === "gameOver" && (
        <div className="wordScrambleCard">
          <h1 className="wordScrambleTitle">Game Over!</h1>
          <div className="wordScrambleFinalScores">
            <div className="wordScrambleFinalScore">
              <span className="wordScrambleFinalScoreLabel">Player 1</span>
              <span className="wordScrambleFinalScoreValue">{scores[1]}</span>
            </div>
            <div className="wordScrambleFinalScore">
              <span className="wordScrambleFinalScoreLabel">Player 2</span>
              <span className="wordScrambleFinalScoreValue">{scores[2]}</span>
            </div>
          </div>
          <h2 className="wordScrambleWinner">
            {scores[1] > scores[2]
              ? "🏆 Player 1 Wins!"
              : scores[2] > scores[1]
              ? "🏆 Player 2 Wins!"
              : "It's a Tie!"}
          </h2>
          <div className="wordScrambleGameOverButtons">
            <button className="wordScrambleButton" onClick={resetGame}>
              Play Again
            </button>
            <button
              className="wordScrambleButtonSecondary"
              onClick={() => navigate("/secretGames")}
            >
              Exit
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default WordScramble;
