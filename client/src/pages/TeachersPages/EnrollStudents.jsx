import React, { useEffect, useState } from 'react';
import SideBar from '../../components/DashboardSideBar/SideBar';
import { message, Table, Spin } from 'antd';
import api from '../../api/baseUrl';

export default function EnrollStudents() {
  const [enrollStudentData, setEnrollStudentData] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error("No authentication token found!");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/getCurrentUser', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUserId(response.data.user._id);
      } else {
        message.error(response.data.message || "Failed to fetch user details");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Error fetching user data");
    }
  };

  const getEnrollStudentDetails = async () => {
    if (!userId) return;

    try {
      const response = await api.post('/enroll-courses/enroll-students', { teacher_id: userId });

      if (response.data.success) {
        console.log("Fetched Data:", response.data.data);
        setEnrollStudentData(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Something went wrong while fetching course data");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getEnrollStudentDetails();
    }
  }, [userId]);

  const formattedData = enrollStudentData.map(({ studentInfo, enrolledCourses }) => ({
    key: studentInfo._id,
    name: studentInfo.name,
    email: studentInfo.email,
    createdAt: studentInfo.createdAt,
    enrolledCourses, 
  }));

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Created At', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString() 
    },
    {
      title: 'Enrolled Courses',
      dataIndex: 'enrolledCourses',
      key: 'enrolledCourses',
      render: (courses) => (
        <ul>
          {courses.map((course) => (
            <li key={course.courseId}>
              {course.courseName}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <SideBar>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
      ) : (
        <Table columns={columns} dataSource={formattedData} rowKey="key" />
      )}
    </SideBar>
  );
}
