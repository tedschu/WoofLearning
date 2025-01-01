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
import woofmath_demo_mp4 from "../assets/WoofMath_demo.mp4";
import woofreading_demo from "../assets/WoofReading_demo.webm";
import woofreading_demo_mp4 from "../assets/WoofReading_demo.mp4";

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

        {/* MATH GAMEPLAY VIDEO */}
        <div className="welcomeSubContainerBottom math">
          <div className="welcomeAboutContent bottom">
            <div className="welcomeWoofMathBox">Woof Math</div>
            <h1>Level up your math skills through (fun) practice</h1>
            <p>
              Choose your type of math (ex. addition, division) and how hard the
              questions should be.
            </p>
            <div className="welcomeButtonMargin">
              <Link to={"/register"}>
                <button className="button signup">SIGN UP</button>
              </Link>
            </div>
          </div>
          <div className="welcomeAboutImageBottom">
            {/* <img src={gameplayMath} alt="" /> */}
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="welcomeVideoDemo"
            >
              <source src={woofmath_demo} type="video/webm" />
              <source src={woofmath_demo_mp4} type="video/mp4" />
            </video>
          </div>
        </div>
        {/* READING GAMEPLAY VIDEO */}
        <div className="welcomeSubContainerBottom">
          <div className="welcomeAboutContent bottom">
            <div className="welcomeWoofReadingBox">Woof Reading</div>
            <h1>Choose your own adventure, with help along the way</h1>
            <p>
              Pick your story style and topic - your AI guide provides real-time
              feedback!
            </p>
            <div className="welcomeButtonMargin">
              <Link to={"/register"}>
                <button className="button signup">SIGN UP</button>
              </Link>
            </div>
          </div>
          <div className="welcomeAboutImageBottom">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="welcomeVideoDemo"
            >
              <source src={woofreading_demo} type="video/webm" />
              <source src={woofreading_demo_mp4} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Welcome;
