import { Link } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { CurrentApp, UserInfo } from "../types/types";
import MenuIcon from "@mui/icons-material/Menu";

type NavTypes = {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  currentApp: CurrentApp;
};

// TODO: STATE VALUE TO SET WHICH GAME THE USER IS ON + TO SET NAV TITLE (MATH OR READING)
function Nav({ isLoggedIn, userInfo, currentApp }: NavTypes) {
  return (
    <>
      <nav
        className={
          currentApp === "Woof Math"
            ? "nav-base nav-math"
            : "nav-base nav-reading"
        }
      >
        <div className="navLogo">
          {" "}
          <img src={`../../avatars/${userInfo.avatar_name}.png`} alt="" />
        </div>

        <div className="navTitle">{currentApp}</div>

        {isLoggedIn && userInfo && userInfo.username && (
          <Link to={"/me"} className="navUser">
            <MenuIcon />
          </Link>
        )}
      </nav>
    </>
  );
}

export default Nav;
