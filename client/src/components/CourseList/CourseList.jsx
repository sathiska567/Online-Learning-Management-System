import React, { useState } from 'react';
import { Input, Button, Card, Select, Space, Tooltip, Pagination } from 'antd';
import { SearchOutlined, MoreOutlined, DownOutlined } from '@ant-design/icons';
import { Star } from 'lucide-react';

const { Option } = Select;

const CourseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const courses = [
    {
      id: 1,
      title: 'Flutter & Dart - The Complete Guide [2025 Edition]',
      instructor: 'Academind by Maximilian Schwarzmüller',
      progress: 92,
      rating: 5,
      image: '/api/placeholder/320/180',
      category: 'Mobile Development',
      status: 'complete'
    },
    {
      id: 2,
      title: 'ReactJS Crash Course: The Complete Course for Beginners',
      instructor: 'Meta Brains',
      progress: 100,
      rating: 0,
      image: '/api/placeholder/320/180',
      category: 'Web Development',
      status: 'complete'
    },
    {
      id: 3,
      title: 'Machine Learning - Fundamental of Python',
      instructor: 'Sara Academy',
      progress: 100,
      rating: 0,
      image: '/api/placeholder/320/180',
      category: 'Data Science',
      status: 'complete'
    },
    {
      id: 4,
      title: 'Fundamentals of Linear Algebra for University Students',
      instructor: 'Kamal Saadeddin',
      progress: 99,
      rating: 0,
      image: '/api/placeholder/320/180',
      category: 'Mathematics',
      status: 'in_progress'
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
      {/* Filter Section */}
      <div style={{ marginBottom: 24 }}>
        <Space wrap style={{ width: '100%' }} justify="space-between">
          <Space wrap>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Sort by</span>
            <Select
              defaultValue="recent"
              style={{ width: 180 }}
              suffixIcon={<DownOutlined />}
            >
              <Option value="recent">Recently Accessed</Option>
              <Option value="oldest">Oldest First</Option>
            </Select>

            <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 16 }}>Filter by</span>
            <Select
              defaultValue="all"
              style={{ width: 150 }}
              suffixIcon={<DownOutlined />}
            >
              <Option value="all">Categories</Option>
              <Option value="web">Web Development</Option>
              <Option value="mobile">Mobile Development</Option>
              <Option value="data">Data Science</Option>
            </Select>

            <Select
              defaultValue="all"
              style={{ width: 150 }}
              suffixIcon={<DownOutlined />}
            >
              <Option value="all">Progress</Option>
              <Option value="completed">Completed</Option>
              <Option value="in_progress">In Progress</Option>
            </Select>

            <Select
              defaultValue="all"
              style={{ width: 150 }}
              suffixIcon={<DownOutlined />}
            >
              <Option value="all">Instructor</Option>
              <Option value="academind">Academind</Option>
              <Option value="meta">Meta Brains</Option>
            </Select>

            <Button type="link">Reset</Button>
          </Space>

          <Input
            placeholder="Search my courses"
            prefix={<SearchOutlined />}
            style={{ width: 280 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Space>
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
                  src={course.image}
                  style={{ height: 180, width: '100%', objectFit: 'cover' }}
                />
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

            {/* Progress Bar */}
            <div style={{ marginBottom: 12 }}>
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
              <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                {course.progress}% complete
              </p>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {Array(5).fill(0).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={index < course.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
              {course.rating === 0 && (
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

      {/* Pagination */}
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
