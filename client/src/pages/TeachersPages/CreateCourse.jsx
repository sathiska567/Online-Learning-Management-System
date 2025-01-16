import React, { useState } from 'react';
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

  // Categories for the select dropdown
  const categories = [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Marketing',
    'Other'
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Convert price to number
      values.price = parseFloat(values.price);
      
      // Add default values
      values.enrolledStudents = [];
      values.ratings = 0;
      values.reviews = [];
      values.createdAt = new Date();
      values.updatedAt = new Date();

      console.log('Form values:', values);

      const courseImage = values.imgLink.fileList[0].originFileObj;
      // console.log(values.title);
      
      const formData = new FormData();
      formData.append('image', courseImage);
      formData.append("title",values.title)
      formData.append("description",values.description)
      formData.append("category",values.category)
      formData.append("price",values.price)
      formData.append("instructorName",values.instructor)
      formData.append("duration",values.duration)

      const response = await api.post("/courses/create",formData)
      console.log(response);
      
      message.success('Course created successfully!');

      // form.resetFields();
    } catch (error) {
      message.error('Failed to create course');
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