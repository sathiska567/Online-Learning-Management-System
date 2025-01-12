import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Space, Badge } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  BellOutlined,
} from "@ant-design/icons";
import PendingActions from "../../icons/PendingActions";

const { Header, Sider } = Layout;

const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png";

const MENU_TITLES = {
  "1": "Dashboard",
  "2": "User Validation",
  "3": "Search",
  "4": "Manage",
  "5": "History",  // Added History
};

const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState({
    avatarUrl: DEFAULT_AVATAR,
    username: "John Doe"
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathToKey = {
      "/AdminStats": "1",
      "/UserValidation": "2",
      "/Manage": "3",
      "/history": "5",  // Added history route
    };
    setSelectedMenuItem(pathToKey[location.pathname] || "1");
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/demo");
        const data = await response.json();
        setUserData({
          avatarUrl: data.avatarUrl || DEFAULT_AVATAR,
          username: data.username
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Layout style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={100}
        width={250}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#15295E',
          borderRight: '1px solid #1D5596',
          zIndex: 1000
        }}
      >
        <div style={{ 
          height: '74px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 24px',
          borderBottom: '1px solid white',
          backgroundColor: '#15295E'
        }}>
          <Avatar
            size="large"
            src={userData.avatarUrl}
            alt={userData.username}
          />
          {!collapsed && (
            <span style={{ 
              marginLeft: '12px', 
              color: 'white', 
              fontSize: '16px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {userData.username}
            </span>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          style={{ 
            backgroundColor: '#15295E',
            height: 'calc(100vh - 112px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '15px',
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PendingActions />}>
            <Link to="/history">History</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PoweroffOutlined />} onClick={handleLogout}>
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ 
        marginLeft: collapsed ? '100px' : '250px',
        height: '100vh',
        transition: 'margin-left 0.2s'
      }}>
        <Header style={{ 
          padding: 0,
          backgroundColor: '#15295E',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 999,
          width: `calc(100vw - ${collapsed ? '100px' : '250px'})`,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'width 0.2s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: '64px',
                height: '64px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            <span style={{ 
              color: 'white', 
              fontSize: '22px', 
              marginLeft: '16px',
              letterSpacing: '0.05em'
            }}>
              Online Sync Pro
            </span>
          </div>
          
          <div style={{ marginRight: '32px' }}>
            <Link to="/UserValidation">
              <Space>
                <Badge count={notifications.length}>
                  <Avatar 
                    shape="square"
                    icon={<BellOutlined style={{ fontSize: '22px' }} />}
                  />
                </Badge>
              </Space>
            </Link>
          </div>
        </Header>

        <div style={{ 
          height: '48px',
          backgroundColor: '#1D5596',
          position: 'fixed',
          top: '64px',
          right: 0,
          zIndex: 998,
          width: `calc(100vw - ${collapsed ? '100px' : '250px'})`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '24px',
          transition: 'width 0.2s'
        }}>
          <span style={{ color: 'white', fontSize: '16px' }}>
            {MENU_TITLES[selectedMenuItem]}
          </span>
        </div>

        <div style={{
          padding: '24px',
          marginTop: '112px',
          height: 'calc(100vh - 112px)',
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default SideBar;
