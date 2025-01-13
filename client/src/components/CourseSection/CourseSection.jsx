import React, { useRef, useState } from "react";
import {
  Card,
  Avatar,
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
  Progress
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  StarFilled,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UIUX from '../../assets/ui-ux.webp'

const { Title, Text, Paragraph } = Typography;


const CourseSection = () => {
  const [activeTab, setActiveTab] = useState("UX/UI Design");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const categories = [
    "Project Manager",
    "UX/UI Design",
    "Digital Market",
    "Data Scientist",
    "Data Analyst",
    "Front-End Developer",
  ];

  const courses = [
        {
          id: 1,
          title: "Google UX/UI Analytics",
          instructor: "Theresa Webb",
          role: "UX/UI designer",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          rating: 4.8,
          reviews: "44k",
          duration: "6 months",
          level: "Beginner",
          students: "12.5k",
          image: UIUX,
          avatarUrl: "/api/placeholder/40/40",
        },
        {
          id: 2,
          title: "Google UX/UI Analytics",
          instructor: "Theresa Webb",
          role: "UX/UI designer",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          rating: 4.8,
          reviews: "44k",
          duration: "6 months",
          level: "Beginner",
          students: "12.5k",
          image: UIUX,
          avatarUrl: "/api/placeholder/40/40",
        },
        {
          id: 3,
          title: "Google UX/UI Analytics",
          instructor: "Theresa Webb",
          role: "UX/UI designer",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          rating: 4.8,
          reviews: "44k",
          duration: "6 months",
          level: "Beginner",
          students: "12.5k",
          image: UIUX,
          avatarUrl: "/api/placeholder/40/40",
        },
        {
          id: 4,
          title: "Google UX/UI Analytics",
          instructor: "Theresa Webb",
          role: "UX/UI designer",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          rating: 4.8,
          reviews: "44k",
          duration: "6 months",
          level: "Beginner",
          students: "12.5k",
          image: UIUX,
          avatarUrl: "/api/placeholder/40/40",
        },
      ];

  // Calculate number of pages
  const itemsPerPage = 3;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const currentPage = currentSlide + 1;

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
      setCurrentSlide(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
      setCurrentSlide(prev => Math.min(totalPages - 1, prev + 1));
    }
  };

  const handleTabChange = (category) => {
    setActiveTab(category);
    setCurrentSlide(0);
    if (carouselRef.current) {
      carouselRef.current.goTo(0);
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

      <Row justify="space-between" align="middle" className="mb-8" style={{marginBottom:"5%"}}>
        <Col flex="auto">
          <Space wrap size={12}>
            {categories.map((category) => (
              <Button
                key={category}
                type={activeTab === category ? "primary" : "default"}
                shape="round"
                size="large"
                onClick={() => handleTabChange(category)}
                style={{
                  padding: "0 24px",
                  height: "40px",
                  boxShadow: activeTab === category ? "0 2px 8px rgba(24, 144, 255, 0.15)" : "none",
                }}
              >
                {category}
              </Button>
            ))}
          </Space>
        </Col>
        <Col>
          <Space align="center" size={16}>
            <Text type="secondary">
              {currentPage} of {totalPages}
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
                  disabled={currentSlide === totalPages - 1}
                />
              </Tooltip>
            </Space>
          </Space>
        </Col>
      </Row>

      <div style={{ position: 'relative' }}>
        <Carousel
          ref={carouselRef}
          dots={false}
          infinite={false}
          beforeChange={(from, to) => setCurrentSlide(to)}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex}>
              <Row gutter={[24, 24]}>
                {courses
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((course) => (
                    <Col xs={24} md={8} key={course.id}>
                      <Card
                        hoverable
                        cover={
                          <div style={{ position: "relative" }}>
                            <img
                              alt={course.title}
                              src={course.image}
                              style={{
                                height: 200,
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                            <Tag
                              color="blue"
                              style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                padding: "4px 8px",
                              }}
                            >
                              {course.level}
                            </Tag>
                          </div>
                        }
                        bodyStyle={{ padding: 20 }}
                      >
                        <Space direction="vertical" size={16} style={{ width: "100%" }}>
                          <Space align="start">
                            <Avatar size={40} src={course.avatarUrl} />
                            <div>
                              <Text strong style={{ display: "block" }}>
                                {course.instructor}
                              </Text>
                              <Text type="secondary">{course.role}</Text>
                            </div>
                          </Space>

                          <Title level={5} style={{ margin: 0 }}>
                            {course.title}
                          </Title>

                          <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                            {course.description}
                          </Paragraph>

                          <Divider style={{ margin: "12px 0" }} />

                          <Row justify="space-between" align="middle">
                            <Col>
                              <Space>
                                <Text strong>{course.rating}</Text>
                                <Rate
                                  disabled
                                  defaultValue={course.rating}
                                  allowHalf
                                  character={<StarFilled style={{ fontSize: 14 }} />}
                                />
                                <Text type="secondary">({course.reviews})</Text>
                              </Space>
                            </Col>
                          </Row>

                          <Space split={<Divider type="vertical" />}>
                            <Space>
                              <ClockCircleOutlined />
                              <Text>{course.duration}</Text>
                            </Space>
                            <Space>
                              <UserOutlined />
                              <Text>{course.students} students</Text>
                            </Space>
                          </Space>
                        </Space>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </Carousel>

      </div>
    </div>
  );
};

export default CourseSection;