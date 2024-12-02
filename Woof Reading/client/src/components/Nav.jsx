import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";

function Nav({ isLoggedIn, userInfo }) {
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <img src={woofMathLogo} alt="" />
        </Link>

        <div className="navTitle">Woof Reading</div>

        {isLoggedIn && userInfo && userInfo.username && (
          <Link to={"/me"} className="navUser">
            <h4>Hello, {userInfo.username}!</h4>
          </Link>
        )}
      </nav>
    </>
  );
}

export default Nav;
