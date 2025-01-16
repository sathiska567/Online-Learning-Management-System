import React, { useEffect, useState } from 'react'; // Remove the duplicate import
import SideBar from '../../components/DashboardSideBar/SideBar'; // Ensure the path to SideBar is correct
import { Space, Table, Tag } from 'antd';

export default function EnrollStudents() {
  const [createdCourse, setCreatedCourse] = useState([]);
    const [userId, setUserId] = useState('');

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
      }
    };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>, // Optional: Add proper anchor behavior
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href="#">View</a>
          <a href="#">Delete</a> {/* Added href="#" for better accessibility */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
      getCurrentUser();
    }, []);
  
    // Fetch courses after userId is updated
    useEffect(() => {
      if (userId) {
        getCreateAllCourse();
      }
    }, [userId]);

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <SideBar>
      <Table columns={columns} dataSource={data} />
    </SideBar>
  );
}
