import React, { useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CourseProgressChart = () => {
  const [timeRange, setTimeRange] = useState('week');

  const data = [
    { course: 'Web Development', progress: 85, students: 120, color: '#1890ff' },
    { course: 'Data Science', progress: 72, students: 90, color: '#2fc25b' },
    { course: 'Machine Learning', progress: 65, students: 85, color: '#faad14' },
    { course: 'Mobile App Dev', progress: 90, students: 150, color: '#722ed1' },
    { course: 'Cloud Computing', progress: 78, students: 110, color: '#13c2c2' },
    { course: 'Cybersecurity', progress: 60, students: 75, color: '#eb2f96' },
  ];

  const chartData = {
    labels: data.map(item => item.course),
    datasets: [
      {
        label: 'Course Progress (%)',
        data: data.map(item => item.progress),
        backgroundColor: data.map(item => item.color),
        borderRadius: 4,
        borderWidth: 1,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0]?.label,
          label: (tooltipItem) => {
            const item = data.find(d => d.course === tooltipItem.label);
            return `Completion Rate: ${item?.progress}% | Active Students: ${item?.students}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Courses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Progress (%)',
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <Card 
      title={
        <div className="flex justify-between items-center">
          <span>Course Progress</span>
        </div>
      }
    >
      <div style={{ height:300 }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={8}>
          <div className="text-center">
            <div className="text-lg font-medium text-gray-700">
              {data.length}
            </div>
            <div className="text-sm text-gray-500">Active Courses</div>
          </div>
        </Col>
        <Col span={8}>
          <div className="text-center">
            <div className="text-lg font-medium text-gray-700">
              {500}
            </div>
            <div className="text-sm text-gray-500">Total Students</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CourseProgressChart;
