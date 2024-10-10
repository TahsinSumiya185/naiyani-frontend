import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import Sidebar from "../../components/sideBar/SideBar"; // Adjust the import path
import TopBar from "../../components/topBar/TopBar"; // Adjust the import path
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const Settings = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-white">
      <TopBar /> {/* Add the TopBar here */}
      

        <div
          className="flex pt-40 pr-6"
   
        >
            <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Sidebar collapsed={collapsed} className='' />
        
         
        </div>

        <Content
   
        >
          <Outlet /> 
        </Content>
      </Layout>
  
  );
};

export default Settings;