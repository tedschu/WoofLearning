// Nav screen to choose math or reading
// Default landing page for logged-in users

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import woofMathLogo from "./../assets/woofmath_logo_1.png";

function AppSelector() {
  const navigate = useNavigate();

  // If a user is not signed in (no token) they are redirected to the login page.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/welcome");
    }
  }, []);

  const navMath = () => {
    navigate("/game-math");
  };

  const navReading = () => {
    navigate("/game-reading");
  };

  return (
    <>
      <div className="appSelector-Wrapper">
        <div className="appSelector-ContentContainer">
          <div className="appSelector-logoContainer">
            <img
              src={woofMathLogo}
              alt="WoofMath logo"
              className="woofMathLogo"
            />
            <h1>Which game do you want to play?</h1>
          </div>
          <div className="appSelector-flexRow">
            <div className="appSelector-contentBox">
              WOOF READING
              <button className="button gameSelect" onClick={navReading}>
                Go play!
              </button>
            </div>
            <div className="appSelector-contentBox">
              WOOF MATH
              <button className="button gameSelect" onClick={navMath}>
                Go play!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSelector;
