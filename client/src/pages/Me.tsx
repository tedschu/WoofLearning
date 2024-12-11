import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import ScoreBar from "../components/";
import Nav from "../components/Nav";
import badge_1_1_bernese from "../assets/badges/badge_1_1_bernese.png";
import badge_1_2_chihuahua from "../assets/badges/badge_1_2_chihuahua.png";
import badge_1_3_waterdog from "../assets/badges/badge_1_3_waterdog.png";
import badge_1_4_boxer from "../assets/badges/badge_1_4_boxer.png";
import badge_1_5_husky from "../assets/badges/badge_1_5_husky.png";
import badge_1_6_golden from "../assets/badges/badge_1_6_golden.png";
import badge_1_7_cat from "../assets/badges/badge_1_7_cat.png";
import badge_1_8_goldendoodle from "../assets/badges/badge_1_8_goldendoodle.png";
import badge_2_1_borderCollie from "../assets/badges/badge_2_1_borderCollie.png";
import badge_2_2_terrier from "../assets/badges/badge_2_2_terrier.png";
import badge_2_3_australianShepherd from "../assets/badges/badge_2_3_australianShepherd.png";
import badge_2_4_shibaInu from "../assets/badges/badge_2_4_shibaInu.png";
import badge_2_5_cat from "../assets/badges/badge_2_5_cat.png";
import badge_2_6_bernese from "../assets/badges/badge_2_6_bernese.png";
import badge_2_7_poodle from "../assets/badges/badge_2_7_poodle.png";
import badge_2_8_golden from "../assets/badges/badge_2_8_golden.png";
import {
  UserInfo,
  UserReadingBadges,
  UserMathBadges,
  UserScore,
  CurrentApp,
} from "../types/types";

type MeProps = {
  userInfo: UserInfo;
  userScore: UserScore;
  totalScore: number;
  userReadingBadges: UserReadingBadges;
  userMathBadges: UserMathBadges;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentApp: CurrentApp;
};

const badgeImages = {
  badge_1_1_bernese: badge_1_1_bernese,
  badge_1_2_chihuahua: badge_1_2_chihuahua,
  badge_1_3_waterdog: badge_1_3_waterdog,
  badge_1_4_boxer: badge_1_4_boxer,
  badge_1_5_husky: badge_1_5_husky,
  badge_1_6_golden: badge_1_6_golden,
  badge_1_7_cat: badge_1_7_cat,
  badge_1_8_goldendoodle: badge_1_8_goldendoodle,
  badge_2_1_borderCollie: badge_2_1_borderCollie,
  badge_2_2_terrier: badge_2_2_terrier,
  badge_2_3_australianShepherd: badge_2_3_australianShepherd,
  badge_2_4_shibaInu: badge_2_4_shibaInu,
  badge_2_5_cat: badge_2_5_cat,
  badge_2_6_bernese: badge_2_6_bernese,
  badge_2_7_poodle: badge_2_7_poodle,
  badge_2_8_golden: badge_2_8_golden,
} as const;

type BadgeName = keyof typeof badgeImages;

function Me({
  userInfo,
  userScore,
  totalScore,
  userReadingBadges,
  userMathBadges,
  isLoggedIn,
  setIsLoggedIn,
  currentApp,
}: MeProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // window.location.reload();
    setIsLoggedIn(false);
    navigate("/welcome");
  };

  const navHome = () => {
    if (currentApp === "Woof Reading") {
      navigate("/game-reading");
    } else if (currentApp === "Woof Math") {
      navigate("/game-math");
    } else navigate("/");
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

  const readingList = Object.entries(userReadingBadges)
    .filter(([key, value]) => value === true)
    .map(([badgeName, value]) => (
      <img
        key={badgeName}
        src={badgeImages[badgeName as BadgeName]}
        alt=""
        className="badgeEnabled-me"
      />
      // <h1>{badgeName}</h1>
    ));

  const mathList = Object.entries(userMathBadges)
    .filter(([key, value]) => value === true)
    .map(([badgeName, value]) => (
      <img
        key={badgeName}
        src={badgeImages[badgeName as BadgeName]}
        alt=""
        className="badgeEnabled-me"
      />
      // <h1>{badgeName}</h1>
    ));

  return (
    <>
      <Nav
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        currentApp={currentApp}
      />

      <div className="mainContainer">
        {/* <ScoreBar
          userScore={userScore}
          totalScore={totalScore}
          userBadges={userBadges}
        /> */}
        <h2>Welcome, {userInfo.username}!</h2>

        <div className="accountPageContainer">
          {/* CONTAINER FOR USER PLAY DATA */}
          <div className="accountContentContainer">
            <h2>Here's your progress on Woof Learning games:</h2>
            <h3>Badges you've earned:</h3>
            <div className="accountRowContainer">
              <div className="accountBadges">
                <h3 className="reading-font">Woof Reading:</h3>
                {readingList.length === 0 ? (
                  <span className="accountAlert">None yet!</span>
                ) : (
                  readingList
                )}
              </div>

              <div className="accountBadges">
                <h3 className="math-font">Woof Math:</h3>
                {mathList.length === 0 ? (
                  <span className="accountAlert">None yet!</span>
                ) : (
                  mathList
                )}
              </div>
            </div>
            <h3>Points you've earned by difficulty level:</h3>
            <div className="accountRowContainer">
              <div className="accountBadges">Reading</div>
              <div className="accountBadges">Math</div>
            </div>
          </div>

          {/* CONTAINER FOR USER PERSONAL DATA AND USER FUNCTIONS (DELETE, CONTACT) */}
          <div className="accountContentContainer">
            {/* <li>
              Name: <span className="accountFont">{userInfo.name}</span>
            </li> */}
            <li>
              Email: <span className="accountFont">{userInfo.email}</span>
            </li>
            <li>
              Username: <span className="accountFont">{userInfo.username}</span>
            </li>
            <li>
              Security question #1:{" "}
              <span className="accountFont">
                {userInfo.security_question_1}
              </span>
            </li>
            <li>
              Security answer #1:{" "}
              <span className="accountFont">{userInfo.security_answer_1}</span>
            </li>
            <li>
              Security question #2:{" "}
              <span className="accountFont">
                {userInfo.security_question_2}
              </span>
            </li>
            <li>
              Security answer #2:{" "}
              <span className="accountFont">{userInfo.security_answer_2}</span>
            </li>

            <button className="button getBack" onClick={navHome}>
              Get back to playing!
            </button>

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
        </div>
      </div>
    </>
  );
}

export default Me;
