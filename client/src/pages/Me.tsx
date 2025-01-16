import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import ScoreBar from "../components/";
import Nav from "../components/Nav";
import ChartModal from "../components/ChartModal";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
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
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

type ChallengeSummaryData = {
  totalChallenges: number;
  mostFrequentChallenge: string | null;
  percentScore: number;
  totalPoints: number;
  percentScoreLastTen: number;
};

type incorrectEquationsData = {
  incorrectEquationsLastTen: [];
  percentScoreLastTen: string;
};

type equationFeedback = {
  feedback: string;
};

type Last20ChallengeScores = {
  dateTime: string;
  points_added: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Patrick Hand";
ChartJS.defaults.font.size = 15;

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
  // State for help popup to explain bar charts with points by level
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [challengeSummaryData, setChallengeSummaryData] =
    useState<ChallengeSummaryData>({
      totalChallenges: 0,
      mostFrequentChallenge: "",
      percentScore: 0,
      totalPoints: 0,
      percentScoreLastTen: 0,
    });

  const [incorrectEquationsData, setIncorrectEquationsData] =
    useState<incorrectEquationsData>({
      incorrectEquationsLastTen: [],
      percentScoreLastTen: "",
    });
  const [equationFeedback, setEquationFeedback] = useState<equationFeedback>({
    feedback: "",
  });

  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [isAPICallInProgress, setIsAPICallInProgress] =
    useState<boolean>(false);

  // State for MUI selectors (trend chart)
  const [mathTypeSelector, setMathTypeSelector] = useState<string>("addition");
  const [levelSelector, setLevelSelector] = useState<string>("1");

  // state for last 20 challenge scores for trending charts
  const [last20ChallengeScores, setLast20ChallengeScores] = useState<
    Last20ChallengeScores[]
  >([]);

  const storedToken = localStorage.getItem("token");

  const openChartModal = () => setIsChartModalOpen(true);

  // RUNS ON PAGE LOAD TO GET CHALLENGE SUMMARY AND ANTHROPIC DATA
  useEffect(() => {
    getChallengeSummaryData();
    getLastTenChallengeIncorrectResponses();
    setIsAPICallInProgress(true);
    getLast20Challenges();
  }, []);

  // RUNS AFTER getLastTenChallengeIncorrectResposes RETURNS (hits Anthropic API)
  useEffect(() => {
    if (
      incorrectEquationsData?.incorrectEquationsLastTen?.length > 0 &&
      !hasEvaluated
    ) {
      evaluateEquations();
      setHasEvaluated(true);
    }
  }, [incorrectEquationsData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // window.location.reload();
    setIsLoggedIn(false);
    navigate("/welcome");
  };

  const navHome = () => {
    if (currentApp === "Woof Reading") {
      navigate("/reading");
    } else if (currentApp === "Woof Math") {
      navigate("/math");
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
    .filter(([_key, value]) => value === true)
    .map(([badgeName, _value]) => (
      <img
        key={badgeName}
        src={badgeImages[badgeName as BadgeName]}
        alt=""
        className="badgeEnabled-me"
      />
      // <h1>{badgeName}</h1>
    ));

  const mathList = Object.entries(userMathBadges)
    .filter(([_key, value]) => value === true)
    .map(([badgeName, _value]) => (
      <img
        key={badgeName}
        src={badgeImages[badgeName as BadgeName]}
        alt=""
        className="badgeEnabled-me"
      />
      // <h1>{badgeName}</h1>
    ));

  const chartDataMath = {
    labels: ["1 (easier)", "2", "3", "4", "5 (harder)"],
    datasets: [
      {
        label: "Points by level",
        data: [
          userScore.math_L1_points,
          userScore.math_L2_points,
          userScore.math_L3_points,
          userScore.math_L4_points,
          userScore.math_L5_points,
        ],
        backgroundColor: "#dd6e55",
      },
    ],
  };

  const chartDataReading = {
    labels: ["K - 1st", "2nd", "3rd", "4th", "5th+"],
    datasets: [
      {
        label: "Points by level",
        data: [
          userScore.reading_L1_points,
          userScore.reading_L2_points,
          userScore.reading_L3_points,
          userScore.reading_L4_points,
          userScore.reading_L5_points,
        ],
        backgroundColor: "#a6d5ea",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Points by level",
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            return `Score: ${context.parsed.y}`; // Customize the tooltip text
          },
          title: function (context: TooltipItem<"bar">[]) {
            return `Difficulty: ${context[0].label}`; // Customize the tooltip title
          },
        },
        backgroundColor: "rgba(80, 80, 80, 0.8)",
        padding: 12,
        titleColor: "white",
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyColor: "white",
        bodyFont: {
          size: 16,
        },
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
  };

  const levelConversion = {
    math_L1_points: "level 1 (easier)",
    math_L2_points: "level 2",
    math_L3_points: "level 3",
    math_L4_points: "level 4",
    math_L5_points: "level 5 (harder)",
    reading_L1_points: "K - 1st grade level",
    reading_L2_points: "2nd grade level",
    reading_L3_points: "3rd grade level",
    reading_L4_points: "4th grade level",
    reading_L5_points: "5th grade level",
  };

  // Variables to isolate math or reading level values (ex. math_L1_points) and then return the HIGHEST of each
  const mathLevelArray = Object.entries(userScore)
    .filter(([key, _value]) => key.startsWith("math"))
    .map(([key, value]) => [
      levelConversion[key as keyof typeof levelConversion],
      value,
    ]);

  const highestMathLevel = mathLevelArray.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  const readingLevelArray = Object.entries(userScore)
    .filter(([key, _value]) => key.startsWith("reading_L"))
    .map(([key, value]) => [
      levelConversion[key as keyof typeof levelConversion],
      value,
    ]);

  const highestReadingLevel = readingLevelArray.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // API call to GET summary stats for the timed challenge container - runs on page load
  const getChallengeSummaryData = async () => {
    try {
      const response = await fetch(
        "/api/users-math/timed-challenge/summary-results",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setChallengeSummaryData({
          totalChallenges: data.totalChallenges,
          mostFrequentChallenge: data.mostFrequentChallenge.math_type,
          percentScore: data.percentScore,
          totalPoints: data.totalPoints._sum.points_added,
          percentScoreLastTen: data.percentScoreLastTen,
        });
      }
    } catch (error) {
      console.error("Error fetching user score data:", error);
    }
  };

  // API call to get incorrect responses from last 10 timed challenges
  const getLastTenChallengeIncorrectResponses = async () => {
    try {
      const response = await fetch(
        "/api/users-math/timed-challenge/incorrect-equations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIncorrectEquationsData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // API call to Anthropic endpoint to return feedback on incorrect responses
  const evaluateEquations = async () => {
    try {
      const response = await fetch("/anthropic/evaluate_incorrect_responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incorrectEquationsData),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Server response:", textResponse);
        throw new Error("Failed to evalaute the equations");
      }

      const data = await response.json();
      // console.log(data);

      // Sets API response data into equationFeedback state
      setIsAPICallInProgress(false);
      setEquationFeedback(data);

      //return await response.json();
    } catch (error) {
      console.error("Error evaluating answers:", error);

      throw error;
    }
  };

  // GETS DATA FROM LAST 20 CHALLENGES FOR A GIVEN USER (POPULATES THE LINE CHART)
  const getLast20Challenges = async () => {
    try {
      const queryParams = new URLSearchParams({
        math_type: mathTypeSelector,
        level: levelSelector,
      });

      const response = await fetch(
        `/api/users-math/timed-challenge/score-trending?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Server response:", textResponse);
        console.log("Status:", response.status);
        throw new Error("Failed grab the data");
      }

      const data = await response.json();

      setLast20ChallengeScores(data.formattedDates);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  // EVENT HANDLERS FOR math_type and level MUI SELECTORS (TRENDING CHART)
  const handleChangeMathType = (event: SelectChangeEvent) => {
    setMathTypeSelector(event.target.value as string);
  };

  const handleChangeMathLevel = (event: SelectChangeEvent) => {
    setLevelSelector(event.target.value as string);
  };

  // useEffect to run "getLast20Challenges" every time a selector state value is changed (mathTypeSelector, levelSelector)
  useEffect(() => {
    getLast20Challenges();
  }, [mathTypeSelector, levelSelector]);

  const trendingChartData = {
    labels: last20ChallengeScores.map((item) =>
      new Date(item.dateTime).toLocaleDateString("en-US", {
        dateStyle: "short",
      })
    ),
    datasets: [
      {
        label: "Points",
        data: last20ChallengeScores.map((item) => item.points_added),
        borderColor: "#dd6e55",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4,
        fill: false,
        backgroundColor: "#dd6e55",
      },
    ],
  };

  const trendingChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `Points: ${context.parsed.y}`;
          },
          title: function (context: TooltipItem<"line">[]) {
            return `Date: ${context[0].label}`;
          },
        },
        backgroundColor: "rgba(80, 80, 80, 0.8)",
        padding: 12,
        titleColor: "white",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyColor: "white",
        bodyFont: {
          size: 16,
        },
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Points",
          font: {
            size: 20,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Challenge date",
          font: {
            size: 20,
          },
        },
      },
    },
  };

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

        <div className="accountPageContainer">
          <div className="accountButtonContainer">
            <button className="button getBack" onClick={navHome}>
              Go back
            </button>
            <Link to={"/"}>
              <button className="button appSelect">Switch games</button>
            </Link>
          </div>
          {/* CONTAINER FOR USER PLAY DATA */}
          <div className="accountContentContainer">
            <h2>Your overall progress on Woof Learning games:</h2>
            <h3>Badges you've earned:</h3>
            <div className="accountRowContainer">
              <div className="accountBadges">
                <h3 className="reading-font-me">Woof Reading</h3>
                {readingList.length === 0 ? (
                  <span className="accountAlert">None yet!</span>
                ) : (
                  readingList
                )}
              </div>

              <div className="accountBadges">
                <h3 className="math-font-me">Woof Math</h3>
                {mathList.length === 0 ? (
                  <span className="accountAlert">None yet!</span>
                ) : (
                  mathList
                )}
              </div>
            </div>
            <h3>Points you've earned:</h3>
            <div className="accountRowContainer">
              <div className="chartBox">
                <div className="chartTitle">
                  <h3 className="reading-font-me">
                    Woof Reading: {userScore.reading_score} points
                  </h3>
                  <p className="grayText">
                    Most of your points ({highestReadingLevel[1]}) are from{" "}
                    {highestReadingLevel[0]}
                    {"  "}
                    <Link to="#" onClick={openChartModal}>
                      <span className="helpPopupText">(What's this?)</span>
                    </Link>
                  </p>
                </div>
                <div className="barChart">
                  <Bar options={options} data={chartDataReading}></Bar>
                </div>
              </div>
              <div className="chartBox">
                <div className="chartTitle">
                  <h3 className="math-font-me">
                    Woof Math: {totalScore} points
                  </h3>
                  <p className="grayText">
                    Most of your points ({highestMathLevel[1]}) are from{"  "}
                    {highestMathLevel[0]}{" "}
                    <Link to="#" onClick={openChartModal}>
                      <span className="helpPopupText">(What's this?)</span>
                    </Link>
                  </p>
                </div>
                <div className="barChart">
                  <Bar options={options} data={chartDataMath} />
                </div>
              </div>
            </div>
          </div>

          {/* CONTAINER FOR MATH TIMED CHALLENGE RESULTS AND AI RESPONSE */}

          <div className="accountContentContainer" id="challengeResultsId">
            <h2>
              Your timed challenge results:
              <span className="math-font-me"> Woof Math </span>
            </h2>
            {challengeSummaryData.totalChallenges === 0 && (
              <h3 className="results-alert">
                ** As you play Woof Math timed challenges, you'll see your
                results and helpful tips below.{" "}
              </h3>
            )}
            <h3>Overall:</h3>
            <div className="resultsChallenge SummaryContainer">
              <div className="resultsChallenge SummaryData-split">
                <div className="resultsChallenge SummaryData">
                  <h4>{challengeSummaryData.totalChallenges}</h4>
                  <p>total challenges</p>
                </div>
                <div className="resultsChallenge SummaryData">
                  <p> You've mostly done </p>
                  <h4>{challengeSummaryData.mostFrequentChallenge}</h4>
                </div>
              </div>
              <div className="resultsChallenge SummaryData-split">
                <div className="resultsChallenge SummaryData">
                  <h4>{challengeSummaryData.percentScore}%</h4>{" "}
                  <p>correct answers</p>
                </div>
                <div className="resultsChallenge SummaryData">
                  <h4>{challengeSummaryData.totalPoints} </h4>
                  <p>challenge points</p>
                </div>
              </div>
            </div>
            <h3>
              Feedback from your last{" "}
              {challengeSummaryData.totalChallenges >= 10
                ? 10
                : challengeSummaryData.totalChallenges}{" "}
              challenges
              {challengeSummaryData.totalChallenges < 10 && (
                <>(keep doing challenges for more helpful tips!)</>
              )}{" "}
              <AutoAwesomeIcon style={{ fontSize: "22px", color: "#dd6e55" }} />
            </h3>

            <div className="resultsChallenge AIContainer">
              {isAPICallInProgress && <CircularProgress />}

              {equationFeedback.feedback}
            </div>

            {last20ChallengeScores.length === 0 ? (
              <>
                <h3>Try a challenge at this level to see your progress</h3>
              </>
            ) : (
              <>
                <h3>
                  See how you're progressing for the last{" "}
                  {last20ChallengeScores.length} challenge(s):
                </h3>
              </>
            )}

            <div className="resultsChallenge ChartContainer">
              <div className="resultsChallenge-selectorContainer">
                {/* MUI SELECTORS  */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Kind of math
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mathTypeSelector}
                      label="Math operation"
                      onChange={handleChangeMathType}
                    >
                      <MenuItem value={"addition"}>Addition</MenuItem>
                      <MenuItem value={"subtraction"}>Subtraction</MenuItem>
                      <MenuItem value={"multiplication"}>
                        Multiplication
                      </MenuItem>
                      <MenuItem value={"division"}>Division</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Level</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={levelSelector}
                      label="Math level"
                      onChange={handleChangeMathLevel}
                    >
                      <MenuItem value={1}>Level 1</MenuItem>
                      <MenuItem value={2}>Level 2</MenuItem>
                      <MenuItem value={3}>Level 3</MenuItem>
                      <MenuItem value={4}>Level 4</MenuItem>
                      <MenuItem value={5}>Level 5</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="lineChart">
                <Line data={trendingChartData} options={trendingChartOptions} />
              </div>
            </div>
          </div>

          {/* CONTAINER FOR USER PERSONAL DATA AND USER FUNCTIONS (DELETE, CONTACT) */}
          <div className="accountContentContainer">
            <h2>Here are your details:</h2>
            {/* <li>
              Name: <span className="accountFont">{userInfo.name}</span>
            </li> */}
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
          <ChartModal
            isChartModalOpen={isChartModalOpen}
            setIsChartModalOpen={setIsChartModalOpen}
          />
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
