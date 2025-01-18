import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Space, Badge, message } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  BellOutlined,
  FundViewOutlined,
  AlignCenterOutlined
} from "@ant-design/icons";
import PendingActions from "../../icons/PendingActions";
import './SideBar.css'
import api from "../../api/baseUrl";
import { use } from "react";
import axios from "axios";

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
    username: ""
  });
  const [role , setRole] = useState()
  const [isStudent , setIsStudent] = useState();
  const [isTeacher , setIsTeacher] = useState();
  const [isAdmin , setIsAdmin] = useState();
  const [isTeacherVerified,setIsTeacherVerified] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  

  useEffect(() => {
    const pathToKey = {
      "/AdminStats": "1",
      "/UserValidation": "2",
      "/Manage": "3",
      "/history": "5",  // Added history route
    };
    setSelectedMenuItem(pathToKey[location.pathname] || "1");
  }, [location.pathname]);


  const getCurrentUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please log in again.");
      return;
    }
  
    try {
      const response = await api.get("/auth/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      
  
      if (response.data.success) {
        const user = response.data.user;
        setIsAdmin(user.isAdmin);
        setIsStudent(user.isStudent);
        setIsTeacher(user.isTeacher);
        setIsTeacherVerified(user.isTeacherVerified)
        setUserData({
          avatarUrl: user.avatarUrl || DEFAULT_AVATAR,
          username: user.name,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Unauthorized. Please log in again.");
      } else if (error.response && error.response.status === 500) {
        message.error("Server error. Please try again later.");
      } else {
        message.error("Error fetching user data. Please check your connection.");
      }
    }
  };
  

  const handleLogout = async () => {
    try {

      localStorage.removeItem('token')
      setUserData({
        avatarUrl: DEFAULT_AVATAR,
        username: "",
      });
      
      navigate("/");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  useEffect(()=>{
    getCurrentUserDetails()
  },[])

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
          {isStudent ? (
            <div className="teacher-dashboard">
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PendingActions />}>
                <Link to="/history">History</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<PoweroffOutlined />} onClick={handleLogout}>
                Log Out
              </Menu.Item>
            </div>
          ) : isTeacher ? (
            (
              <div className="student-dashboard">
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                  <Link to="/teacher-analytic">Dashboard</Link>
                </Menu.Item>
                   {isTeacherVerified ? (
                     <div>
                      <Menu.Item key="2" icon={<PendingActions />}>
                    <Link to="/create-course">Create Course</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<AlignCenterOutlined />}>
                    <Link to="/enroll-student">Enrolled Students</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<FundViewOutlined />}>
                    <Link to="/created-all-course">View Courses</Link>
                  </Menu.Item>
                     </div>
                   ):("")}
                <Menu.Item key="5" icon={<PoweroffOutlined />} onClick={handleLogout}>
                  Log Out
                </Menu.Item>
              </div>
            )
          ): isAdmin ? (
              (
                <div className="student-dashboard">
                  <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/analytic">Dashboard</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<AlignCenterOutlined />}>
                    <Link to="/manage-teachers">Manage Teachers</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<FundViewOutlined />}>
                    <Link to="/manage-course">Manage Course</Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<PoweroffOutlined />} onClick={handleLogout}>
                    Log Out
                  </Menu.Item>
                </div>
            ) 
          ):("")
          }

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
