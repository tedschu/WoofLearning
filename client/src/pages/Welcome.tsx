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
            <p>
              Build math and reading skills while earning points and (really
              cool) animal badges!
            </p>

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
                Woof Learning was built to make math and reading practice fun
                and rewarding.
              </h2>
              <p>
                With simple and rewarding gameplay experience, Woof Learning is
                focused on helping young learners grow, and have fun. It's all
                about practicing math and reading skills, and getting helpful,
                smart feedback along the way.
              </p>

              <br />
              <h2>It's made for kids. </h2>
              <p>
                Woof Learning games are intended for kids at the elementary
                school level. You decide which kind of math you want to play
                (for example, addition) or stories you want to read, and how
                challenging the questions should be. Get started by quickly
                creating a free account.
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
