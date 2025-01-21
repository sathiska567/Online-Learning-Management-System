import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Rate,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Divider,
  Tag,
  Tooltip,
  Carousel,
  message,
  Spin
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  StarFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import api from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const CourseSection = ({ searchQuery }) => {
  const [createdCourse, setCreatedCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const getCreatedCourseWithCategory = async () => {
    setLoading(true);
    try {
      if (searchQuery?.data?.recommendations?.length > 0) {
        console.log(searchQuery);
        
        setCreatedCourse(searchQuery.data.recommendations);
      } else {
        const response = await api.get("/courses/all");
        setCreatedCourse(response.data.data);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCreatedCourseWithCategory();
  }, [searchQuery]);

  useEffect(() => {
    if (carouselRef.current) {
      setCurrentSlide(0);
      carouselRef.current.goTo(0);
    }
  }, [createdCourse]);

  const handleNavigateSingleCourse = (course) => {
    navigate("/single-course", { state: { course } });
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(createdCourse.length / itemsPerPage);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
      setCurrentSlide((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
      setCurrentSlide((prev) => Math.min(totalPages - 1, prev + 1));
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <Row justify="space-between" align="middle" className="mb-8">
        <Col>
          <Title level={2} style={{ marginBottom: 8, fontSize: "2.5rem", fontWeight: 600 }}>
            Recommendation Courses
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 16 }}>
            Choose from our professional courses and start your career journey
          </Paragraph>
        </Col>
      </Row>

      {loading ? (
        // Show loading spinner while data is being fetched
        <Row justify="center" align="middle" style={{ height: "300px" }}>
          <Spin size="large" />
        </Row>
      ) : createdCourse.length === 0 ? (
        // Show message when no courses are available
        <Row justify="center" align="middle" style={{ height: "300px" }}>
          <Text type="secondary">No courses available.</Text>
        </Row>
      ) : (
        <>
          <Row justify="space-between" align="middle" style={{ marginBottom: "5%" }}>
            <Col>
              <Space align="center" size={16}>
                <Text type="secondary">
                  {currentSlide + 1} of {totalPages}
                </Text>
                <Space>
                  <Tooltip title="Previous">
                    <Button
                      shape="circle"
                      icon={<LeftOutlined />}
                      size="large"
                      onClick={handlePrev}
                      disabled={currentSlide === 0}
                    />
                  </Tooltip>
                  <Tooltip title="Next">
                    <Button
                      shape="circle"
                      icon={<RightOutlined />}
                      size="large"
                      type="primary"
                      onClick={handleNext}
                      disabled={currentSlide >= totalPages - 1}
                    />
                  </Tooltip>
                </Space>
              </Space>
            </Col>
          </Row>

          <div style={{ position: "relative" }}>
            <Carousel
              ref={carouselRef}
              dots={false}
              infinite={false}
              beforeChange={(from, to) => setCurrentSlide(to)}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex}>
                  <Row gutter={[24, 24]}>
                    {createdCourse
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((course) => (
                        <Col xs={24} md={8} key={course.id}>
                          {localStorage.getItem("token") ? (
                            <Card
                              onClick={() => handleNavigateSingleCourse(course)}
                              hoverable
                              cover={
                                <div style={{ position: "relative" }}>
                                  <img
                                    alt={course.title}
                                    src={course.imgLink}
                                    style={{ height: 200, objectFit: "cover", width: "100%" }}
                                  />
                                  <Tag
                                    color="blue"
                                    style={{ position: "absolute", top: 12, right: 12, padding: "4px 8px" }}
                                  >
                                    {course.category}
                                  </Tag>
                                </div>
                              }
                              bodyStyle={{ padding: 20 }}
                            >
                              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                                <Text strong style={{ display: "block" }}>
                                  Instructor: {course.instructor}
                                </Text>
                                <Text type="secondary">{course.role}</Text>
                                <Title level={5} style={{ margin: 0 }}>{course.title}</Title>
                                <Paragraph type="secondary" ellipsis={{ rows: 2 }}>{course.description}</Paragraph>
                                <Divider style={{ margin: "12px 0" }} />
                                <Row justify="space-between" align="middle">
                                  <Col>
                                    <Space>
                                      <Text strong>{course.overallRatings}</Text>
                                      <Rate
                                        disabled
                                        defaultValue={course.overallRatings}
                                        allowHalf
                                        character={<StarFilled style={{ fontSize: 14 }} />}
                                      />
                                    </Space>
                                  </Col>
                                </Row>
                                <Space split={<Divider type="vertical" />}>
                                  <Space>
                                    <ClockCircleOutlined />
                                    <Text>{course.duration}</Text>
                                  </Space>
                                  <Space>
                                    <Text>Price: ${course.price}</Text>
                                  </Space>
                                </Space>
                              </Space>
                            </Card>
                          ) : (
                            <Tooltip title="Please log in to view details">
                              <Card
                              hoverable
                              cover={
                                <div style={{ position: "relative" }}>
                                  <img
                                    alt={course.title}
                                    src={course.imgLink}
                                    style={{ height: 200, objectFit: "cover", width: "100%" }}
                                  />
                                  <Tag
                                    color="blue"
                                    style={{ position: "absolute", top: 12, right: 12, padding: "4px 8px" }}
                                  >
                                    {course.category}
                                  </Tag>
                                </div>
                              }
                              bodyStyle={{ padding: 20 }}
                            >
                              <Space direction="vertical" size={16} style={{ width: "100%" }}>
                                <Text strong style={{ display: "block" }}>
                                  Instructor: {course.instructor}
                                </Text>
                                <Text type="secondary">{course.role}</Text>
                                <Title level={5} style={{ margin: 0 }}>{course.title}</Title>
                                <Paragraph type="secondary" ellipsis={{ rows: 2 }}>{course.description}</Paragraph>
                                <Divider style={{ margin: "12px 0" }} />
                                <Row justify="space-between" align="middle">
                                  <Col>
                                    <Space>
                                      <Text strong>{course.overallRatings}</Text>
                                      <Rate
                                        disabled
                                        defaultValue={course.overallRatings}
                                        allowHalf
                                        character={<StarFilled style={{ fontSize: 14 }} />}
                                      />
                                    </Space>
                                  </Col>
                                </Row>
                                <Space split={<Divider type="vertical" />}>
                                  <Space>
                                    <ClockCircleOutlined />
                                    <Text>{course.duration}</Text>
                                  </Space>
                                  <Space>
                                    <Text>Price: ${course.price}</Text>
                                  </Space>
                                </Space>
                              </Space>
                            </Card>
                            </Tooltip>
                          )}
                        </Col>
                      ))}
                  </Row>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseSection;
