import { Link } from "react-router-dom";
import woofLogo from "../assets/wooflogo_3d.png";
import woofMathLogoNav from "../assets/wooflogo_nobackground.png";

import badge_boxer from "../assets/badges/badge_1_4_boxer.png";
import badge_poodle from "../assets/badges/badge_2_7_poodle.png";
import badge_trophy from "../assets/badges/badge_1_8_goldendoodle.png";
import chalkboard from "../assets/chalkboard.png";
import book from "../assets/book.png";
import welcomeDog from "../assets/welcome_dog_large.png";
import woofmath_demo from "../assets/WoofMath_demo.webm";
import woofreading_demo from "../assets/WoofReading_demo.webm";

function Welcome() {
  return (
    <>
      <div className="welcomePageContainer">
        <div className="welcomeNav">
          <div className="welcomeNav-logo">
            <img src={woofMathLogoNav} className="woofBlinkLogo" alt="" /> Woof
            Learning
          </div>
          <div className="welcomeNav-links"></div>
          <div className="welcomeNav-signup">
            <Link to={"/login"}>
              <button className="welcomeNav-buttonLogin">LOGIN</button>
            </Link>
          </div>
        </div>
        <div className="welcomeTopContainer">
          <div className="welcomeContentContainer">
            <h1>Building math and reading skills is a journey.</h1>
            <h2>Make it an adventure.</h2>
            <div className="welcomeButtonContainer">
              <Link to={"/register"}>
                <button className="button signup">SIGN UP</button>
              </Link>
            </div>
          </div>
          <div className="welcomeLogoContainer">
            <img
              src={woofLogo}
              className="woofLogo-home"
              alt="Woof Learning logo"
            />
          </div>
        </div>

        {/* MIDDLE INFO BOXES */}
        <div className="welcomeAboutInfoContainer">
          <div className="welcomeInfoBox">
            <div className="welcomeInfoBox-img">
              <img src={welcomeDog} className="welcomeImg-middle" alt="" />
            </div>
            <div className="welcomeInfoBox-text">
              <h2>Learning-focused games for kids.</h2>
              <p>
                Practice math and reading at your level, and get helpful
                feedback along the way.
              </p>
            </div>
          </div>
          <div className="welcomeInfoBox">
            <div className="welcomeInfoBox-img">
              <img src={chalkboard} className="welcomeImg-middle" alt="" />
              <img src={book} className="welcomeImg-middle" alt="" />
            </div>
            <div className="welcomeInfoBox-text">
              <h2>Become a math and reading champ!</h2>
              <p>
                Improve your reading comprehension and math skills in simple,
                fun games.
              </p>
            </div>
          </div>
          <div className="welcomeInfoBox">
            <div className="welcomeInfoBox-img">
              <img src={badge_poodle} className="welcomeImg-small" alt="" />
              <img src={badge_trophy} alt="" />
              <img src={badge_boxer} className="welcomeImg-small" alt="" />
            </div>
            <div className="welcomeInfoBox-text">
              <h2>Reward yourself for your progress.</h2>
              <p>
                The more you practice reading and math, the more super-cool
                badges you can earn.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="welcomeAboutContainer"> */}

        {/* MATH GAMEPLAY DEMO */}
        <div className="welcomeSubContainerBottom">
          <div className="welcomeAboutImageBottom">
            {/* <img src={gameplayMath} alt="" /> */}
            <video autoPlay loop muted playsInline className="welcomeVideoDemo">
              <source src={woofmath_demo} type="video/mp4" />
            </video>
          </div>
          <div className="welcomeAboutContent bottom">
            <h1>Woof Math blah blah</h1>
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
          <div className="welcomeAboutContent bottom">
            <h1>Woof Reading game play</h1>
            <ul>
              <li>
                Pick what you want to read: a story, maybe a poem? Then, find a
                story topic that sounds fun. Choose how challenging the story
                should be, as well. Woof Reading uses AI to help create the
                stories and also to provide helpful feedback for readers.{" "}
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
          <div className="welcomeAboutImageBottom">
            <video autoPlay loop muted playsInline className="welcomeVideoDemo">
              <source src={woofreading_demo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Welcome;
