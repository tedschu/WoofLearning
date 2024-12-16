import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { UserInfo } from "../types/types";

type RegisterProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function Register({ setIsLoggedIn, userInfo, setUserInfo }: RegisterProps) {
  const [registerError, setRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const securityQuestions = [
    "What is the name of your pet?",
    "What is your favorite color?",
    "What is your favorite ice cream flavor?",
    "What is your lucky number?",
  ];

  // Handles form values AND updates loginForm state
  const setFormValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;

    setUserInfo(newObj);
  };

  // Submit button
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      // userInfo.name ||
      //userInfo.birth_year ||
      userInfo.email ||
      userInfo.username ||
      userInfo.password ||
      userInfo.security_answer_1 ||
      userInfo.security_answer_2 ||
      userInfo.security_question_1 ||
      userInfo.security_question_2
    ) {
      registerUser(userInfo);
      setRegisterError(false);
    } else {
      setRegisterError(true);
      setErrorMessage(
        "Oops. That didn't work. Make sure you've filled out all the fields."
      );
    }
  };

  //console.log(userInfo);
  // *************
  // Posts login form data to API AND validates whether user exists
  // Uses isLoggedIn state setter to pass "true" to parent state in App.jsx
  async function registerUser(userInfo: UserInfo) {
    try {
      const response = await fetch(
        "/auth/register", //path to register (see vite.config)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // name: userInfo.name,
            //birth_year: parseInt(userInfo.birth_year),
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
            security_question_1: userInfo.security_question_1,
            security_answer_1: userInfo.security_answer_1,
            security_question_2: userInfo.security_question_2,
            security_answer_2: userInfo.security_answer_2,
          }),
        }
      );

      const data = await response.json();
      //console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.user.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        //setUserId(data.id);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration", error);
      setRegisterError(true);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <>
      <div className="registerPageContainer">
        <div className="registerContentContainer">
          <Link to={"/welcome"}>
            <img src={woofMathLogo} alt="" className="registerLogo" />
          </Link>
          <h1>Hey, you!</h1>
          <h2>
            With your parent's permission, create a free account below to begin
            playing.{" "}
          </h2>
          <Link to={"/about"}>
            <h4 className="registerPrivacyNotice">
              Why are we asking for this information?
            </h4>{" "}
          </Link>

          <form action="" className="registerForm" onSubmit={submit}>
            {/* <label htmlFor="name">Your first name:</label>
            <input
              type="text"
              placeholder="example: Charlie"
              name="name"
              value={userInfo.name}
              onChange={setFormValues}
            /> */}
            {/* <label htmlFor="birth_year">The year you were born:</label>
            <input
              type="text"
              placeholder="example: 2014"
              name="birth_year"
              value={userInfo.birth_year}
              onChange={setFormValues}
            /> */}
            <label htmlFor="email">Your parent's email:</label>
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              value={userInfo.email}
              onChange={setFormValues}
            />
            <label htmlFor="username">Username (what shall we call you):</label>
            <input
              type="text"
              placeholder="example: Count Woofula"
              name="username"
              value={userInfo.username}
              onChange={setFormValues}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="(...something you can remember)"
              name="password"
              value={userInfo.password}
              onChange={setFormValues}
            />
            <br />
            <h2>Please also answer a few security questions.</h2>
            <p>
              Why? If you ever forget your password, you can reset it by
              answering these questions.{" "}
            </p>

            <div className="securityQuestionsContainer">
              <select
                name="security_question_1"
                value={userInfo.security_question_1 || ""}
                onChange={setFormValues}
                className="securitySelect"
              >
                <option value="" disabled>
                  Choose a security question...
                </option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Answer to question #1..."
                name="security_answer_1"
                value={userInfo.security_answer_1}
                onChange={setFormValues}
              />
            </div>
            <div className="securityQuestionsContainer">
              <select
                name="security_question_2"
                value={userInfo.security_question_2 || ""}
                onChange={setFormValues}
                className="securitySelect"
              >
                <option value="" disabled>
                  Choose a security question...
                </option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Answer to question 2..."
                name="security_answer_2"
                value={userInfo.security_answer_2}
                onChange={setFormValues}
              />
            </div>
            <button className="button login">Create account</button>
          </form>
          {registerError && (
            <h3 className="registerFail">
              Oops. There was a problem with your registration.
              <br></br>
              {errorMessage}
            </h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
