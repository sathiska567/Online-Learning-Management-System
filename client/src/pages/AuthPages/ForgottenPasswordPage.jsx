import React, { useState } from 'react';
import { message, Spin } from 'antd';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../api/baseUrl';

const ForgottenPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });

  const [errors, setErrors] = useState({
    email: ''
  });

  const [touched, setTouched] = useState({
    email: false
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value)
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField('email', formData.email)
    };

    setTouched({
      email: true
    });

    setErrors(newErrors);

    console.log(formData.email);

    try {
      const response = await api.post("/forgotten/forgot-password",{email:formData.email})
      if(response.data.success){
        message.success(response.data.message)
        navigate("/otp",{state:{email:formData.email}})
      }else{
        message.error(response.data.message)
      }
    } catch (error) {
       message.error(error.message)
    }
    
  };

  const getInputBorderColor = (fieldName) => {
    if (touched[fieldName]) {
      return errors[fieldName] ? 'border-danger' : 'border-success';
    }
    return '';
  };

  return (
    <Spin spinning={loading} tip="Sending reset instructions...">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-12 col-md-5 col-lg-4 p-4 p-md-5 d-flex flex-column justify-content-between">
            <div>
              <h1 className="fw-bold mb-5">EduSphere</h1>

              <div className="mb-4">
                <h2 className="h4 mb-2">Forgot Your Password?</h2>
                <p className="text-secondary">Enter your email address and we'll send you instructions to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${getInputBorderColor('email')}`}
                      id="emailInput"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={loading}
                    />
                    <label htmlFor="emailInput">Email</label>
                    {touched.email && errors.email && (
                      <div className="text-danger small mt-1">{errors.email}</div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-4 text-uppercase fw-semibold"
                  disabled={loading}
                >
                  Reset Password
                </button>

                <div className="text-center small">
                  <a href="/login" className="text-decoration-none text-primary">
                    Back to Login
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
            }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default ForgottenPasswordPage;