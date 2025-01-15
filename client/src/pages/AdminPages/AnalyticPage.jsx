import React, { useState } from 'react';
import { Card, Row, Col, Progress, Tabs, Typography, Select, Tooltip } from 'antd';
import { BookOutlined, ExperimentOutlined, FieldTimeOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import SideBar from '../../components/DashboardSideBar/SideBar';
import { Line, Bar, Doughnut } from "react-chartjs-2";
import './AnalyticPage.css'


const { Title } = Typography;
const { Option } = Select;

const AnalyticPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Enhanced weekly study data
  const studyData = {
    week: [
      { day: 'SAT', studyTime: 20, assignments: 2, quizzes: 1 },
      { day: 'SUN', studyTime: 65, assignments: 4, quizzes: 2 },
      { day: 'MON', studyTime: 45, assignments: 3, quizzes: 1 },
      { day: 'TUE', studyTime: 50, assignments: 3, quizzes: 2 },
      { day: 'WED', studyTime: 80, assignments: 5, quizzes: 3 },
      { day: 'THU', studyTime: 40, assignments: 2, quizzes: 1 },
      { day: 'FRI', studyTime: 40, assignments: 2, quizzes: 2 }
    ],
    month: [
      { day: 'Week 1', studyTime: 45, assignments: 12, quizzes: 8 },
      { day: 'Week 2', studyTime: 60, assignments: 15, quizzes: 10 },
      { day: 'Week 3', studyTime: 75, assignments: 18, quizzes: 12 },
      { day: 'Week 4', studyTime: 55, assignments: 14, quizzes: 9 }
    ]
  };

  const courses = [
    {
      title: 'Advanced Web Development',
      progress: 75,
      color: '#B39DDB',
      completed: '15/20 modules',
      deadline: '2 weeks left'
    },
    {
      title: 'Data Structures & Algorithms',
      progress: 60,
      color: '#90CAF9',
      completed: '12/20 modules',
      deadline: '3 weeks left'
    },
    {
      title: 'Machine Learning Basics',
      progress: 45,
      color: '#80DEEA',
      completed: '9/20 modules',
      deadline: '4 weeks left'
    }
  ];

  const stats = {
    coursesProgress: 3,
    activeAssignments: 7,
    totalHours: '3h 15m',
    score: 240
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
             
          </Col>
        <Col xs={24} md={8}>
            <Card 
              title={
                <span>
                  LEARNING PROGRESS 
                  <Tooltip title="Overall progress across all courses">
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
                <div className="mt-4">
                  <span className="mr-4">Completed</span>
                  <span> | </span>
                  <span className="ml-4">In Progress</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </SideBar>
  );
};

export default AnalyticPage;