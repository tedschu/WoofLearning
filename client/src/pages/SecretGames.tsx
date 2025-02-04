// @ts-nocheck

import { useState } from "react";
import { Link } from "react-router-dom";
import Connect from "../components/secretGames/Connect";
import Match from "../components/secretGames/Match";
import cat from "../assets/catsino.png";

function SecretGames() {
  return (
    <>
      {/* <Link to={"/me"} className="connectLinkBack">
        Back
      </Link> */}
      <div className="secretGamesContainer">
        <img src={cat} alt="" className="secretGamesCatLogo" />

        <h1>Welcome to Catsino Royale</h1>
        <p>Choose a game below:</p>
        <div className="secretGameBox">
          <Link to={"/connect"} className="connectLink">
            Connect
          </Link>
        </div>
        <div className="secretGameBox">
          <Link to={"/match"} className="connectLink">
            Card Match
          </Link>
        </div>
        <div>
          <Link to={"/"}>
            <button className="secretBackButton">...Or, go back</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SecretGames;
