import { useState, useEffect } from "react";
import { GameProps, GameSelectorType, ModalBadgeType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../../components/math/ScoreBar";
import Slider from "../../components/math/Slider";
import GamePlay from "../../components/math/GamePlay";
import GameSelector from "../../components/math/GameSelector";
import Nav from "../../components/Nav";
import BadgeModal from "../../components/BadgeModal";

function GameMath({
  isLoggedIn,
  userScore,
  setUserScore,
  userMathBadges,
  setUserMathBadges,
  userInfo,
  totalScore,
  setTotalScore,
  badgeLevel,
  setBadgeLevel,
  badgeProgress,
  setBadgeProgress,
  currentApp,
  setCurrentApp,
}: GameProps) {
  // Establishing state values for gameplay functionality that will be passed to multiple child components
  const [sliderValue, setSliderValue] = useState(1);
  const [gameSelector, setGameSelector] =
    useState<GameSelectorType>("addition");
  //State values for conditional user alerts AND to pass points to DB (if gotRight )
  const [gotRight, setGotRight] = useState(false);
  const [gotWrong, setGotWrong] = useState(false);

  // state for modal that opens when a new badge is won
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBadge, setModalBadge] = useState<ModalBadgeType>("");

  const navigate = useNavigate();

  // If a user is not signed in (no token) they are redirected to the login page.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/welcome");
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Nav
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        currentApp={currentApp}
      />

      <div className="mainContainer">
        <ScoreBar
          userScore={userScore}
          userMathBadges={userMathBadges}
          totalScore={totalScore}
          badgeLevel={badgeLevel}
        />

        <GameSelector
          setGameSelector={setGameSelector}
          setGotRight={setGotRight}
          setGotWrong={setGotWrong}
        />

        <Slider
          setSliderValue={setSliderValue}
          sliderValue={sliderValue}
          setGotRight={setGotRight}
          setGotWrong={setGotWrong}
        />

        <GamePlay
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
        />

        <BadgeModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalBadge={modalBadge}
        />
      </div>
    </>
  );
}

export default GameMath;
