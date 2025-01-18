import React, { useState, useRef } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/baseUrl';

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const location = useLocation()

//   console.log(location.state.email);

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      message.error('Please enter a complete OTP');
      return;
    }

    try {
      console.log(otpString,location);
      
      const response = await api.post("/forgotten/verify-otp", {email:location.state.email, otp: otpString });
      if(response.data.success){
        message.success('OTP verified successfully');
        navigate('/reset' , {state:{email:location.state.email}});
      }
    } catch (error) {
      message.error('Please Enter Correct OTP !');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d*$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 4) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-12 col-md-5 col-lg-4 p-4 p-md-5 d-flex flex-column justify-content-between">
          <div>
            <h1 className="fw-bold mb-5">EduSphere</h1>

            <div className="mb-4">
              <h2 className="h4 mb-2">Enter Verification Code</h2>
              <p className="text-secondary">Please enter the verification code sent to your email.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <div className="d-flex justify-content-between gap-2 mb-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      className="form-control text-center fw-bold fs-4"
                      style={{ width: '60px', height: '60px' }}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-4 text-uppercase fw-semibold"
              >
                Verify OTP
              </button>

              <div className="text-center small">
                <span className="text-secondary">Didn't receive the code? </span>
                <a href="/login" className="text-decoration-none text-primary">
                  login
                </a>
              </div>
            </form>
          </div>
        </div>

        <div
          className="col-md-7 col-lg-8 d-none d-md-block px-0"
          style={{
            backgroundImage: `url('https://quickcampus.online/blog/wp-content/uploads/2023/12/blog2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px)',
          }}
        />
      </div>
    </div>
  );
};

export default OTPPage;