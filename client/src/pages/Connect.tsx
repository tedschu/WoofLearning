// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";

function Connect() {
  // Data / state:
  // "moves" array state value to track moves
  // player state value INT (1, 2) to populate moves array. Alternates between each move (between 1, 2)
  // gameInProgress state
  // hasWinner state when winning conditions are met

  // Gameplay logic:
  // Each time someone clicks on a square, their value (1 or 2) will be saved to "moves" state
  // Only squares that are (1) empty, and (2) have something below them can be clicked (e.g. if cell below is !null)
  // Will have to conditionally display different color circles (or "O") for each player
  // Each square click will call checkWinner():
  // Check moves[player] (or moves[1]) and see if any possible winning direction is met
  // Directions can be saved in an array relative to the square being checked
  // e.g. need to check 3 above, 3 left up diagonal, 3 left, 3 left down diagonal, 3 down, etc.
  // Can make this more efficient by breaking if the next value of any "arm" or line doesn't match (e.g. don't check all three if first doens't match)
  // IF a match is found, return hasWinner(true) and player(1 or 2)

  // Component structure:
  // reversed array(100) representing boxes
  // CSS grid structure 10x10

  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [moves, setMoves] = useState(
    [...Array(100).keys()].reverse().fill(null)
  );
  const [hasWinner, setHasWinner] = useState(false);
  const [playerWins, setPlayerWins] = useState({
    Player1: 0,
    Player2: 0,
  });
  const [winningPlayer, setWinningPlayer] = useState(null);
  const [winningLineArray, setWinningLineArray] = useState([]);

  const winningLines = [
    [10, 20, 30],
    [11, 22, 33],
    [1, 2, 3],
    [-9, -18, -27],
    [-10, -20, -30],
    [-11, -22, -33],
    [-1, -2, -3],
    [9, 18, 27],
  ];

  function handleClick(index) {
    // Save the value of the player (1 or 2) into moves array / state value
    // Set value in state, then call on checkWiner
    // Set playerTurn to alternatte playerTurn

    // Conditionals to not allow clicks on filled boxes and not allow clicks on boxes with no values below them (floating)
    if (moves[index]) return;
    if (index > 9 && moves[index - 10] === null) return;

    const newMoves = [...moves];
    newMoves[index] = playerTurn;

    setMoves(newMoves);

    checkWinner(newMoves, index);

    if (playerTurn === 1) {
      setPlayerTurn(2);
    } else setPlayerTurn(1);
  }

  function checkWinner(newMoves, index) {
    // Checking logic:
    // For loop on the index value of the most recent move (index):
    // IF the recent move matches any of the radial values (+3) in any direction, return hasWinner(true)

    for (let i = 0; i < winningLines.length; i++) {
      // For each winning line (+10, +20, +30 from index), see if the index values all matches
      const [a, b, c] = winningLines[i];

      if (
        newMoves[index] === newMoves[index + a] &&
        newMoves[index] === newMoves[index + b] &&
        newMoves[index] === newMoves[index + c]
      ) {
        setHasWinner(true);
        setWinningLineArray([index, index + a, index + b, index + c]);
        setGameInProgress(false);
        if (playerTurn === 1) {
          setWinningPlayer(1);
          setPlayerWins({
            ...playerWins,
            Player1: playerWins["Player1"] + 1,
          });
        } else {
          setWinningPlayer(2);
          setPlayerWins({
            ...playerWins,
            Player2: playerWins["Player2"] + 1,
          });
        }
      }
    }
  }

  console.log(winningLineArray);

  return (
    <>
      <Link to={"/me"} className="connectLinkBack">
        Back
      </Link>
      <div className="connectContainer">
        <div className="connectScoreboard">
          <div className="connectScore connectBlue">
            Blue: {playerWins.Player1}
          </div>

          <div className="connectScore connectRed">
            Red: {playerWins.Player2}
          </div>
        </div>

        <div className="connectGameBoard">
          {[...Array(100).keys()].reverse().map((index) => {
            return (
              <div
                key={index}
                className="connectSquare"
                onClick={() => handleClick(index)}
              >
                {moves[index] === 1 && (
                  <>
                    <div className="connectBlue">O</div>{" "}
                  </>
                )}
                {moves[index] === 2 && (
                  <>
                    <div className="connectRed">O</div>{" "}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {hasWinner && (
          <div
            className={`${
              playerTurn === 1 ? "connectAlertRed" : "connectAlertBlue"
            }`}
          >
            Player {winningPlayer} wins!
          </div>
        )}
        {!gameInProgress && (
          <button
            className="connectNewGameButton"
            onClick={() => {
              setGameInProgress(true);
              setHasWinner(false);
              setWinningPlayer(null);
              setPlayerTurn(1);
              setMoves([...Array(100).keys()].reverse().fill(null));
              setWinningLineArray([]);
            }}
          >
            Start new game
          </button>
        )}
      </div>
    </>
  );
}

export default Connect;
