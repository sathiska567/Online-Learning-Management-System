import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Input, Button, Layout, Menu, Row, Col } from 'antd';
import { SearchOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../../api/baseUrl';

const { Header } = Layout;

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isStudent , setIsStudent] = useState(false);
  const [isTeacher , setIsTeacher] = useState(false);
  const [search , setSearch] = useState('');

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      message.error("No authentication token found!");
      return;
    }

  try {
      const response = await api.get('/auth/getCurrentUser', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);

      if (response.data.success) {
        setIsStudent(response.data.user.isStudent);
        setIsTeacher(response.data.user.isTeacher);

      } else {
        message.error(response.data.message || "Failed to fetch user details");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Error fetching user data");
    }
  };

  const handleLoginNavigate = () => {
    try {
      navigate('/login');
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleRegisterNavigate = () => {
    try {
      navigate('/register');
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDashBoardNavigate = () => {
    try {
      if(isStudent){
        navigate('/dashboard');
      }
      if(isTeacher){
        navigate('/teacher-analytic');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSearch = async () => {
    console.log("Search Query:", search);
    try {
      const recommendationCourse = await api.post("/recommendation/course",{interests:search})
      // console.log(recommendationCourse);
      setSearchQuery(recommendationCourse)
      
    } catch (error) {
       message.error(error.message);
    }
  };


  useEffect(()=>{
    if(localStorage.getItem('token')){
      getCurrentUser()
    }
  },[])

  return (
    <Header style={{ backgroundColor: '#001529', padding: '0 20px' }}>
      <Row align="middle" justify="space-between">
        {/* Logo */}
        <Col>
          <div
            style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
             📚 <span style={{ marginLeft: '10px' }}>EduSphere</span>
          </div>
        </Col>

        {/* Search Bar */}
        <Col xs={24} sm={12} md={10} lg={8}>
          <Input
            placeholder="Search here..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleSearch}
            style={{ borderRadius: '5px' }}
          />
        </Col>

        {/* Auth Buttons */}
        <Col>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={handleLoginNavigate} type="default">
              Sign In
            </Button>
            <Button onClick={handleRegisterNavigate} type="primary">
              Register
            </Button>
            {isStudent ? (
              <Button onClick={handleDashBoardNavigate} type="primary" danger icon={<DashboardOutlined />}>
              Student DashBoard
            </Button>
            ):isTeacher ? (
              <Button onClick={handleDashBoardNavigate} type="default" icon={<DashboardOutlined />}>
              Teacher DashBoard
            </Button>
            ):(
              " "
            )}
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
