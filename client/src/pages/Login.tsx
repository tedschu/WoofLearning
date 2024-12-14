import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecoverModal from "../components/RecoverModal";
import ResetPassModal from "../components/ResetPassModal";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { UserInfo } from "../types/types";

type LoginProps = {
  userInfo: UserInfo;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

function Login({ setIsLoggedIn, userInfo, setUserInfo, setToken }: LoginProps) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);

  const openRecoverModal = () => setIsRecoverModalOpen(true);
  const closeRecoverModal = () => setIsRecoverModalOpen(false);

  const openResetPassModal = () => setIsResetPassModalOpen(true);
  const closeResetPassModal = () => setIsResetPassModalOpen(false);

  const navigate = useNavigate();

  // Handles form values
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
  };

  // Submit button
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginCheck(userInfo);
  };

  // *************
  // Posts login form data to API AND validates whether user exists
  // Uses isLoggedIn state setter to pass "true" to parent state in App.jsx
  async function loginCheck(userInfo: UserInfo) {
    try {
      const response = await fetch(
        "/auth/login", //path to login (see vite.config)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userInfo.username,
            password: userInfo.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Login failed");
        setLoginFailed(true);
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        //setUserId(data.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setLoginFailed(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginFailed(true);
    }
  }

  return (
    <>
      <div className="loginPageContainer">
        <div className="loginContainer">
          <img
            src={woofMathLogo}
            alt="WoofMath logo"
            className="woofMathLogo"
          />

          <div className="loginContentContainer">
            <h1>Hey, you! Welcome back.</h1>
            <p>Log in to start playing.</p>
          </div>

          <form action="" className="loginForm" onSubmit={submit}>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              value={userInfo.username}
              onChange={setFormValues}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={userInfo.password}
              onChange={setFormValues}
            />
            <button className="button login">LOG IN</button>
          </form>
          {loginFailed && (
            <>
              <h4>Oops. There was a problem with your login.</h4>
              <div className="recoverButtonContainer">
                <button className="button recover" onClick={openRecoverModal}>
                  Find my username
                </button>
                <button className="button recover" onClick={openResetPassModal}>
                  Reset password
                </button>
              </div>

              <RecoverModal
                isRecoverOpen={isRecoverModalOpen}
                onRecoverClose={closeRecoverModal}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />

              <ResetPassModal
                isResetPassOpen={isResetPassModalOpen}
                onResetPassClose={closeResetPassModal}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            </>
          )}

          <h4>
            Don't have an account? No worries,{" "}
            <Link className="link-white" to={"/register"}>
              sign up.{" "}
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Login;
