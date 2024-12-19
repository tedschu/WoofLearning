import { Link } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import gameplayMath from "../assets/gameplay-math.png";
import gameplayReading from "../assets/gameplay-reading.png";
import badge_bernese from "../assets/badges/badge_1_1_bernese.png";
import badge_chihuahua from "../assets/badges/badge_1_2_chihuahua.png";
import goldendoodle_trophy from "../assets/goldendoodle_trophy_large.png";
import badge_boxer from "../assets/badges/badge_1_4_boxer.png";

function Welcome() {
  return (
    <>
      <div className="welcomePageContainer">
        <div className="welcomeBackground">
          <div className="welcomeLogoContainer">
            <img
              src={woofMathLogo}
              className="woofMathLogo"
              alt="WoofMath logo"
            />
          </div>

          <div className="welcomeContentContainer">
            <h1>Woof Learning</h1>
            <p>Make math and reading an adventure!</p>

            <div className="welcomeButtonContainer">
              <Link to={"/login"}>
                <button className="button login">LOGIN</button>
              </Link>
              <Link to={"/register"}>
                <button className="button signup">SIGN UP</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="welcomeAboutSeparator">
          {" "}
          <h1>Learn more about the games</h1>
        </div>
        <div className="welcomeAboutContainer">
          <div className="welcomeSubContainerTop">
            <div className="welcomeAboutContent">
              <h2>
                Woof Learning was built to make math and reading practice fun.
              </h2>
              <p>
                Woof Learning turn math and reading skills into exciting games.
                Through simple, engaging gameplay, students receive smart
                feedback that helps them learn and grow while having fun.
              </p>

              <br />
              <h2>It's made for kids. </h2>
              <p>
                Choose your adventure - whether it's mastering addition,
                exploring stories, or both! You control the difficulty level,
                making it perfect for your child's learning journey. Create a
                free account to start playing and learning today.
              </p>
            </div>

            <div className="imageTopContainer">
              <div className="welcomeAboutImageTop">
                <img src={badge_bernese} alt="" />
                <img src={badge_chihuahua} alt="" />
                <img src={badge_boxer} alt="" />
              </div>
              <div className="welcomeAboutImageTop_2">
                <img src={goldendoodle_trophy} alt="" />
              </div>
            </div>
          </div>
          <div className="divider"></div>

          <div className="welcomeSubContainerBottom">
            <div className="welcomeAboutImageBottom">
              <img src={gameplayMath} alt="" />
            </div>
            <div className="welcomeAboutContent bottom">
              <h2 className="math-font">Woof Math game play:</h2>
              <ul>
                <li>
                  Choose your type of math (ex. addition, division) and how hard
                  the questions should be.
                </li>
                <li>
                  See how you do! The more questions you get right, the more
                  points and animal badges you earn.
                </li>
                <li>See if you can win the goldendoodle badge!</li>
              </ul>
              <Link to={"/register"}>
                <button className="button signup welcome">SIGN UP</button>
              </Link>
            </div>
          </div>
          <div className="welcomeSubContainerBottom">
            <div className="welcomeAboutImageBottom">
              <img src={gameplayReading} alt="" />
            </div>
            <div className="welcomeAboutContent bottom">
              <h2 className="reading-font">Woof Reading game play:</h2>
              <ul>
                <li>
                  Pick what you want to read: a story, maybe a poem? Then, find
                  a story topic that sounds fun. Choose how challenging the
                  story should be, as well. Woof Reading uses AI to help create
                  the stories and also to provide helpful feedback for readers.{" "}
                  <Link
                    style={{ color: "inherit", fontSize: "inheret" }}
                    to={"/about"}
                  >
                    Learn more about our use of AI.
                  </Link>
                </li>
                <li>
                  See how you do! The more questions you get right, the more
                  points and animal badges you earn.
                </li>
                <li>See if you can win the goldendoodle badge!</li>
              </ul>
              <Link to={"/register"}>
                <button className="button signup welcome">SIGN UP</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
