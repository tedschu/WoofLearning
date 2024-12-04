import React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { UserInfo } from "../types/types";

type ResetPassModalTypes = {
  isResetPassOpen: boolean;
  onResetPassClose: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

type SecurityQuestionTypes = {
  security_question_1: string;
  security_question_2: string;
};

function ResetPassModal({
  isResetPassOpen,
  onResetPassClose,
  userInfo,
  setUserInfo,
}: ResetPassModalTypes) {
  if (!isResetPassOpen) return null;

  const [resetStep, setResetStep] = useState(1);
  const [securityQuestions, setSecurityQuestions] =
    useState<SecurityQuestionTypes>({
      security_question_1: "",
      security_question_2: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handles form values AND updates loginForm state
  const setFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
  };

  const usernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getSecurityQuestions(userInfo);
  };

  // Step 1: takes in a username and returns the security questions
  const getSecurityQuestions = async (userInfo: UserInfo) => {
    try {
      const response = await fetch(`/auth/get-questions/${userInfo.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSecurityQuestions({
          security_question_1: data.security_question_1,
          security_question_2: data.security_question_2,
        });
        setResetStep(2);
      } else {
        console.error("Error fetching usernames", data);
      }
    } catch (error) {
      //setNoUsers(true);
    }
  };

  const questionsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkSecurityAnswers(userInfo);
  };

  async function checkSecurityAnswers(userInfo: UserInfo) {
    try {
      const response = await fetch("/auth/check-answers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          security_answer_1: userInfo.security_answer_1,
          security_answer_2: userInfo.security_answer_2,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        setResetStep(3);
      }
    } catch (error) {
      console.error("Error during login", error);
      //setLoginFailed(true);
    }
  }

  const passwordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePassword(userInfo);
  };

  async function updatePassword(userInfo: UserInfo) {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        setSuccessMessage(
          "You've updated your password. Close this window to log back in."
        );
      }
    } catch (error) {
      console.error("Error during login", error);
      //setLoginFailed(true);
    }
  }

  return (
    <>
      <div className="modalOverlay">
        <div className="modalContent">
          <h2>Let's reset your password.</h2>

          {resetStep === 1 && (
            <form
              action=""
              className="resetModalForm"
              onSubmit={usernameSubmit}
            >
              <label htmlFor="name">First, what is your username?</label>
              <input
                type="text"
                placeholder="example: Count Woofula"
                name="username"
                value={userInfo.username}
                onChange={setFormValues}
              />
              <button className="recover button">Submit</button>
            </form>
          )}

          {resetStep === 2 && (
            <>
              <h3>
                Thanks! Please answer your security questions to reset the
                password:
              </h3>

              <form
                action=""
                className="resetModalForm"
                onSubmit={questionsSubmit}
              >
                <label htmlFor="security_answer_1">
                  Question 1: {securityQuestions.security_question_1}
                </label>
                <input
                  type="text"
                  placeholder="Answer to question #1..."
                  name="security_answer_1"
                  value={userInfo.security_answer_1}
                  onChange={setFormValues}
                />
                <label htmlFor="security_answer_2">
                  Question 1: {securityQuestions.security_question_2}
                </label>
                <input
                  type="text"
                  placeholder="Answer to question #2..."
                  name="security_answer_2"
                  value={userInfo.security_answer_2}
                  onChange={setFormValues}
                />
                <button className="recover button">Submit</button>
              </form>
            </>
          )}

          {errorMessage && <h3>{errorMessage}</h3>}

          {resetStep === 3 && (
            <>
              <h3>
                Awesome, {userInfo.username}. Please set your new password:
              </h3>

              <form
                action=""
                className="resetModalForm"
                onSubmit={passwordSubmit}
              >
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="(...something you can remember)"
                  name="password"
                  value={userInfo.password}
                  onChange={setFormValues}
                />

                <button>Update password</button>
              </form>
            </>
          )}

          {successMessage && <h3>{successMessage}</h3>}

          <button className="modalClose" onClick={onResetPassClose}>
            {" "}
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPassModal;
