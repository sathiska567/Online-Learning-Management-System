import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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

       const response = await api.post('/auth/register',{name:values.name,email:values.email,password:values.password,role:values.role})
        // console.log(response);

       if(response.data.success){
        message.success('Registration successful');
        navigate('/login')
       }

    } catch (error) {
      message.error('Failed to Register. Please Check Email and Password.');
    }
  };

  const PasswordStatusList = ({ value }) => (
    <div style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
      <p style={{ margin: '4px 0' }}>Password must contain:</p>
      <ul style={{ listStyle: 'none', padding: '0 0 0 16px', margin: 0 }}>
        <li style={{ color: value?.length >= 8 ? '#52c41a' : '#8c8c8c' }}>
          ✓ At least 8 characters
        </li>
        <li style={{ color: /[A-Z]/.test(value) ? '#52c41a' : '#8c8c8c' }}>
          ✓ One uppercase letter
        </li>
        <li style={{ color: /[0-9]/.test(value) ? '#52c41a' : '#8c8c8c' }}>
          ✓ One number
        </li>
        <li style={{ color: /[!@#$%^&*]/.test(value) ? '#52c41a' : '#8c8c8c' }}>
          ✓ One special character (!@#$%^&*)
        </li>
      </ul>
    </div>
  );

  const roleOptions = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' }
  ];

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
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: 'Full name is required' },
                { min: 2, message: 'Name must be at least 2 characters long' },
                { pattern: /^[a-zA-Z\s]*$/, message: 'Name can only contain letters and spaces' }
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input placeholder="name@example.com" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                { required: true, message: 'Please select your role' }
              ]}
            >
              <Select
                placeholder="Select your role"
                options={roleOptions}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => (
                <PasswordStatusList value={getFieldValue('password')} />
              )}
            </Form.Item>

            <Form.Item style={{ marginTop: '1.5rem' }}>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
              <span style={{ color: '#8c8c8c' }}>Already have an account? </span>
              <a href="/login" style={{ textDecoration: 'none' }}>
                Login here
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

export default RegisterPage;