import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import ScoreBar from "../components/";
import Nav from "../components/Nav";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import {
  UserInfo,
  UserReadingBadges,
  UserMathBadges,
  UserScore,
  CurrentApp,
} from "../types/types";
import AvatarModal from "../components/AvatarModal";

type MeProps = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userScore: UserScore;
  totalScore: number;
  userReadingBadges: UserReadingBadges;
  userMathBadges: UserMathBadges;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentApp: CurrentApp;
};

function Me({
  userInfo,
  setUserInfo,
  isLoggedIn,
  setIsLoggedIn,
  currentApp,
}: MeProps) {
  const navigate = useNavigate();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // window.location.reload();
    setIsLoggedIn(false);
    navigate("/welcome");
  };

  function handleDelete() {
    const confirmation = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (confirmation) {
      deleteUserAccount();
    }
  }

  const deleteUserAccount = async () => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        handleLogout();
      }
    } catch (error) {
      console.error("Error removing this user:", error);
    }
  };

  return (
    <>
      <Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userInfo={userInfo}
        currentApp={currentApp}
      />

      <div className="mainContainer">
        {/* <ScoreBar
          userScore={userScore}
          totalScore={totalScore}
          userBadges={userBadges}
        /> */}

        <div className="accountPageContainer">
          {/* CONTAINER FOR USER PERSONAL DATA AND USER FUNCTIONS (DELETE, CONTACT) */}
          <div className="accountContentContainer">
            <h2>Hey, {userInfo.username}!</h2>

            <img
              src={`../../avatars/${userInfo.avatar_name}.png`}
              className="accountUserAvatar"
              alt=""
            />
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="avatarButton"
            >
              Change avatar
            </button>

            {isAvatarModalOpen && (
              <AvatarModal
                isAvatarModalOpen={isAvatarModalOpen}
                setIsAvatarModalOpen={setIsAvatarModalOpen}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            )}

            <div className="accountList">
              <li>
                Email: <span className="accountFont">{userInfo.email}</span>
              </li>
              <li>
                Username:{" "}
                <span className="accountFont">{userInfo.username}</span>
              </li>
              <li>
                Security question #1:{" "}
                <span className="accountFont">
                  {userInfo.security_question_1}
                </span>
              </li>
              <li>
                Security answer #1:{" "}
                <span className="accountFont">
                  {userInfo.security_answer_1}
                </span>
              </li>
              <li>
                Security question #2:{" "}
                <span className="accountFont">
                  {userInfo.security_question_2}
                </span>
              </li>
              <li>
                Security answer #2:{" "}
                <span className="accountFont">
                  {userInfo.security_answer_2}
                </span>
              </li>
            </div>

            <Link to={"mailto:wooflearning@gmail.com"}>
              <button className="button accountGray">
                Contact us / share feedback
              </button>
            </Link>

            {isLoggedIn && (
              <>
                <button className="button accountGray" onClick={handleLogout}>
                  Log out
                </button>
                <button className="buttonGrayText" onClick={handleDelete}>
                  Delete my account
                </button>
              </>
            )}
          </div>
          <Link to={"/about"}>
            <div className="accountFooter">About us / privacy policy</div>
          </Link>

          <p className="ai-disclaimer me">
            {" "}
            <AutoAwesomeIcon
              style={{ fontSize: "16px", color: "#d4492b" }}
            />{" "}
            Woof Learning uses AI to help provide feedback on your progress.
            Learn more{" "}
            <Link to={"/About"} className="ai-link">
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Me;
