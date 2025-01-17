import React from 'react';
import { Layout, Card, Input, Button, Form, Row, Col, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ContactUsPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Add form submission logic here
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ background: '#f0f2f5', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2}>Get in Touch</Title>
            <Paragraph style={{ maxWidth: '600px', margin: '0 auto' }}>
              Have questions about our programs? We're here to help! Reach out to us through any of the channels below or fill out the contact form.
            </Paragraph>
          </div>

          {/* Contact Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
            <Col xs={24} md={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <PhoneOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }} />
                  <Title level={4}>Call Us</Title>
                  <Text type="secondary">Mon-Fri: 9:00 AM - 6:00 PM</Text>
                  <br />
                  <Text type="primary">+94 798 1980</Text>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <MailOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }} />
                  <Title level={4}>Email Us</Title>
                  <Text type="secondary">We'll respond within 24 hours</Text>
                  <br />
                  <Text type="primary">sasindusathiska@gmail.com</Text>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <EnvironmentOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }} />
                  <Title level={4}>Visit Us</Title>
                  <Text type="secondary">123 Education Street</Text>
                  <br />
                  <Text type="secondary">Sri Lanka</Text>
                </div>
              </Card>
            </Col>
          </Row>
          
          {/* Operating Hours */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Space>
              <ClockCircleOutlined />
              <Text type="secondary">
                Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM 
              </Text>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ContactUsPage;