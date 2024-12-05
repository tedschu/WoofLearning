// Nav screen to choose math or reading
// Default landing page for logged-in users

import React from "react";
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
      <Link to={"/game-math"} className="welcomePrivacyNotice">
        Math
      </Link>
      <br />
      <Link to={"/game-reading"} className="welcomePrivacyNotice">
        Reading
      </Link>
    </>
  );
}

export default AppSelector;
