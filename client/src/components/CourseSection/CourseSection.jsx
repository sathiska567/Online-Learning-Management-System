import React, { useEffect, useRef, useState } from "react";
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
  message
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  StarFilled,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UIUX from '../../assets/ui-ux.webp'
import api from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;


const CourseSection = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("UX/UI Design");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [createdCourse , setCreatedCourse] = useState([])
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate()
  

const getCreatedCourseWithCategory = async()=>{
     try {
      const response = await api.get("/courses/all")
      console.log(response);
      
      setCreatedCourse(response.data.data)
     } catch (error) {
        message.error(error.message)
     }
  }

const handleNavigateSingleCourse = async(course)=>{
    try {
      console.log(course);
      
      navigate("/single-course",{state:{course:course}})
      
    } catch (error) {
       message.error(error.message)
    }
  }


const getRecommendationCourses = async(searchQuery)=>{
    try {
      console.log(searchQuery);
      // const courseData = searchQuery.data.data;

      //   // Process and format course data
      //   const formattedCourses = courseData.map((course) => {
      //     // Extract course details from each array
      //     const courseName = course[0].split(":")[1].trim();
      //     const category = course[1].split(":")[1].trim();
      //     const relevantTopics = course[2].split(":")[1].trim();
      //     const price = course[3].split(":")[1].trim();
      //     const duration = course[4].split(":")[1].trim();
      //     const instructor = course[5].split(":")[1].trim();
      //     const imageLink = course[6].split(":")[1].trim().replace('[', '').replace(']', '').trim();

      //     return {
      //       courseName,
      //       category,
      //       relevantTopics,
      //       price,
      //       duration,
      //       instructor,
      //       imageLink
      //     };
      //   });

      //   setCourses(formattedCourses); // Update state with formatted courses
      
    } catch (error) {
       message.error(error.message)
    }
  }

  const itemsPerPage = 3;
  const totalPages = Math.ceil(createdCourse.length / itemsPerPage);
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

  useEffect(()=>{
    getCreatedCourseWithCategory()
    getRecommendationCourses(searchQuery)
  },[searchQuery])


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
                {createdCourse
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((course) => (
                    <Col xs={24} md={8} key={course.id}>
                       {localStorage.getItem('token') ? (
                        <Card
                        onClick={()=>handleNavigateSingleCourse(course)}
                       hoverable
                       cover={
                         <div style={{ position: "relative" }}>
                           <img
                             alt={course.title}
                             src={course.imgLink}
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
                             {course.category}
                           </Tag>
                         </div>
                       }
                       bodyStyle={{ padding: 20 }}
                     >
                       <Space direction="vertical" size={16} style={{ width: "100%" }}>
                         <Space align="start">
                           {/* <Avatar size={40} src={course.avatarUrl} /> */}
                           <div>
                             <Text strong style={{ display: "block" }}>
                               Instructor : {course.instructor}
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
                         </Space>
                       </Space>
                     </Card>
                       ):(
                        <Tooltip title='please log log into the system'>
                          <Card
                        hoverable
                        cover={
                          <div style={{ position: "relative" }}>
                            <img
                              alt={course.title}
                              src={course.imgLink}
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
                              {course.category}
                            </Tag>
                          </div>
                        }
                        bodyStyle={{ padding: 20 }}
                      >
                        <Space direction="vertical" size={16} style={{ width: "100%" }}>
                          <Space align="start">
                            {/* <Avatar size={40} src={course.avatarUrl} /> */}
                            <div>
                              <Text strong style={{ display: "block" }}>
                                Instructor : {course.instructor}
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
                          </Space>
                          <Space split={<Divider type="vertical" />}>
                            <Space>
                              <Text>Price : $ {course.price}</Text>
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
    </div>
  );
};

export default CourseSection;
