import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../../components/reading/ScoreBar";
import GamePlay from "../../components/reading/GamePlay";
import Nav from "../../components/Nav";
import BadgeModal from "../../components/BadgeModal";
import Slider from "../../components/reading/Slider";
import StorySelector from "../../components/reading/StorySelector";
import { GameProps, StoryType, StorySelectorProps } from "../../types/types";

//TODO: CONVERT TO TS, ADD TYPE DECLARATIONS

function GameReading({
  isLoggedIn,
  userScore,
  setUserScore,
  userInfo,
  badgeLevel,
  userReadingBadges,
  setUserReadingBadges,
  badgeProgress,
  setBadgeProgress,
}: GameProps) {
  const [sliderValue, setSliderValue] = useState(1);
  const [storyType, setStoryType] = useState<StoryType>("story");
  const [storyLength, setStoryLength] = useState(250);
  const [gotRight, setGotRight] = useState(false);
  const [gotWrong, setGotWrong] = useState(false);

  // state for modal that opens when a new badge is won
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBadge, setModalBadge] = useState<string>("");
  const [storyPrompt, setStoryPrompt] = useState<string>("");
  const [pointsToWin, setPointsToWin] = useState(10);

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
      <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} />

      <div className="mainContainer">
        <ScoreBar
          userScore={userScore}
          userReadingBadges={userReadingBadges}
          userInfo={userInfo}
          badgeLevel={badgeLevel}
        />

        <StorySelector
          setGotRight={setGotRight}
          setGotWrong={setGotWrong}
          storyPrompt={storyPrompt}
          setStoryPrompt={setStoryPrompt}
          storyType={storyType}
          setStoryType={setStoryType}
        />

        <Slider
          setSliderValue={setSliderValue}
          sliderValue={sliderValue}
          setGotRight={setGotRight}
          setGotWrong={setGotWrong}
          setStoryLength={setStoryLength}
          setPointsToWin={setPointsToWin}
          pointsToWin={pointsToWin}
        />

        <GamePlay
          userScore={userScore}
          setUserScore={setUserScore}
          userInfo={userInfo}
          gotRight={gotRight}
          gotWrong={gotWrong}
          setGotRight={setGotRight}
          setGotWrong={setGotWrong}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalBadge={modalBadge}
          setModalBadge={setModalBadge}
          storyLength={storyLength}
          storyPrompt={storyPrompt}
          sliderValue={sliderValue}
          setStoryPrompt={setStoryPrompt}
          storyType={storyType}
          setStoryType={setStoryType}
          pointsToWin={pointsToWin}
          badgeProgress={badgeProgress}
          setBadgeProgress={setBadgeProgress}
          userReadingBadges={userReadingBadges}
          setUserReadingBadges={setUserReadingBadges}
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

export default GameReading;
