import React from "react";

import woofMathLogo from "../assets/woofmath_logo_1.png";
import { Link } from "react-router-dom";
import storyPrompts from "../../utils/storyPrompts";

function Prompts({ isLoggedIn }) {
  // Shows a list of all prompts in use from storyPrompts.js, from "About" page

  return (
    <>
      <div className="aboutContainer">
        <div className="aboutHeader">
          {isLoggedIn ? (
            <Link to={"/about"}>
              <div> Go back</div>
            </Link>
          ) : (
            <Link to={"/welcome"}>
              <div> Go back</div>
            </Link>
          )}
          <div className="aboutHeaderImgContainer">
            <Link to={"/welcome"}>
              <img src={woofMathLogo} className="aboutHeaderImg" alt="" />
            </Link>
          </div>
        </div>
        <div className="promptsContentContainer">
          <h1>
            Below are the prompts (or, story ideas) that we use in Woof Reading.
          </h1>
          <p>
            Please note that these are subject to change - primarily, in that we
            may expand the list - but that the complete list will always be
            shown here for reference. At this time, we have{" "}
            {storyPrompts.length} prompts:
          </p>

          {storyPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </div>
      </div>
    </>
  );
}

export default Prompts;
