import { Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom";
import menuIcon from "../../assets/img/menu.png";
import "./TopBar.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TopBar = () => {
  const location = useLocation();
  const { isLoggedIn, firstName, email } = useSelector((state) => state.auth);


  const isSignUpPage =
    location.pathname === "/sign-up" ||
    location.pathname === "/terms" ||
    location.pathname === "/policy";
    const getUsernameFromEmail = (email) => {
      return email ? email.split('@')[0] : "User"; 
    };
  
  const items = isLoggedIn
    ? [
        {
          key: "1",
          label: (
            <Link
              className="font-bold pr-10 text-[16px] hover:text-white"
              to="/settings"
            >
              Settings
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link
              className="font-bold pr-10 text-[16px] hover:text-white"
              to="/"
            >
              Home
            </Link>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Link
              className="font-bold pr-10 text-[16px] hover:text-white"
              to="/"
            >
              Home
            </Link>
          ),
        },
      ];

  return (
    <div>
      <div className="banner-container">
        <div>
          <div className="filter-animation">
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <button className="menu-icon-container rounded-[50%] border-none bg-white">
                <img src={menuIcon} alt="menu icon" />
              </button>
            </Dropdown>
          </div>
        </div>

        {!isSignUpPage && isLoggedIn && (
          <div className="text-positionT font-semibold flex items-center">
            <span>Hi, {getUsernameFromEmail(email)}</span>
       
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
