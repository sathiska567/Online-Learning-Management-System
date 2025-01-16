import React, { useRef } from 'react';
import { Carousel, Avatar, Card, Button } from 'antd';
import { UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const TestimonialSlider = () => {
  const carouselRef = useRef();

  const testimonials = [
    {
      id: 1,
      content: "Since implementing KnowledgePluse, our organization has witnessed a remarkable transformation in how we approach learning. The platform's simplicity belies its powerful capabilities, offering a seamless and enjoyable educational experience. The efficiency with which we can now manage courses, track progress, and foster collaboration among learners is truly impressive.",
      author: "Sathiska",
      title: "Theresa Webb",
      avatars: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
        "/path/to/avatar4.jpg"
      ]
    },
    {
      id: 1,
      content: "Since implementing KnowledgePluse, our organization has witnessed a remarkable transformation in how we approach learning. The platform's simplicity belies its powerful capabilities, offering a seamless and enjoyable educational experience. The efficiency with which we can now manage courses, track progress, and foster collaboration among learners is truly impressive.",
      author: "Sasindu",
      title: "Theresa Webb",
      avatars: [
        "/path/to/avatar1.jpg",
        "/path/to/avatar2.jpg",
        "/path/to/avatar3.jpg",
        "/path/to/avatar4.jpg"
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
        {testimonials.map((testimonial) => (
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
                  "{testimonial.content}"
                </div>
                <div>
                  <h3 style={{ 
                    color: '#2d3748',
                    marginBottom: '15px'
                  }}>
                    {testimonial.author}
                  </h3>
                  <p style={{ 
                    color: '#718096',
                    marginBottom: '20px'
                  }}>
                    {testimonial.title}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    {testimonial.avatars.map((avatar, index) => (
                      <Avatar
                        key={index}
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