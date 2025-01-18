import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import api from "../api/baseUrl";
import img from "../assets/ui-ux.webp";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SingleCoursePage = ({ course }) => {
  const [userId, setUserId] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const [overallRatings, setOverallRatings] = useState(0);
  const navigate = useNavigate();

  console.log(course);

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/auth/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserId(response.data.user._id);
      setEnrolledCourses(response.data.user.enrolledCourses || []);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleReviewSubmit = async (values) => {
    try {
      const response = await api.post("/courses/review", {
        course_id: courseData._id,
        user_id: userId,
        ratings: values.rating,
        review: values.comment,
      });
      setOverallRatings(response.data.data.overallRatings);
      setReviews(response.data.data.reviews);
      message.success("Review submitted successfully!");
      navigate("/");
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit review");
    }
  };

  const sampleCourse = {
    title: "Web Development Bootcamp",
    description:
      "Learn web development from scratch with this comprehensive course. This bootcamp covers everything from HTML and CSS basics to advanced JavaScript frameworks...",
    imgLink: img,
    price: 49.99,
    duration: "8 weeks",
    ratings: 4.5,
    totalRatings: 128,
    enrolledStudents: 350,
    instructor: "John Doe",
    level: "Intermediate",
    language: "English",
  };

  const courseData = course || sampleCourse;

  const isEnrolled = enrolledCourses.includes(courseData._id);

  const handleEnroll = async () => {
    try {
      console.log(courseData._id , userId);
      
      const response = await api.post("/enroll-courses/enroll", {
        course_id: courseData._id,
        student_id: userId,
      });
      setEnrolledCourses((prev) => [...prev, courseData._id]);
      
      if(response.data.success){
        message.success("Enrolled Successfully!");
      }else{
        message.error(response.data.message);
      }

    } catch (error) {
      message.error(error.message);
    }
  };

  const handleUnEnroll = async () => {
    try {
      await api.post("/enroll-courses/unenroll", {
        course_id: courseData._id,
        student_id: userId,
      });
      setEnrolledCourses((prev) =>
        prev.filter((id) => id !== courseData._id)
      );
      message.success("UnEnrolled Successfully");
    } catch (error) {
      message.error("Error when UnEnrolling");
    }
  };

  const ReviewForm = () => (
    <Form form={form} onFinish={handleReviewSubmit} layout="vertical">
      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: "Please rate the course" }]}
      >
        <Rate allowHalf />
      </Form.Item>
      <Form.Item
        name="comment"
        label="Your Review"
        rules={[{ required: true, message: "Please write your review" }]}
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
              style={{ width: "80%", height: "60vh", paddingLeft: "160px" }}
            />

            {/* Course Stats - Below Image */}
            <div className="mt-4">
              <Space direction="vertical">
                <div className="flex justify-between items-center">
                  <Rate disabled defaultValue={courseData.overallRatings} allowHalf />
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
              <Title level={2}>{courseData.title}</Title>

              <Space direction="vertical" size="large">
                <div className="flex items-center gap-3">
                  <UserOutlined className="text-blue-500 text-xl" />
                  <Text className="text-gray-700">
                    {courseData.enrolledStudents.length} students enrolled
                  </Text>
                </div>

                <div className="flex items-center gap-3">
                  <ClockCircleOutlined className="text-blue-500 text-xl" />
                  <Text className="text-gray-700">Duration: {courseData.duration}</Text>
                </div>

                <div className="flex items-center gap-3">
                  <UserOutlined className="text-blue-500 text-xl" />
                  <Text className="text-gray-700">
                    Instructor: {courseData.instructor}
                  </Text>
                </div>
              </Space>

              <Divider />

              {/* Price and Enroll Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarOutlined className="text-green-500 text-2xl" />
                  <Title level={2} className="text-green-500">
                    ${courseData.price}
                  </Title>
                </div>
                {isEnrolled ? (
                  <Button type="primary" size="large" onClick={handleUnEnroll}>
                    UnEnroll
                  </Button>
                ) : (
                  <Button type="primary" size="large" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )}
              </div>

              <Divider />

              {/* Course Description Section */}
              <Title level={3}>Course Description</Title>
              <Text>{courseData.description}</Text>

              <Divider />

              {/* Reviews Section */}
              <Title level={3}>
                <CommentOutlined /> Course Reviews
              </Title>

              {isEnrolled && <ReviewForm />}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleCoursePage;
