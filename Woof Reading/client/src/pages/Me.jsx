import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";
import Nav from "../components/Nav";

function Me({
  userInfo,
  userScore,
  totalScore,
  userBadges,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/welcome");
  };

  const navHome = () => {
    navigate("/");
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

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} />

      <div className="mainContainer">
        <ScoreBar
          userScore={userScore}
          totalScore={totalScore}
          userBadges={userBadges}
        />

        <div className="accountPageContainer">
          <div className="accountContentContainer">
            <h2>
              Welcome, {userInfo.username}! Here's what you've shared with us:
            </h2>

            <li>
              Email: <span className="accountFont">{userInfo.email}</span>
            </li>
            <li>
              Year you were born:{" "}
              <span className="accountFont">{userInfo.birth_year}</span>
            </li>
            <li>
              Username: <span className="accountFont">{userInfo.username}</span>
            </li>
            <li>
              Security question #1:{" "}
              <span className="accountFont">
                {userInfo.security_question_1}
              </span>
            </li>
            <li>
              Security answer #1:{" "}
              <span className="accountFont">{userInfo.security_answer_1}</span>
            </li>
            <li>
              Security question #2:{" "}
              <span className="accountFont">
                {userInfo.security_question_2}
              </span>
            </li>
            <li>
              Security answer #2:{" "}
              <span className="accountFont">{userInfo.security_answer_2}</span>
            </li>

            <button className="button getBack" onClick={navHome}>
              Get back to playing!
            </button>

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
        </div>
      </div>
    </>
  );
}

export default Me;
