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
import { useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const ViewCourseDetails = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const courseData = location.state?.data || {};

  const categories = [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Marketing',
    'Other'
  ];

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/auth/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response.data.user._id);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
        console.log(values);
        
    setLoading(true);
    try {
      values.price = parseFloat(values.price);
      
      // Handle image upload only if a new image is selected
      let imageUrl = courseData.imgLink; 
      
      if (values.imgLink?.fileList?.[0]?.originFileObj) {
        const courseImage = values.imgLink.fileList[0].originFileObj;
        const formData = new FormData();
        formData.append('file', courseImage);
        formData.append('upload_preset', 'onlineLearn');
        formData.append('folder', 'courses');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dov8hd3v6/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to upload image to Cloudinary: ${errorData.error.message}`
          );
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const coursePayload = {
        id: courseData._id,
        title: values.title,
        description: values.description,
        imgLink: imageUrl,
        price: values.price,
        duration: values.duration,
        instructor: values.instructor,
        category: values.category,
        reviews: courseData.reviews || [],
        ratings: courseData.ratings || 0,
        enrolledStudents: courseData.enrolledStudents || [],
      };

      console.log(coursePayload);
      

      // Uncomment and modify based on whether it's create or update
      const response = await api.post('courses/update', coursePayload);
      
      message.success('Course update successfully!');
      navigate('/created-all-course')
    } catch (error) {
      message.error(`Failed to save course: ${error.message}`);
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
    maxCount: 1,
  };

  useEffect(() => {
    getCurrentUser();
    
    // Initialize form with existing data
    if (courseData) {
      form.setFieldsValue({
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        price: courseData.price,
        duration: courseData.duration,
        instructor: courseData.instructor,
      });
    }
  }, [form, courseData]);

  return (
    <SideBar>
      <Card className="max-w-4xl mx-auto p-6">
        <Title level={2} className="text-center mb-8">
          {courseData.title ? 'Edit Course' : 'Create New Course'}
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: 'Please enter course title' }]}
          >
            <Input 
              placeholder="Enter course title" 
            />
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
            <Upload
              {...uploadProps}
              listType="picture"
              defaultFileList={courseData.imgLink ? [{
                uid: '-1',
                name: 'Current Image',
                status: 'done',
                url: courseData.imgLink,
              }] : []}
            >
              <Button icon={<UploadOutlined />}>
                {courseData.imgLink ? 'Change Image' : 'Upload Image'}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
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
              className="w-full"
              placeholder="Enter course price"
              prefix="$"
              step={0.01}
            />
          </Form.Item>

          <Form.Item
            name="instructor"
            label="Instructor Name"
            rules={[{ required: true, message: 'Please enter instructor name' }]}
          >
            <Input placeholder="Enter instructor name" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Course Duration"
            rules={[{ required: true, message: 'Please enter course duration' }]}
          >
            <Input placeholder="e.g., 8 weeks, 24 hours" />
          </Form.Item>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-10"
            >
              {courseData.title ? 'Update Course' : 'Create Course'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SideBar>
  );
};

export default ViewCourseDetails;