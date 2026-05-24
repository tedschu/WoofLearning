// Nav screen to choose math or reading
// Default landing page for logged-in users

import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { CurrentApp, UserInfo } from "../types/types";
import catsinoImg from "../assets/catsino.png";
import { Link } from "react-router-dom";

type AppSelectorProps = {
  currentApp: CurrentApp;
  setCurrentApp: React.Dispatch<React.SetStateAction<CurrentApp>>;
  userInfo: UserInfo;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function AppSelector({ setCurrentApp, userInfo }: AppSelectorProps) {
  const navigate = useNavigate();

  // If a user is not signed in (no token) they are redirected to the login page.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/welcome");
    }
  }, []);

  const navMath = () => {
    setCurrentApp("Woof Math");
    navigate("/math");
  };

  const navReading = () => {
    setCurrentApp("Woof Reading");
    navigate("/reading");
  };

  return (
    <>
      <div className="appSelector-Wrapper">
        <div className="appSelector-ContentContainer">
          <div className="appSelector-logoContainer">
            <img
              src={`../../avatars/${userInfo.avatar_name}.png`}
              alt="WoofMath logo"
              className="appSelector-logo"
            />
            <h1>Hey, {userInfo.username}!</h1>
            <h1>Which game do you want to play?</h1>
          </div>
          <div className="appSelector-flexRow">
            <button
              className="button gameSelect-base button gameSelect-reading"
              onClick={navReading}
            >
              Woof Reading
            </button>
            <button
              className="button gameSelect-base button gameSelect-math"
              onClick={navMath}
            >
              Woof Math
            </button>
          </div>
          <div className="appSelector-catsino-row">
            <Link to="/secretGames" className="button gameSelect-base gameSelect-catsino">
              <span className="gameSelect-new-badge">NEW</span>
              Catsino Royale
              <img src={catsinoImg} alt="" className="gameSelect-cat-img" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSelector;
