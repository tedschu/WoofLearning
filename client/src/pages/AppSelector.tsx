// Nav screen to choose math or reading
// Default landing page for logged-in users

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function AppSelector() {
  const navigate = useNavigate();

  // If a user is not signed in (no token) they are redirected to the login page.
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/welcome");
    }
  }, []);

  return (
    <>
      <div className="appSelector-Wrapper">
        <div className="appSelector-ContentContainer">
          <div className="appSelector-contentBox">
            <Link to={"/game-reading"} className="testFont">
              READING
            </Link>
          </div>
          <div className="appSelector-contentBox">
            <Link to={"/game-math"} className="testFont">
              MATH
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSelector;
