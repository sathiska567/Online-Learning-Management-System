import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/DashboardSideBar/SideBar';
import { Button, message, Space, Table } from 'antd';
import api from '../../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

export default function ManageCourseApprove() {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  const handleFetchCourseDetails = async () => {
    try {
      const response = await api.get("/courses/allCourse");
      console.log(response);
      
      if (response.data.success) {
        setCourseData(response.data.response);
      }

    } catch (error) {
      message.error("Error while fetching course details");
    }
  };

  const handleApprove = async (record) => {
    try {
      console.log(record);
      
      const response = await api.post("/admin/approveCourses", {
        course_id: record._id,
        isApproved: true
      });

      console.log(response);
      

      if (response.data.success) {
        message.success("Course approved successfully");
        setCourseData((prevData) =>
          prevData.map((course) =>
            course._id === record._id
              ? { ...course, isApprove: true }
              : course
          )
        );
      }
    } catch (error) {
      message.error("Error while approving course");
    }
  };

  const handleDelete = async (record) => {
        try {
          const response = await api.post("/admin/removeApproval", {
            course_id: record._id,
            isApproved: false
          })

          // console.log(response);
          message.success("Course removed successfully");
          window.location.reload();
          
        } catch (error) {
          message.error("Error while deleting course");
        }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
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
          {record.isApprove ? (
            <Button
              disabled
              style={{ backgroundColor: '#52c41a', color: 'white', border: 'none' }}
            >
              Approved
            </Button>
          ) : (
            <Button
              onClick={() => handleApprove(record)}
              style={{ backgroundColor: '#1890ff', color: 'white', border: 'none' }}
            >
              Approve
            </Button>
          )}
          <Button
          onClick={()=>handleDelete(record)}
            style={{ backgroundColor: '#f5222d', color: 'white', border: 'none' }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleFetchCourseDetails();
  }, []);

  return (
    <SideBar>
      <Table columns={columns} dataSource={courseData} rowKey="_id" />
    </SideBar>
  );
}
