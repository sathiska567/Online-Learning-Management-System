import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Card,
  Typography
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SideBar from '../../components/DashboardSideBar/SideBar';
import api from '../../api/baseUrl';

const { Title } = Typography;
const { TextArea } = Input;

const CreateCourse = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userId , setUserId] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Marketing',
    'Other'
  ];

  const getCurrentUser = async()=>{
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/auth/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      setUserId(response.data.user._id)
      
    } catch (error) {
       message.error(error.message)
    }
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Convert price to number
      values.price = parseFloat(values.price);
  
      values.enrolledStudents = [];
      values.ratings = 0;
      values.reviews = [];
      values.createdAt = new Date();
      values.updatedAt = new Date();
  
      console.log('Form values:', values);
  
      const courseImage = values?.imgLink?.fileList?.[0]?.originFileObj;
      if (!courseImage) {
        throw new Error('Image file is missing.');
      }
  
      const formData = new FormData();
      formData.append('file', courseImage);
      formData.append('upload_preset', 'onlineLearn'); // my preset
      formData.append('folder', 'courses');
  
      console.log('Uploading to Cloudinary...');
  
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dov8hd3v6/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary Error:', errorData);
        throw new Error(
          `Failed to upload image to Cloudinary: ${errorData.error.message}`
        );
      }
  
      const data = await response.json();
      console.log('Cloudinary Response:', data);
  
      const imageUrl = data.secure_url;
  
      values.imgLink = imageUrl;
  
      console.log('Final course values:', values);
  
      const courseCreateResponse = await api.post('/courses/create', {
        teacherId: userId,
        title: values.title,
        description: values.description,
        imgLink: values.imgLink,
        price: values.price,
        duration: values.duration,
        instructor: values.instructor,
        category: values.category,
        reviews: [],
        ratings: 0,
        enrolledStudents: [],
      });
  
      if (courseCreateResponse.data.success) {
        message.success('Course created successfully!');
        form.resetFields(); // Clear the input fields
      } else {
        message.error('Course creation failed!');
      }
    } catch (error) {
      message.error(`Failed to create course: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return false;
    },
    onChange: (info) => {
      console.log(info.file);
    },
  };

  useEffect(()=>{
    getCurrentUser()
  },[])

  return (
     <SideBar>
        <Card style={{ maxWidth: 1000, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Create New Course
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true, message: 'Please enter course title' }]}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter course description' }]}
        >
          <TextArea
            placeholder="Enter course description"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="imgLink"
          label="Course Image"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Course Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
        >
          <Select placeholder="Select course category">
            {categories.map(category => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter course price' },
            { type: 'number', min: 0, message: 'Price must be greater than or equal to 0' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter course price"
            prefix="$"
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="instructor"
          label="Instructor Name"
        >
          <Input placeholder="Enter instructor name" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Course Duration"
        >
          <Input placeholder="e.g., 8 weeks, 24 hours" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: '100%' }}
          >
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </Card>
     </SideBar>
  );
};

export default CreateCourse;