import { CurrentApp, UserInfo } from "../types/types";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

type NavTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
  currentApp: CurrentApp;
};

// TODO: STATE VALUE TO SET WHICH GAME THE USER IS ON + TO SET NAV TITLE (MATH OR READING)
function Nav({ isLoggedIn, setIsLoggedIn, userInfo, currentApp }: NavTypes) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // window.location.reload();
    setIsLoggedIn(false);
    navigate("/welcome");
  };

  const navHome = () => {
    if (currentApp === "Woof Reading") {
      navigate("/reading");
    } else if (currentApp === "Woof Math") {
      navigate("/math");
    } else navigate("/");
  };

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
          <Link to="/me" style={{ display: "block", lineHeight: 0 }}>
            <img src={`../../avatars/${userInfo.avatar_name}.png`} alt="" />
          </Link>
        </div>

        <div className="navTitle" onClick={navHome}>
          {currentApp}
        </div>

        {isLoggedIn && userInfo && userInfo.username && (
          // <Link to={"/me"} className="navUser">
          <div className="navMenu">
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate("/me")}>My profile</MenuItem>
              <MenuItem onClick={() => navigate("/progress")}>
                Progress dashboard
              </MenuItem>
              <MenuItem onClick={() => navigate("/")}>Change games</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
