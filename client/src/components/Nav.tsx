import { Link } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { CurrentApp, UserInfo } from "../types/types";

type NavTypes = {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  currentApp: CurrentApp;
};

// TODO: STATE VALUE TO SET WHICH GAME THE USER IS ON + TO SET NAV TITLE (MATH OR READING)
function Nav({ isLoggedIn, userInfo, currentApp }: NavTypes) {
  console.log(currentApp);
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <img src={woofMathLogo} alt="" />
        </Link>

        <div className="navTitle">{currentApp}</div>

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
