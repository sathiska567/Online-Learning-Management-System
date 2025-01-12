import "./SideBar.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  BellOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Avatar, Space, Badge, message } from "antd";
import PendingActions from "../icons/PendingActions.jsx";
import axios from "axios";
import { adminMenu, userMenu } from "../../Data/Data.js";

// Destructuring components from Ant Design's Layout
const { Header, Sider } = Layout;


// Navbar component
const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isHoveredButton1, setIsHoveredButton1] = useState(false);
  const [isHoveredButton2, setIsHoveredButton2] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  // set name
  const [currentUserName, setCurrentUsername] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [positionNotification, setPositionNotification] = useState();
  const [isCoach, setIsCoach] = useState("");
  const [isEventOrganizer, setIsEventOrganizer] = useState("");
  const [isPlayer, setIsPlayer] = useState("");
  const [isReferee, setIsReferee] = useState("");
  const [isTeamManager, setIsTeamManager] = useState("");
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();


  // Event handlers for mouse hover events
  const handleHoverButton1 = () => {
    setIsHoveredButton1(true);
  };

  const handleMouseLeaveButton1 = () => {
    setIsHoveredButton1(false);
  };

  const handleHoverButton2 = () => {
    setIsHoveredButton2(true);
  };

  const handleMouseLeaveButton2 = () => {
    setIsHoveredButton2(false);
  };

  // Event handler for menu item click
  const handleMenuItemClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  // Functional component to display text based on selected menu item
  const Text = ({ selectedMenuItem }) => {
    const text = {
      1: "Dashboard",
      2: "User Validation",
      3: "Search",
      4: "Manage",
    };

    return <p>{text[selectedMenuItem]}</p>;
  };

  // URL for the profile avatar
  const url =
    "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png";

  // Event handler for trigger button click
  const handleTriggerButtonClick = () => {
    setCollapsed(!collapsed);
  };

  // Get Database from the backend using Axios
  const [userData, setUserData] = useState({
    avatarUrl:
      "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png",
    username: "John Doe",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/demo")
      .then((response) => {
        const data = response.data;
        setUserData({
          avatarUrl: data.avatarUrl,
          username: data.username,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);


  const getSelectedMenuItem = () => {
    const path = location.pathname;
    // Example matching:
    if (path === "/AdminStats") {
      return "1";
    } else if (path === "/UserValidation") {
      return "2";
    } else if (path === "/Manage") {
      return "3";
    } else {
      return "1"; // Default to Dashboard (or another suitable item)
    }
  };
  useEffect(() => {
    setSelectedMenuItem(getSelectedMenuItem());
  }, [location.pathname]); // Update whenever the path changes

  // get admin or not status
  const sideBarMenu = true ? adminMenu : userMenu;

  // JSX structure for the Navbar component
  return (
    <>
        <Layout className="ant-layout-sider-children">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={100} 
          >

            <div style={{ backgroundColor: "#15295E" }} className="profile">
              {collapsed ? (
                <Avatar
                  className="profileAvatar"
                  src={<img src={userData.avatarUrl} alt="avatar" />}
                />
              ) : (
                <>
                  <Avatar
                    className="profileAvatar"
                    src={<img src={url} alt="avatar" />}
                  />
                  <div style={{ color: "white" }} className="Username">
                    Sathiska
                  </div>
                </>
              )}
            </div>

            <div style={{ color: "white" }} className="welcome">
              Welcome
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              onSelect={handleMenuItemClick}
              selectedKeys={[selectedMenuItem]} 
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "#15295E",
                width: "100%",
                height: "100vh",
                fontSize: "16px",
              }}
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/AdminStats">Dashboard</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<PendingActions />}>
                <Link to="/UserValidation">User Validation</Link>
              </Menu.Item>

              <Menu.Item
                key="4"
                icon={<PoweroffOutlined />}
                onMouseEnter={handleHoverButton1}
                onMouseLeave={handleMouseLeaveButton1}
              >
                <Link onClick={handleLogOut}>Log Off</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>
            <Header className="ant-layout-header">
              <Button
                className="trigger-button ant-btn"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleTriggerButtonClick}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  backgroundColor: isHoveredButton2 ? "#526CAE" : "#15295E",
                  color: isHoveredButton2 ? "white" : "white",
                }}
                onMouseEnter={handleHoverButton2}
                onMouseLeave={handleMouseLeaveButton2}
              />
              {/* Title and notification sections */}
              <span
                className="title"
                style={{
                  color: "white",
                  marginLeft: "75px",
                  letterSpacing: "1px",
                  fontSize: "22px",
                  fontWeight: "regular",
                }}
              >
                GameSync Pro
              </span>
              <span style={{ color: "white" }} className="notificaiton">
                <a href="/UserValidation">
                  <Space size={24}>
                    <Badge count={messages.length || positionNotification}>
                      <Avatar
                        shape="square"
                        icon={
                          <BellOutlined
                            style={{
                              fontSize: "22px",
                            }}
                          />
                        }
                      />
                    </Badge>
                  </Space>
                </a>
              </span>
            </Header>

            <div
              className="title_bar"
              style={{ color: "white", backgroundColor: "#1D5596" }}
            >
              <Text className="menuTitle" selectedMenuItem={selectedMenuItem} />
            </div>
            {children}
          </Layout>
        </Layout>
     
    </>
  );
};

// Exporting the Navbar component
export default SideBar;
