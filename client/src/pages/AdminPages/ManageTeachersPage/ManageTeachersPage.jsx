import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/DashboardSideBar/SideBar';
import { Button, message, Space, Table } from 'antd';
import api from '../../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

export default function ManageTeachersPage() {
  const [TeacherData, setTeacherData] = useState([]);
  const navigate = useNavigate();

  const handleFetchTeacherDetails = async () => {
    try {
      const response = await api.get("/auth/allTeacherDetails");
      
      if (response.data.success) {
        setTeacherData(response.data.data);
      }
    } catch (error) {
      message.error("Error while fetching teacher details");
    }
  };

  const handleApprove = async (record) => {
    try {
      const response = await api.post("/admin/approveTeacherRole", {
        user_id: record._id,
        isTeacherVerified: true
      });

      if (response.data.success) {
        message.success("Teacher approved successfully");
        setTeacherData((prevData) =>
          prevData.map((teacher) =>
            teacher._id === record._id
              ? { ...teacher, isTeacherVerified: true }
              : teacher
          )
        );
      }
    } catch (error) {
      message.error("Error while approving teacher");
    }
  };

  const handleDelete = async (record) => {
        try {
          console.log(record);
          
          const response = await api.post("/admin/approveTeacherRole", {
                user_id: record._id,
                isTeacherVerified: false
              });
 
         if(response.data.success){
                window.location.reload();
            message.success("User Delete Successfully")
         }
         
                
        } catch (error) {
          message.error("Error while deleting teacher");
        }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
          {record.isTeacherVerified ? (
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
    handleFetchTeacherDetails();
  }, []);

  return (
    <SideBar>
      <Table columns={columns} dataSource={TeacherData} rowKey="_id" />
    </SideBar>
  );
}
