import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Rate,
  Typography,
  Divider,
  Space,
  Tag,
  message,
  Form,
  Input,
  List,
  Avatar,
} from 'antd';
import {
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import api from '../api/baseUrl';
import img from '../assets/ui-ux.webp'
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SingleCoursePage = ({ course }) => {
  const [userId, setUserId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const [overallRatings , setOverallRatings] = useState(0);
  const navigate = useNavigate()

  console.log(course);
  
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

  const handleReviewSubmit = async (values) => {
    try {
      const response = await api.post('/courses/review', {
        course_id: courseData._id,
        user_id: userId,
        ratings: values.rating,
        review: values.comment,
      });
      setOverallRatings(response.data.data.overallRatings);
      setReviews(response.data.data.reviews)
      message.success('Review submitted successfully!');
      navigate('/')
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit review');
    }
  };


  const sampleCourse = {
    title: 'Web Development Bootcamp',
    description: 'Learn web development from scratch with this comprehensive course. This bootcamp covers everything from HTML and CSS basics to advanced JavaScript frameworks. You will learn modern web development practices, responsive design, and how to build full-stack applications. The course includes hands-on projects and real-world examples to help you master web development skills.',
    imgLink: img,
    price: 49.99,
    duration: '8 weeks',
    ratings: 4.5,
    totalRatings: 128,
    enrolledStudents: 350,
    instructor: 'John Doe',
    level: 'Intermediate',
    language: 'English'
  };

  const courseData = course || sampleCourse;

  const handleEnroll = async () => {
    try {
      const response = await api.post("/enroll-courses/enroll", {
        course_id: courseData._id,
        student_id: userId,
      });
      window.location.reload();
      localStorage.setItem("success", response.data.success);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleUnEnroll = async () => {
    try {
      const response = await api.post("/enroll-courses/unenroll", {
        course_id: courseData._id,
        student_id: userId,
      });
      message.success("Un Enrolled Successfully");
      localStorage.removeItem('success');
      window.location.reload();
    } catch (error) {
      message.error("Have an error when UnEnrolling");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const ReviewForm = () => (
    <Form
      form={form}
      onFinish={handleReviewSubmit}
      layout="vertical"
      className="mt-4"
    >
      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: 'Please rate the course' }]}
      >
        <Rate allowHalf />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Your Review"
        rules={[{ required: true, message: 'Please write your review' }]}
      >
        <TextArea rows={4} placeholder="Share your experience with this course..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Fixed Left Image Section */}
        <div className="p-4">
          <div>
            <img
              src={courseData.imgLink}
              alt={courseData.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
              style={{ width: "100%",height:"500px" }}
            />
            
            {/* Course Stats - Below Image */}
            <div className="mt-4">
              <Space direction="vertical" className="w-full">
                <div className="flex justify-between items-center">
                  <Rate
                    disabled
                    defaultValue={courseData.overallRatings}
                    allowHalf
                    className="text-sm"
                  />
                  <Text className="text-gray-600">
                    ({courseData.overallRatings} ratings)
                  </Text>
                </div>
                <Space className="mt-2" wrap>
                  <Tag color="green">English</Tag>
                </Space>
              </Space>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 lg:ml-[33.333333%] p-4">
          <Card className="shadow-lg">
            {/* Course Details Section */}
            <div className="space-y-6">
              <div>
                <Title level={2} className="mb-4">
                  {courseData.title}
                </Title>

                <Space direction="vertical" className="w-full" size="large">
                  <div className="flex items-center gap-3">
                    <UserOutlined className="text-blue-500 text-xl" />
                    <Text className="text-gray-700">
                      {courseData.enrolledStudents.length} students enrolled
                    </Text>
                  </div>

                  <div className="flex items-center gap-3">
                    <ClockCircleOutlined className="text-blue-500 text-xl" />
                    <Text className="text-gray-700">
                      Duration: {courseData.duration}
                    </Text>
                  </div>

                  <div className="flex items-center gap-3">
                    <UserOutlined className="text-blue-500 text-xl" />
                    <Text className="text-gray-700">
                      Instructor: {courseData.instructor}
                    </Text>
                  </div>
                </Space>
              </div>

              <Divider className="my-6" />

              {/* Price and Enroll Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarOutlined className="text-green-500 text-2xl" />
                  <Title level={2} className="mb-0 text-green-500">
                    ${courseData.price}
                  </Title>
                </div>
                {localStorage.getItem("success") ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleUnEnroll}
                    className="bg-blue-500 hover:bg-blue-600 h-12 px-8 text-lg font-medium"
                  >
                    UnEnroll
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleEnroll}
                    className="bg-blue-500 hover:bg-blue-600 h-12 px-8 text-lg font-medium"
                  >
                    Enroll Now
                  </Button>
                )}
              </div>

              {/* Course Description Section */}
              <Divider className="my-8" />
              <div className="space-y-4">
                <Title level={3}>Course Description</Title>
                <Text className="text-gray-600 text-base leading-relaxed block">
                  {courseData.description}
                </Text>
              </div>

              {/* Reviews Section */}
              <Divider className="my-8" />
              <div className="space-y-4">
                <Title level={3} className="flex items-center gap-2">
                  <CommentOutlined /> Course Reviews
                </Title>
                
                {/* Review Form */}
                {localStorage.getItem("success") && <ReviewForm />}

                {/* Reviews List */}
                {/* <List
                  itemLayout="horizontal"
                  dataSource={reviews}
                  renderItem={review => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={
                          <Space>
                            <Text strong>{review.userName}</Text>
                            <Rate disabled defaultValue={review.rating} />
                          </Space>
                        }
                        description={
                          <Paragraph className="text-gray-600">
                            {review.comment}
                          </Paragraph>
                        }
                      />
                    </List.Item>
                  )}
                /> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleCoursePage;