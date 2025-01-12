import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Input, Button, Layout, Menu, Row, Col } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header } = Layout;

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleLogOutNavigate = () => {
    try {
      localStorage.clear();
      message.success('Logout Successful');
      window.location.reload();
      navigate('/home');
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      message.warning('Please enter a search term.');
      return;
    }
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.data.items?.length > 0) {
        message.success('Search completed successfully!');
        console.log('Books found:', response.data.items);
      } else {
        message.warning('No results found for your search.');
      }
    } catch (error) {
      message.error('An error occurred during the search.');
      console.error(error);
    }
  };

  return (
    <Header style={{ backgroundColor: '#001529', padding: '0 20px' }}>
      <Row align="middle" justify="space-between">
        {/* Logo */}
        <Col>
          <div
            style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/home')}
          >
             📚 <span style={{ marginLeft: '10px' }}>EduSphere</span>
          </div>
        </Col>

        {/* Search Bar */}
        <Col xs={24} sm={12} md={10} lg={8}>
          <Input
            placeholder="Search here..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            <Button onClick={handleLogOutNavigate} type="primary" danger icon={<LogoutOutlined />}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
