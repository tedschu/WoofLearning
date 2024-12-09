import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  UserScore,
  UserMathBadges,
  UserReadingBadges,
  UserInfo,
  BadgeLevel,
  BadgeProgress,
  CurrentApp,
} from "./types/types";
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
    addition_score: 0,
    subtraction_score: 0,
    multiplication_score: 0,
    division_score: 0,
    reading_score: 0,
    math_L1_points: 0,
    math_L2_points: 0,
    math_L3_points: 0,
    math_L4_points: 0,
    math_L5_points: 0,
    reading_L1_points: 0,
    reading_L2_points: 0,
    reading_L3_points: 0,
    reading_L4_points: 0,
    reading_L5_points: 0,
  });
  const [badgeLevel, setBadgeLevel] = useState<BadgeLevel>({
    math_level: 1,
    reading_level: 1,
  });
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress>({
    math_badges: 0,
    reading_badges: 0,
  });
  const [totalMathScore, setTotalMathScore] = useState(0);
  const [userMathBadges, setUserMathBadges] = useState<UserMathBadges>({
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
    badge_level: 1,
  });
  const [userReadingBadges, setUserReadingBadges] = useState<UserReadingBadges>(
    {
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
      badge_level: 1,
    }
  );
  const [currentApp, setCurrentApp] = useState<CurrentApp>("");
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
            setUserScore({
              addition_score: data.score_math.addition_score,
              subtraction_score: data.score_math.subtraction_score,
              multiplication_score: data.score_math.multiplication_score,
              division_score: data.score_math.division_score,
              reading_score: data.score_reading.reading_score,
              math_L1_points: data.score_math.math_L1_points,
              math_L2_points: data.score_math.math_L2_points,
              math_L3_points: data.score_math.math_L3_points,
              math_L4_points: data.score_math.math_L4_points,
              math_L5_points: data.score_math.math_L5_points,
              reading_L1_points: data.score_reading.reading_L1_points,
              reading_L2_points: data.score_reading.reading_L2_points,
              reading_L3_points: data.score_reading.reading_L3_points,
              reading_L4_points: data.score_reading.reading_L4_points,
              reading_L5_points: data.score_reading.reading_L5_points,
            });
            setUserMathBadges(data.badge_math);
            setUserReadingBadges(data.badge_reading);
            setTotalMathScore(
              parseInt(data.score_math.addition_score) +
                parseInt(data.score_math.subtraction_score) +
                parseInt(data.score_math.multiplication_score) +
                parseInt(data.score_math.division_score)
            );
            setBadgeLevel({
              math_level: data.badge_math.badge_level,
              reading_level: data.badge_reading.badge_level,
            });
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
        <Route
          index
          element={
            <AppSelector
              currentApp={currentApp}
              setCurrentApp={setCurrentApp}
            />
          }
        />

        <Route
          path="/game-math"
          element={
            <GameMath
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              setUserScore={setUserScore}
              userMathBadges={userMathBadges}
              setUserMathBadges={setUserMathBadges}
              totalScore={totalMathScore}
              setTotalScore={setTotalMathScore}
              badgeLevel={badgeLevel}
              setBadgeLevel={setBadgeLevel}
              userReadingBadges={userReadingBadges}
              setUserReadingBadges={setUserReadingBadges}
              badgeProgress={badgeProgress}
              setBadgeProgress={setBadgeProgress}
              currentApp={currentApp}
              setCurrentApp={setCurrentApp}
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
              userReadingBadges={userReadingBadges}
              setUserReadingBadges={setUserReadingBadges}
              userMathBadges={userMathBadges}
              setUserMathBadges={setUserMathBadges}
              totalScore={totalMathScore}
              setTotalScore={setTotalMathScore}
              badgeLevel={badgeLevel}
              badgeProgress={badgeProgress}
              setBadgeProgress={setBadgeProgress}
              currentApp={currentApp}
              setCurrentApp={setCurrentApp}
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
              userMathBadges={userMathBadges}
              userReadingBadges={userReadingBadges}
              setIsLoggedIn={setIsLoggedIn}
              currentApp={currentApp}
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
