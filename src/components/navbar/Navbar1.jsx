import { Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menuIcon from "../../assets/img/menu.png";
import logo from "../../assets/img/naiyanLogo.jpg";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";

const Navbar1 = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // Step 1: Get navigate function

  const showDrawer = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    // Store the current path in localStorage
    localStorage.setItem('lastVisitedPage', window.location.pathname);
  
    removeUserInfo("accessToken");
    navigate('/');
  };
  
  
  const item = {
    img: <img className="w-24" src={logo} alt="logo" />,
  };

  return (
    <div className="py-8 sticky top-0 z-50 bg-white">
      <div>
        <button
          className="menu-icon-container right-0 rounded-[50%] border-none bg-white lg:hidden"
          type="text"
          onClick={showDrawer}
        >
          <img src={menuIcon} alt="" />
        </button>
        <div className="flex items-center justify-between mx-5 md:mx-24">
          <div className="flex items-center gap-24">
            <div className="text-left">
              <NavLink to="/" className="text-[24px]" activeClassName="active-link">
                NAIYANI
              </NavLink>
            </div>
            <div className="lg:block hidden">
              <LeftMenu mode={"horizontal"} isLoggedIn={isLoggedIn()} />
            </div>
          </div>

          <div className="lg:block hidden">
            <RightMenu isLoggedIn={isLoggedIn()} onLogout={handleLogout} />
          </div>
        </div>

        <div>
          <Drawer
            title={item.img}
            placement="right"
            closable={true}
            onClose={showDrawer}
            open={visible}
            style={{ zIndex: 9999 }}
          >
            <LeftMenu mode={"inline"} isLoggedIn={isLoggedIn()} />
            <RightMenu isLoggedIn={isLoggedIn()} onLogout={handleLogout} mode={"inline"} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
