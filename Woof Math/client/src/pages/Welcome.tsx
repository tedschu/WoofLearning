import React from "react";
import { Link } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import gameplayPic from "../assets/gameplay.png";
import badge_bernese from "../assets/badges/badge_bernese.png";
import badge_chihuahua from "../assets/badges/badge_chihuahua.png";
import goldendoodle_trophy from "../assets/goldendoodle_trophy_large.png";
import badge_boxer from "../assets/badges/badge_boxer.png";

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
            <h1>Woof Math</h1>
            <p>
              Earn points + super cool animal badges as you play a fun math
              game. The more math you do, the more badges you get!
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
          <h1>Learn more about the game</h1>
        </div>
        <div className="welcomeAboutContainer">
          <div className="welcomeSubContainerTop">
            <div className="welcomeAboutContent">
              <h2>Woof Math was built to make math practice fun.</h2>
              <p>
                It's a simple game: Woof Math gives you math questions to
                answer, and as you answer more questions, you get points. As you
                build up your points, you can earn super cool dog badges. The
                goldendoodle is the ultimate badge.
              </p>

              <br />
              <h2>It's made for kids. </h2>
              <p>
                Woof Math is for kids in elementary school. You decide which
                kind of math you want to play (for example, addition) and how
                hard the questions should be. Get started by quickly creating a
                free account. No credit cards, no gimmicks - we only ask for the
                info we need to get the game going, and so you can keep track of
                your scores. For more, check out{" "}
                <Link to={"/About"} className="welcomePrivacyNotice">
                  our privacy policy.
                </Link>
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

          <div className="welcomeSubContainerBottom">
            <div className="welcomeAboutImageBottom">
              <img src={gameplayPic} alt="" />
            </div>
            <div className="welcomeAboutContent bottom">
              <h2>Woof Math game play:</h2>
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
        </div>
      </div>
    </>
  );
}

export default Welcome;
