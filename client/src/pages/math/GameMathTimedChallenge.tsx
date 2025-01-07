import { useState, useEffect } from "react";
import { GameTimedChallengeProps } from "../../types/types";
import clock from "../../assets/clock.png";
import Slider from "../../components/math/Slider";
import GameSelector from "../../components/math/GameSelector";
import { Link } from "react-router-dom";
import woofMathLogo from "../../assets/woofmath_logo_1.png";

function GameMathTimedChallenge({
  isTimedChallegeModalOpen,
  setIsTimedChallengeModalOpen,
}: GameTimedChallengeProps) {
  if (!isTimedChallegeModalOpen) return null;

  const closeTimedChallengeModal = () => setIsTimedChallengeModalOpen(false);

  return (
    <>
      <div className="modalOverlay-challenge">
        <div className="modalOverlay-challengeContentContainer">
          <div className="modalOverlay-challengeTopBar">
            <div onClick={closeTimedChallengeModal}>X</div>
            <div className="modalOverlay-challengeTitle">Woof Math</div>
            <div className="modalOverlay-challengeImgContainer">
              <img src={clock} alt="" />
            </div>
          </div>
          <div className="modalOverlay-challengeGameplayContainer">
            {/* <img src={clock} alt="" className="modalClock" /> */}

            <GameSelector />
            <Slider />
            <div className="buttonTopSpace">
              <button className="modalClose" onClick={closeTimedChallengeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameMathTimedChallenge;
