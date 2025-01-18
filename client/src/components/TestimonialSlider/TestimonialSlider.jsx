import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Avatar, Card, Button, message } from 'antd';
import { UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import api from '../../api/baseUrl';

const TestimonialSlider = () => {
  const carouselRef = useRef();
    const [testimonialData , setTestimonialData] = useState([]);
  

  const getReviews = async () => {
    try {
      const response = await api.get('/courses/getEachUserCreatedCourseReview');
      console.log(response.data);
       if(response.data.success){
        setTestimonialData(response.data.data)
       }else{
        message.error(response.data.message)
       }
    } catch (error) {
      console.error(error);
    }
  }

  const testimonials = [
    {
      id: 1,
      avatars: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
      ]
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };


    useEffect(() => {
      getReviews();
    }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      <Button 
        icon={<LeftOutlined />}
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          background: 'white',
          border: '1px solid #d9d9d9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
      <Button 
        icon={<RightOutlined />}
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          background: 'white',
          border: '1px solid #d9d9d9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
      <Carousel ref={carouselRef} {...settings}>
        {testimonialData.map((testimonial) => (
          <div key={testimonial.id}>
            <Card
              style={{
                margin: '20px',
                borderRadius: '10px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  color: '#1a3253',
                  marginBottom: '30px'
                }}>
                  Testimonial
                </h2>
                <div style={{
                  fontSize: '16px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '30px',
                  padding: '0 20px',
                }}>
                  "{testimonial.reviewText}"
                </div>
                <div>
                  <h3 style={{ 
                    color: '#2d3748',
                    marginBottom: '15px'
                  }}>
                    {testimonial.reviewer.name}
                  </h3>
                  <p style={{ 
                    color: '#718096',
                    marginBottom: '20px'
                  }}>
                    {testimonial.reviewer.email}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    {testimonials[0].avatars.map((avatar, index) => (
                      <Avatar
                        icon={<UserOutlined />}
                        src={avatar}
                        size={40}
                        style={{
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialSlider;