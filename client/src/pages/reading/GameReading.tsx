import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../../components/reading/ScoreBar";
import GamePlay from "../../components/reading/GamePlay";
import Nav from "../../components/Nav";
import BadgeModal from "../../components/reading/BadgeModal";
import Slider from "../../components/reading/Slider";
import StorySelector from "../../components/reading/StorySelector";

function GameReading({
  isLoggedIn,
  loginForm,
  userScore,
  setUserScore,
  userBadges,
  setUserBadges,
  userInfo,
  totalScore,
  setTotalScore,
}) {
  const [sliderValue, setSliderValue] = useState(1);
  const [storyType, setStoryType] = useState("story");
  const [storyLength, setStoryLength] = useState(250);
  const [gotRight, setGotRight] = useState(false);
  const [gotWrong, setGotWrong] = useState(false);

  // state for modal that opens when a new badge is won
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBadge, setModalBadge] = useState("");
  const [storyPrompt, setStoryPrompt] = useState("");
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
          isLoggedIn={isLoggedIn}
          loginForm={loginForm}
          userScore={userScore}
          setUserScore={setUserScore}
          userBadges={userBadges}
          setUserBadges={setUserBadges}
          userInfo={userInfo}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          setPointsToWin={setPointsToWin}
          pointsToWin={pointsToWin}
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
          userBadges={userBadges}
          setUserBadges={setUserBadges}
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

export default Game;
