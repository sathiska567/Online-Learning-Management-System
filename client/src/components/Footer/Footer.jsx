import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { InstagramOutlined, TwitterOutlined, YoutubeOutlined, GlobalOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const WebsiteFooter = () => {
  const footerStyle = {
    backgroundColor: '#0B4B3C',
    padding: '48px 24px 24px',
    color: 'white',
    height:"55vh"
  };

  const columnStyle = {
    marginBottom: '24px',
  };

  const titleStyle = {
    color: 'white',
    marginBottom: '16px',
    fontSize: '18px',
  };

  const textStyle = {
    color: '#B3B3B3',
    display: 'block',
    marginBottom: '12px',
  };

  const socialIconStyle = {
    color: 'white',
    fontSize: '20px',
    marginRight: '16px',
  };

  const copyrightStyle = {
    color: '#B3B3B3',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '24px',
    marginTop: '24px',
  };

  return (
    <Footer style={footerStyle}>
      <Row gutter={[48, 24]}>
        <Col xs={24} sm={24} md={8} style={columnStyle}>
          <Title level={4} style={titleStyle}>EduSphere</Title>
          <Text style={textStyle}>
            Join now to receive personalized recommendations from the full Coursera catalog.
          </Text>
          <Space>
            <Link href="#" target="_blank">
              <InstagramOutlined style={socialIconStyle} />
            </Link>
            <Link href="#" target="_blank">
              <GlobalOutlined style={socialIconStyle} />
            </Link>
            <Link href="#" target="_blank">
              <TwitterOutlined style={socialIconStyle} />
            </Link>
            <Link href="#" target="_blank">
              <YoutubeOutlined style={socialIconStyle} />
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8} style={columnStyle}>
          <Title level={4} style={titleStyle}>Company</Title>
          <Link href="/about" style={textStyle}>About us</Link>
          <Link href="/blog" style={textStyle}>Blog</Link>
          <Link href="/contact" style={textStyle}>Contact us</Link>
          <Link href="/pricing" style={textStyle}>Pricing</Link>
          <Link href="/testimonials" style={textStyle}>Testimonials</Link>
        </Col>

        <Col xs={24} sm={12} md={8} style={columnStyle}>
          <Title level={4} style={titleStyle}>Support</Title>
          <Link href="/help" style={textStyle}>Help center</Link>
          <Link href="/terms" style={textStyle}>Terms of service</Link>
          <Link href="/legal" style={textStyle}>Legal</Link>
          <Link href="/privacy" style={textStyle}>Privacy policy</Link>
          <Link href="/status" style={textStyle}>Status</Link>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Text style={copyrightStyle}>
            Designed by@Sathiska, 2023, All rights reserved
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default WebsiteFooter;