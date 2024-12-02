import { Link } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { UserInfo } from "../types/types";

type NavTypes = {
  isLoggedIn: boolean;
  userInfo: UserInfo;
};

function Nav({ isLoggedIn, userInfo }: NavTypes) {
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <img src={woofMathLogo} alt="" />
        </Link>

        <div className="navTitle">Woof Math</div>

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
