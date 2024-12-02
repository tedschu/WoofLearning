// import React from "react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import woofMathLogo from "../assets/woofmath_logo_1.png";

// function Register({ setIsLoggedIn, isLoggedIn, userInfo, setUserInfo }) {
//   const [registerError, setRegisterError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");

//   const navigate = useNavigate();

//   // Submit button
//   const submit = async (event) => {
//     event.preventDefault();

//     setSubmitMessage("");

//     if (!username) {
//       setSubmitMessage("Make sure you've added your username.");
//     } else {
//       setIsSubmitting(true);
//       try {
//         const response = await fetch("/api/invite/submit-username", {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({ username }),
//         });

//         if (response.ok) {
//           setSubmitMessage("Thanks! Give us a few days to provide access.");
//           setUsername("");
//         } else {
//           setIsSubmitting(false);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setSubmitMessage("Oops! Something went wrong. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="registerPageContainer">
//         <div className="registerContentContainer">
//           <Link to={"/welcome"}>
//             <img src={woofMathLogo} alt="" className="registerLogo" />
//           </Link>
//           <h1>Hey, you!</h1>
//           <p>
//             Woof Reading is currently in beta and is invite-only. If you're
//             interested in trying it out, let us know by sharing your Woof Math
//             username below.
//           </p>
//           <br />
//           <p>
//             {" "}
//             <span className="italicRegister">
//               {" "}
//               Why my <Link to={"http://woofmath.com"}>Woof Math</Link> username?
//             </span>{" "}
//             When Woof Reading is fully launched, you'll be able to access it as
//             well as Woof Math with the same login information. For now, this is
//             the best way to connect the dogs...I mean dots.
//           </p>

//           <form action="" className="registerForm" onSubmit={submit}>
//             <label htmlFor="birth_year">Your Woof Math username:</label>
//             <input
//               type="text"
//               placeholder="example: Pups McWoofington"
//               name="username"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//               }}
//             />

//             <button className="button login">
//               {isSubmitting ? "Submitting..." : "Let us know!"}
//             </button>
//           </form>
//           {submitMessage && (
//             <h3 className="registerNotification">{submitMessage}</h3>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;
