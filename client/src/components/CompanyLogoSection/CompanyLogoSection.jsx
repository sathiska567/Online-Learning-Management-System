import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import Airbnb from '../../assets/Airbnb.png'
import Amazon from '../../assets/Amazon.png'
import Fiverr from '../../assets/Fiverr.png'
import GettyImages from '../../assets/GettyImages.jpg'
import Wish from '../../assets/Wish.webp'

const { Title } = Typography;

const CompanyLogoSection = () => {
  const companies = [
    {
      name: 'Airbnb',
      logo: Airbnb,
    },
    {
      name: 'Getty Images',
      logo: GettyImages,
    },
    {
      name: 'Amazon',
      logo: Amazon,
    },
    {
      name: 'Fiverr',
      logo: Fiverr,
    },
    {
      name: 'Wish',
      logo: Wish,
    },
    {
      name: 'Fiverr',
      logo: Fiverr,
    },
  ];

  return (
    <Card
      style={{
        maxWidth: '1024px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '24px',
      }}
      bordered={false}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={4} style={{ color: '#555' }}>
          Join the 2000+ companies we're already learning with
        </Title>
      </div>

      <Row
        gutter={[24, 24]}
        justify="center"
        align="middle"
      >
        {companies.map((company) => (
          <Col
            key={company.name}
            xs={12}
            sm={8}
            md={6}
            style={{ textAlign: 'center' }}
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              style={{
                height: '40px',
                objectFit: 'contain',
                opacity: 0.7,
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CompanyLogoSection;
