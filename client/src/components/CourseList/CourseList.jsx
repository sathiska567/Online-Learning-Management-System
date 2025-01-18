import React, { useEffect, useState } from 'react';
import { Input, Button, Card, Select, Space, Tooltip, Pagination, message, Dropdown } from 'antd';
import { SearchOutlined, MoreOutlined, DownOutlined } from '@ant-design/icons';
import { Star } from 'lucide-react';
import api from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CourseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [userId, setUserId] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate()

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

  const userEnrollCourses = async () => {
    try {
      const response = await api.get(`/enroll-courses/enrolled/${userId}`);
      console.log(response);
      
      setEnrolledCourses(response.data.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleProgressChange = async (courseId, newProgress) => {
    try {
      console.log(courseId , newProgress);
      const response = await api.post("/courses/setCourseProgress",{course_id : courseId , progress:newProgress});
      // console.log(response)
      window.location.reload();
      message.success('Progress updated successfully');
    } catch (error) {
      message.error('Failed to update progress');
    }
  };

  const getProgressDropdownItems = (courseId) => {
    const progressOptions = [0, 25, 50, 75, 100];
    return {
      items: progressOptions.map(progress => ({
        key: progress,
        label: `${progress}% Complete`,
        onClick: () => handleProgressChange(courseId, progress)
      }))
    };
  };

  // Filter and pagination logic remains the same
  const filteredCourses = enrolledCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      userEnrollCourses();
    }
  }, [userId]);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
      {/* Filter Section remains the same */}
      <div style={{ marginBottom: 24 }}>
        {/* ... existing filter code ... */}
      </div>

      {/* Course Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24
      }}>
        {paginatedCourses.map((course) => (
          <Card
            key={course.id}
            cover={
              <div style={{ position: 'relative' }}>
                <img
                  alt={course.title}
                  src={course.imgLink}
                  style={{ height: 180, width: '100%', objectFit: 'cover' }}
                />
                <Dropdown
                  menu={getProgressDropdownItems(course.id)}
                  trigger={['click']}
                >
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                      minWidth: 32,
                      height: 32,
                      padding: 0,
                    }}
                  />
                </Dropdown>
              </div>
            }
            bodyStyle={{ padding: 16 }}
          >
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 8,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {course.title}
            </h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
              {course.instructor}
            </p>

            {/* Progress Bar with Dropdown */}
            <div style={{ marginBottom: 12 }}>
              <Dropdown
                menu={getProgressDropdownItems(course._id)}
                trigger={['click']}
              >
                <div style={{ cursor: 'pointer' }}>
                  <div style={{
                    height: 8,
                    background: '#f0f0f0',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${course.progress}%`,
                      height: '100%',
                      background: '#1890ff',
                      borderRadius: 4,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: '#666', 
                    marginTop: 4, 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    {course.progress}% Complete
                    <DownOutlined style={{ fontSize: 10 }} />
                  </div>
                </div>
              </Dropdown>
            </div>

            {/* Rating section remains the same */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {Array(5).fill(0).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={index < course.overallRatings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
              {course.overallRatings === 0 && (
                <span style={{ fontSize: 14, color: '#666' }}>Leave a rating</span>
              )}
            </div>

            {course.status === 'not_started' && (
              <Button type="primary" block style={{ marginTop: 12 }}>
                START COURSE
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Pagination remains the same */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredCourses.length}
        onChange={handlePageChange}
        style={{ marginTop: 24, textAlign: 'center' }}
      />
    </div>
  );
};

export default CourseList;