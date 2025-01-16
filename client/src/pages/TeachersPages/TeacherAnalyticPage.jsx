import React, { useState } from 'react';
import { Card, Row, Col, Progress, Tabs, Typography, Select, Tooltip } from 'antd';
import { BookOutlined, ExperimentOutlined, FieldTimeOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import SideBar from '../../components/DashboardSideBar/SideBar';
import { Line, Bar, Doughnut } from "react-chartjs-2";
// import './TeacherAnalyticPage.css'
import CourseProgressChart from '../../components/CourseProgressChart/CourseProgressChart';


const { Title } = Typography;
const { Option } = Select;

const TeacherAnalyticPage = () => {
  const stats = {
    coursesProgress: 3,
    activeAssignments: 7,
    totalHours: '3h 15m',
  };

  return (
    <SideBar>
      <div className="p-6">
        <Title level={4}>Learning Dashboard</Title>
        
        <Title level={5} className="mt-6">OVERVIEW</Title>
        <Row gutter={[20, 20]} className="mb-8" style={{marginBottom:"5%"}}>
          <Col xs={12} md={8} sm={6}>
            <Card>
              <div className="text-center">
              <TeamOutlined className="text-blue-500 text-xl mb-2" />
                <div className="text-2xl font-bold">{stats.coursesProgress}</div>
                <div className="text-gray-500">Number Of Teachers</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={8} sm={6}>
            <Card>
              <div className="text-center">
                <ExperimentOutlined className="text-blue-500 text-xl mb-2" />
                <div className="text-2xl font-bold">{stats.activeAssignments}</div>
                <div className="text-gray-500">Pending Role Approve</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={8} sm={6}>
            <Card>
              <div className="text-center">
              <TeamOutlined className="text-blue-500 text-xl mb-2" />
                <div className="text-2xl font-bold">{stats.totalHours}</div>
                <div className="text-gray-500">Number Of Students</div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={16}>
            
                <CourseProgressChart/>
             
          </Col>
        <Col xs={24} md={8}>
            <Card 
              title={
                <span>
                  USERS PROGRESS 
                  <Tooltip title="Overall progress across system">
                    <InfoCircleOutlined className="ml-2" />
                  </Tooltip>
                </span>
              }
            >
              <div className="text-center">
                <Progress
                  type="dashboard"
                  percent={45}
                  success={{ percent: 80 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </SideBar>
  );
};

export default TeacherAnalyticPage;