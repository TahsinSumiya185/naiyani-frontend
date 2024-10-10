/* eslint-disable react/prop-types */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import './sideBar.css'
const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="0"
      width={220}
      style={{
        background: "white",
        paddingLeft: "20px",
      }}
    >
      <p className="font-semibold">Settings</p>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="personal-information">Personal Information</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="payment-information">Payment Information</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="subscription-details">Subscription</Link>
        </Menu.Item>
 
      </Menu>
    </Sider>
  );
};

export default Sidebar;
