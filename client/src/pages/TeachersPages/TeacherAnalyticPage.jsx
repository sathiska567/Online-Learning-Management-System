import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Progress, Tabs, Typography, Select, Tooltip, message } from 'antd';
import { BookOutlined, ExperimentOutlined, FieldTimeOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import SideBar from '../../components/DashboardSideBar/SideBar';
import { Line, Bar, Doughnut } from "react-chartjs-2";
// import './TeacherAnalyticPage.css'
import CourseProgressChart from '../../components/CourseProgressChart/CourseProgressChart';
import api from '../../api/baseUrl';


const { Title } = Typography;
const { Option } = Select;


const TeacherAnalyticPage = () => {
  const [createdCourse, setCreatedCourse] = useState([]);
  const [userId, setUserId] = useState('');
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [numberOfTeachers , setNumberOfTeachers] = useState(0);
  const [numberOfStudents , setNumberOfStudents] = useState(0);

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get('/auth/getCurrentUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      setUserId(response.data.user._id);

    } catch (error) {
      message.error(error.response?.data?.message || 'Error fetching user data');
    }
  };

  // Fetch courses based on the teacher's userId
  const getCreateAllCourse = async () => {
    try {
      const response = await api.post('/courses/getCourse', { teacherId: userId });
      console.log(response);
      setNumberOfCourses(response.data.data.length);
      
    } catch (error) {
      message.error('Something went wrong in fetching course data');
      console.error('Error fetching courses:', error);
    }
  };

  const getAllTeachers = async()=>{
    try {
      const response = await api.get("/auth/allTeachers")
      console.log(response.data.studentData);
      
      setNumberOfTeachers(response.data.data)
      setNumberOfStudents(response.data.studentData)
      
    } catch (error) {
       message.error("Error Occur while fetching All Teachers")
    }
  }

  const stats = {
    coursesProgress: numberOfTeachers,
    activeAssignments:numberOfCourses,
    numberOfStudents:numberOfStudents,
  };

  useEffect(() => {
    getCurrentUser();
    getAllTeachers()
  }, []);

  // Fetch courses after userId is updated
  useEffect(() => {
    if (userId) {
      getCreateAllCourse();
    }
  }, [userId]);

  return (
    <SideBar>
      <div className="p-6">
        <Title level={4}>Learning Dashboard</Title>

        <Title level={5} className="mt-6">OVERVIEW</Title>
        <Row gutter={[20, 20]} className="mb-8" style={{ marginBottom: "5%" }}>
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
                <div className="text-gray-500">Number Of Created Course</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={8} sm={6}>
            <Card>
              <div className="text-center">
                <TeamOutlined className="text-blue-500 text-xl mb-2" />
                <div className="text-2xl font-bold">{stats.numberOfStudents}</div>
                <div className="text-gray-500">Number Of Students</div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={24} md={16}>

            <CourseProgressChart />

          </Col>
          <Col xs={24} md={8}>
            <Card
              title={
                <span>
                  USER COURSE PROGRESS
                  <Tooltip title="Overall progress across system">
                    <InfoCircleOutlined className="ml-2" />
                  </Tooltip>
                </span>
              }
            >
              <div className="text-center">
                <Progress
                  type="dashboard"
                  percent={numberOfCourses}
                  success={{ percent: numberOfCourses }}
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