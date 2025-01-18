import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../api/baseUrl';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CourseProgressChart = () => {
  const [MachineLearning , setMachineLearning] = useState([]);
  const [Marketing, setMarketing] = useState([]);
  const [WebDevelopment, setWebDevelopment] = useState([]);
  const [MobileDevelopment, setMobileDevelopment] = useState([]);
  const [Other, setOther] = useState([]);
  const [MachineLearningStudents , setMachineLearningStudents] = useState([]);
  const [MarketingStudents, setMarketingStudents] = useState([]);
  const [WebDevelopmentStudents, setWebDevelopmentStudents] = useState([]);
  const [MobileDevelopmentStudents, setMobileDevelopmentStudents] = useState([]);
  const [OtherStudents, setOtherStudents] = useState([]);


  const getCourseWithCategories = async()=>{
      try {
        
       const response = await api.get("/courses/category")
       console.log(response);
       setMachineLearning(response.data.MachineLearning.length)
       setMobileDevelopment(response.data.mobileDevelopment.length)
       setWebDevelopment(response.data.wedDevelopment.length)
       setMarketing(response.data.Marketing.length)
       setOther(response.data.Other.length)
       setMachineLearningStudents(response.data.machineLearningEnrolStudent)
       setMarketingStudents(response.data.marketingEnrolStudent)
       setWebDevelopmentStudents(response.data.webEnrolStudent)
       setMobileDevelopmentStudents(response.data.mobileEnrolStudent)
       setOtherStudents(response.data.otherEnrolStudent)
  
      } catch (error) {
         message.error("Error Occur while fetching course Category")
      }
    }
    useEffect(()=>{
      getCourseWithCategories()
    },[])


  const data = [
    { course: 'Web Development', progress: WebDevelopment, students: WebDevelopmentStudents, color: '#1890ff' },
    { course: 'Marketing', progress:Marketing, students:MarketingStudents, color: '#2fc25b' },
    { course: 'Machine Learning', progress:MachineLearning, students: MachineLearningStudents, color: '#faad14' },
    { course: 'Mobile App Dev', progress:MobileDevelopment, students: MobileDevelopmentStudents, color: '#722ed1' },
    { course: 'Other', progress:Other, students: OtherStudents, color: '#13c2c2' },
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
        max: 50,
        ticks: {
          stepSize: 5,
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
      <div style={{ height:300}}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default CourseProgressChart;
