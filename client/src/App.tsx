import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserScore, UserBadges, UserInfo, BadgeLevel } from "./types/types";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import AppSelector from "./pages/AppSelector";
import GameMath from "./pages/math/GameMath";
import GameReading from "./pages/reading/GameReading";

function App() {
  const storedToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    email: "",
    username: "",
    password: "",
    security_question_1: "",
    security_answer_1: "",
    security_question_2: "",
    security_answer_2: "",
  });
  const [userScore, setUserScore] = useState<UserScore>({
    math_addition_score: 0,
    math_subtraction_score: 0,
    math_multiplication_score: 0,
    math_division_score: 0,
    reading_score: 0,
  });
  const [badgeLevel, setBadgeLevel] = useState<BadgeLevel>({
    math_level: 1,
    reading_level: 1,
  });
  const [totalMathScore, setTotalMathScore] = useState(0);
  const [userBadges, setUserBadges] = useState<UserBadges>({
    badge_1_1_bernese: false,
    badge_1_2_chihuahua: false,
    badge_1_3_waterdog: false,
    badge_1_4_boxer: false,
    badge_1_5_husky: false,
    badge_1_6_golden: false,
    badge_1_7_cat: false,
    badge_1_8_goldendoodle: false,
    badge_2_1_borderCollie: false,
    badge_2_2_terrier: false,
    badge_2_3_australianShepherd: false,
    badge_2_4_shibaInu: false,
    badge_2_5_cat: false,
    badge_2_6_bernese: false,
    badge_2_7_poodle: false,
    badge_2_8_golden: false,
  });
  const [token, setToken] = useState(storedToken || "");

  const navigate = useNavigate();

  // Runs on page load to check for an expired token. If token is expired, clears out localstorage and redirects to login screen.
  useEffect(() => {
    if (storedToken) {
      isTokenExpired(storedToken);
    }
  }, []);

  function isTokenExpired(token: string) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedJson = atob(payloadBase64);
      const decoded = JSON.parse(decodedJson);
      const exp = decoded.exp;

      // Check if the expiration time is past
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Error checking token expiration:", error);
    }
  }

  // Verifies that a user is loggedIn (checks for token)
  // IF token exists: update setters (isLoggedIn, badges, userscore, userId)
  // IF token doesn't exist, navigate to /login

  // TODO: UPDATE FUNCTION TO LOAD STATE VALUES FOR MATH AND READING SCORES / BADGES / LEVELS (FOR EACH)

  useEffect(() => {
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      //setUserId(localStorage.getItem("userId"));

      // Gets all relevant user data (user info, scores, badges) and stores in state for usage throughout the app
      const getUserData = async () => {
        try {
          const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          });

          const data = await response.json();

          // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
          if (response.ok) {
            setUserInfo({
              id: data.id,
              username: data.username,
              email: data.email,
              security_question_1: data.security_question_1,
              security_answer_1: data.security_answer_1,
              security_question_2: data.security_question_2,
              security_answer_2: data.security_answer_2,
            });
            setUserScore(data.score);
            setUserBadges(data.badge);
            setTotalMathScore(
              parseInt(data.score.math_addition_score) +
                parseInt(data.score.math_subtraction_score) +
                parseInt(data.score.math_multiplication_score) +
                parseInt(data.score.math_division_score)
            );
          }
          // ADDED TO HANDLE CASE WHERE API CALL IS BAD OR HASN'T COME BACK
          else if (!response.ok) {
            navigate("/welcome");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, [isLoggedIn, token]); // SET TO ISLOGGEDIN TO ENSURE RELOAD POST LOGIN AND REGISTRATION

  return (
    <>
      {/* <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} /> */}

      <Routes>
        <Route index element={<AppSelector />} />

        <Route
          path="/game-math"
          element={
            <GameMath
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              setUserScore={setUserScore}
              userBadges={userBadges}
              setUserBadges={setUserBadges}
              totalScore={totalMathScore}
              setTotalScore={setTotalMathScore}
            />
          }
        />

        <Route
          path="/game-reading"
          element={
            <GameReading
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              setUserScore={setUserScore}
              userBadges={userBadges}
              setUserBadges={setUserBadges}
              totalScore={totalMathScore}
              setTotalScore={setTotalMathScore}
            />
          }
        />

        <Route
          path="/me"
          element={
            <Me
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              totalScore={totalMathScore}
              userBadges={userBadges}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setToken={setToken}
            />
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
