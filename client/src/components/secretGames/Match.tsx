// @ts-nocheck

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Match() {
  // 4x4 grid of cards, each card with a number 1-8 (repeated, so 1, 1, 2, 2, etc.)
  // Player turn = flip two cards, find a match. If a match, keep cards turned.

  // State values
  // gameCards: array with 4
  // turns: num of turns taken
  // results: array structured same as gameCards, but null initial values. Populates
  // optional: totalTurns: lowest number of turns from all games played in session (beat your best score)

  // Game logic
  // Click on a card, it will show its number
  // Click on a second card, it will also show its number

  // Component structure / layout
  // array of 16, map and add onClick events to flip cards and trigger any functions (checkMatch)
  // grid CSS layout with 4 columns
  const [randomArray, setRandomArray] = useState([]);
  const [hasClickedArray, setHasClickedArray] = useState(Array(16).fill(false));
  const [gameInProgress, setGameInProgress] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickedIndex, setClickedIndex] = useState([]);
  const [matches, setMatches] = useState(0); // IF matches === 8, the user wins
  const [hasWinner, setHasWinner] = useState(false);
  const [guesses, setGuesses] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const gameArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  // When user hits "Start new game," this takes gameArray and randomizes the numbers for the game board
  function randomizeArray(gameArray) {
    const tempArray = [...gameArray];
    const tempNewArray = [];

    // While tempArray > 0, find randomNum for index, take that index value from tempArray and push to randomArray
    while (tempArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      const arrayVal = tempArray.splice(randomIndex, 1)[0];
      tempNewArray.push(arrayVal);
    }
    setRandomArray(tempNewArray);
  }

  // Update gameBoardArray with the value / index from randomArray when a user clicks
  // Check for a match. IF a match, increment state value
  const handleCardClick = (cardNumber, index) => {
    if (isProcessing || hasClickedArray[index]) return;

    setClickCount((prevCount) => prevCount + 1);
    // Updates the index values of the cards that have been clicked (used in checkMatch function)
    const tempIndexArray = [...clickedIndex];
    tempIndexArray.push(index);
    setClickedIndex(tempIndexArray);

    // Sets true for cards that have been clicked
    const tempArray = [...hasClickedArray];
    tempArray[index] = true;
    setHasClickedArray(tempArray);

    // when clickCount === 1 (second click), we want to: run checkMatch function, IF a match keep cards "true", if not set to "false" after 1 second
    if (clickCount === 1) {
      setIsProcessing(true);
      checkMatch(tempIndexArray);

      setClickCount(0);
      setClickedIndex([]);
    }
  };

  // Determines if two picked cards remain "true" in hasClickedArray AND to iterate on matches state
  function checkMatch(clickedIndexes) {
    setGuesses((prev) => prev + 1);

    if (randomArray[clickedIndexes[0]] === randomArray[clickedIndexes[1]]) {
      setMatches((prev) => prev + 1);
      setIsProcessing(false);
    } else {
      // IF not a match, make sure that setHasClickedArray sets both indexes back to "false" so that they aren't visible anymore

      setTimeout(() => {
        const tempArray = [...hasClickedArray];
        tempArray[clickedIndexes[0]] = false;
        tempArray[clickedIndexes[1]] = false;
        setHasClickedArray(tempArray);
        setIsProcessing(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (matches === 8) {
      setHasWinner(true);
      setGameInProgress(false);
      setMatches(0);
    }
  }, [matches]);

  const handleGameClick = () => {
    setGameInProgress(true);
    setClickCount(0);
    setClickedIndex([]);
    setHasClickedArray(Array(16).fill(false));
    randomizeArray(gameArray); // This should instead run on page load AND when user hits "start new game"
    setHasWinner(false);
    setGuesses(0);
  };

  // Start new game button creates randomArray
  // When a user clicks on a card, update gameBoardArray with the value from randomArray

  return (
    <>
      <div className="matchContainer">
        <Link to={"/secretGames"} className="connectLinkBack">
          Back
        </Link>
        {gameInProgress && (
          <div className="matchGameBoard">
            {randomArray.map((number, index) => {
              return (
                <div
                  className={
                    hasClickedArray[index]
                      ? "matchCard matchPickedCard"
                      : "matchCard"
                  }
                  key={index}
                  onClick={() => handleCardClick(number, index)}
                >
                  {hasClickedArray[index] && number}
                </div>
              );
            })}
          </div>
        )}
        {!gameInProgress && (
          <>
            <h2 className="matchHeader">Find all the matching pairs to win!</h2>
            <div className="matchStartGameButtonContainer">
              <button
                className="matchStartGameButton"
                onClick={() => handleGameClick()}
              >
                Start new game
              </button>
            </div>
          </>
        )}
        {hasWinner && (
          <div className="matchWinner">You won in {guesses} guesses!</div>
        )}
      </div>
    </>
  );
}

export default Match;
