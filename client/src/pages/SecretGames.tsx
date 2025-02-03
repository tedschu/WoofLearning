// @ts-nocheck

import { useState } from "react";
import { Link } from "react-router-dom";
import Connect from "../components/secretGames/Connect";
import Match from "../components/secretGames/Match";

function SecretGames() {
  return (
    <>
      <Link to={"/me"} className="connectLinkBack">
        Back
      </Link>
      <div className="secretGamesContainer">
        <div className="secretGameBox">
          <Link to={"/connect"} className="connectLink">
            Connect 4
          </Link>
        </div>
        <div className="secretGameBox">
          <Link to={"/match"} className="connectLink">
            Card Match
          </Link>
        </div>
      </div>
    </>
  );
}

export default SecretGames;
