import { useState } from "react";
import clock_white from "../../assets/clock_white.png";
import Slider from "../../components/math/Slider";
import GameSelector from "../../components/math/GameSelector";
import GamePlayTimedChallenge from "../../components/math/GamePlayTimedChallenge";
import { GameTimedChallengeProps } from "../../types/types";
import LevelHelpModal from "../../components/LevelHelpModal";

function GameMathTimedChallenge({
  isTimedChallegeModalOpen,
  setIsTimedChallengeModalOpen,
  setGameSelector,
  setGotRight,
  setGotWrong,
  setSliderValue,
  sliderValue,
  userScore,
  setUserScore,
  userInfo,
  totalScore,
  setTotalScore,
  gotRight,
  gotWrong,
  userMathBadges,
  setUserMathBadges,
  isModalOpen,
  setIsModalOpen,
  modalBadge,
  setModalBadge,
  badgeLevel,
  setBadgeLevel,
  badgeProgress,
  setBadgeProgress,
  gameSelector,
  isLevelHelpModalOpen,
  setIsLevelHelpModalOpen,
  closeLevelHelpModal,
  challengeTopScores,
  setChallengeTopScores,
}: GameTimedChallengeProps) {
  if (!isTimedChallegeModalOpen) return null;

  const [isTimedChallengeRunning, setIsTimedChallengeRunning] =
    useState<boolean>(false); // manages state for the 60 second timed challenge

  const closeTimedChallengeModal = () => setIsTimedChallengeModalOpen(false);

  return (
    <>
      <div className="modalOverlay-challenge">
        <div className="modalOverlay-challengeContentContainer">
          <div className="modalOverlay-challengeTopBar">
            <div onClick={closeTimedChallengeModal}>X</div>
            <div className="modalOverlay-challengeTitle">Woof Math</div>
            <div className="modalOverlay-challengeImgContainer">
              <img src={clock_white} alt="" />
            </div>
          </div>
          <div className="modalOverlay-challengeGameplayContainer">
            {/* <img src={clock} alt="" className="modalClock" /> */}

            {/* {!isTimedChallengeRunning && (
              <> */}
            <GameSelector
              setGameSelector={setGameSelector}
              setGotRight={setGotRight}
              setGotWrong={setGotWrong}
              gameSelector={gameSelector}
              isTimedChallengeRunning={isTimedChallengeRunning}
            />
            <Slider
              setSliderValue={setSliderValue}
              sliderValue={sliderValue}
              setGotRight={setGotRight}
              setGotWrong={setGotWrong}
              isTimedChallengeRunning={isTimedChallengeRunning}
              isLevelHelpModalOpen={isLevelHelpModalOpen}
              setIsLevelHelpModalOpen={setIsLevelHelpModalOpen}
            />
            {/* </>
            )} */}
            <GamePlayTimedChallenge
              sliderValue={sliderValue}
              gameSelector={gameSelector}
              userScore={userScore}
              setUserScore={setUserScore}
              userInfo={userInfo}
              setTotalScore={setTotalScore}
              totalScore={totalScore}
              gotRight={gotRight}
              gotWrong={gotWrong}
              setGotRight={setGotRight}
              setGotWrong={setGotWrong}
              userMathBadges={userMathBadges}
              setUserMathBadges={setUserMathBadges}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              modalBadge={modalBadge}
              setModalBadge={setModalBadge}
              badgeLevel={badgeLevel}
              setBadgeLevel={setBadgeLevel}
              badgeProgress={badgeProgress}
              setBadgeProgress={setBadgeProgress}
              setIsTimedChallengeModalOpen={setIsTimedChallengeModalOpen}
              isTimedChallengeRunning={isTimedChallengeRunning}
              setIsTimedChallengeRunning={setIsTimedChallengeRunning}
              challengeTopScores={challengeTopScores}
              setChallengeTopScores={setChallengeTopScores}
            />

            <LevelHelpModal
              isLevelHelpModalOpen={isLevelHelpModalOpen}
              closeLevelHelpModal={closeLevelHelpModal}
            />

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
