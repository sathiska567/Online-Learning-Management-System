import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import api from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject('Password is required');
    }
    if (value.length < 8) {
      return Promise.reject('Password must be at least 8 characters long');
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return Promise.reject('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*[0-9])/.test(value)) {
      return Promise.reject('Password must contain at least one number');
    }
    if (!/(?=.*[!@#$%^&*])/.test(value)) {
      return Promise.reject('Password must contain at least one special character (!@#$%^&*)');
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      console.log('Form submitted:', values);

      const response = await api.post("/auth/login",{email:values.email,password:values.password});
      console.log(response);

      if(response.data.success){
        localStorage.setItem("token",response.data.data.token);
        message.success('Login successful');
         if(response.data.data.user.isAdmin){
          navigate("/analytic")
         }
        else if(response.data.data.user.isStudent){
          navigate("/")
        }
        else if(response.data.data.user.isTeacher){
          navigate("/")
        }
        // window.location.reload()
        // navigate("/dashboard")
      }


    } catch (error) {
      message.error('Failed to Register. Please Check Email and Password.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      width: "100%",
    }}>
      <div style={{ 
        width: "100%", 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ 
            fontWeight: 'bold', 
            marginBottom: '2rem'
          }}>EduSphere</h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="name@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <a href="/forgot-password">Forgotten Password</a>

            <Form.Item style={{ marginTop: '1.5rem' }}>
              <Button type="primary" htmlType="submit" block>
                Sign In
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
              <span style={{ color: '#8c8c8c' }}>Don't have an account? </span>
              <a href="/register" style={{ textDecoration: 'none' }}>
                Register
              </a>
            </div>
          </Form>
        </div>
      </div>

      <div style={{
        flex: '0 0 60%',
        backgroundImage: `url('https://quickcampus.online/blog/wp-content/uploads/2023/12/blog2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "100vh"
      }} />
    </div>
  );
};

export default LoginPage;