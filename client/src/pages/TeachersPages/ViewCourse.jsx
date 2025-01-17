import React, { useEffect, useState } from 'react';
import SideBar from '../../components/DashboardSideBar/SideBar';
import { Button, message, Space, Table , Spin } from 'antd';
import api from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

export default function ViewCourse() {
  const [createdCourse, setCreatedCourse] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  

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

      if (response.data.success) {
        const coursesWithKeys = response.data.data.map((course) => ({
          ...course,
          key: course.id || course._id, // Use a unique identifier from data
        }));
        setCreatedCourse(coursesWithKeys);
      }
    } catch (error) {
      message.error('Something went wrong in fetching course data');
      console.error('Error fetching courses:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Fetch courses after userId is updated
  useEffect(() => {
    if (userId) {
      getCreateAllCourse();
    }
  }, [userId]); // This effect runs only when userId is updated

  const handleView = (record) => {
    navigate("/view-course",{state:{data:record}})
    // message.info(`Viewing course: ${record.title}`);
  };

  const handleDelete = async (record) => {
    try {
      console.log(record.key);
      const deleteResponse = await api.post("/courses/delete",{id:record.key})
      console.log(deleteResponse);
      if (deleteResponse.data.success) {
        message.success('Course deleted successfully');
        getCreateAllCourse();
      }

    } catch (error) {
      message.error('Failed to delete course');
      console.error('Error deleting course:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleView(record)}
            style={{ backgroundColor: '#1890ff', color: 'white', border: 'none' }}
          >
            View
          </Button>
          <Button
            onClick={() => handleDelete(record)}
            style={{ backgroundColor: '#f5222d', color: 'white', border: 'none' }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <SideBar>
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
      ):(
        <Table columns={columns} dataSource={createdCourse} />
      )}
    </SideBar>
  );
}
