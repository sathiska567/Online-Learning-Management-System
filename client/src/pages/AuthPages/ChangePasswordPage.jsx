import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/baseUrl';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
  });

  const [errors, setErrors] = useState({
    password: '',
  });

  const [touched, setTouched] = useState({
    password: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(value)) {
          return 'Password must contain at least one number';
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
      [name]: value,
    });

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      password: validateField('password', formData.password),
    };

    setTouched({
      password: true,
    });

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await api.post("/forgotten/reset-password",{email:location.state.email , password:formData.password});
        message.success('Password reset successful');
        navigate('/login');
      } catch (error) {
        message.error('Failed to reset password. Please try again.');
      }
    }
  };

  const getInputBorderColor = (fieldName) => {
    if (touched[fieldName]) {
      return errors[fieldName] ? 'border-danger' : 'border-success';
    }
    return '';
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-12 col-md-5 col-lg-4 p-4 p-md-5 d-flex flex-column justify-content-between">
          <div>
            <h1 className="fw-bold mb-5">EduSphere</h1>

            <div className="mb-4">
              <h2 className="h4 mb-2">Reset Your Password</h2>
              <p className="text-secondary">Please enter your new password below.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <div className="form-floating position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${getInputBorderColor('password')} pe-5`}
                    id="passwordInput"
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                  />
                  <label htmlFor="passwordInput">New Password</label>
                  <div
                    className="position-absolute end-0 top-50 translate-middle-y d-flex align-items-center pe-3"
                    style={{ zIndex: 5 }}
                  >
                    <button
                      type="button"
                      className="btn btn-link p-0 border-0 text-secondary d-flex align-items-center justify-content-center"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        width: 'min(24px, 6vw)',
                        height: 'min(24px, 6vw)',
                        minWidth: '16px',
                        minHeight: '16px',
                      }}
                    >
                      {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="text-danger small mt-1">{errors.password}</div>
                  )}
                </div>

                <div className="small text-secondary mt-3">
                  <p className="mb-1">Password must contain:</p>
                  <ul className="ps-3">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                  </ul>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-4 text-uppercase fw-semibold"
              >
                Reset Password
              </button>
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
        >
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;