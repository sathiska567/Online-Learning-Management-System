import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/StudentPages/Dashboard';
import EnrollmentHistory from './pages/StudentPages/EnrollmentHistory';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateCourse from './pages/TeachersPages/CreateCourse'
import ViewCourse from './pages/TeachersPages/ViewCourse';
import EnrollStudents from './pages/TeachersPages/EnrollStudents';
import ContactUsPage from './pages/ContactUsPage/ContactUsPage';
import AnalyticPage from './pages/AdminPages/AnalyticPage';
import RegistrationPage from './pages/AuthPages/RegisterPage';
import LoginPage from './pages/AuthPages/LoginPage';
import ForgottenPasswordPage from './pages/AuthPages/ForgottenPasswordPage';
import OTPPage from './pages/AuthPages/OTPPage';
import ChangePasswordPage from './pages/AuthPages/ChangePasswordPage';
import TeacherAnalyticPage from './pages/TeachersPages/TeacherAnalyticPage';
import ViewCourseDetails from './pages/TeachersPages/ViewCourseDetails';
import SingleCourseViewPage from './pages/SingleCourseViewPage/SingleCourseViewPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/single-course" element={<SingleCourseViewPage/>} />
        

        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/analytic" element= {<AnalyticPage/>} />
        <Route path="/teacher-analytic" element= {<TeacherAnalyticPage/>} />

        <Route path="/history" element={<EnrollmentHistory/>} />
        <Route path='/create-course' element={<CreateCourse/>} />
        <Route path='/view-course' element={<ViewCourseDetails/>} />
        <Route path='/created-all-course' element={<ViewCourse/>} />
        <Route path='/enroll-student' element={<EnrollStudents/>} />
        <Route path='/contact-us' element={<ContactUsPage/>} />

        <Route path='/register' element = {<RegistrationPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/forgot-password' element={<ForgottenPasswordPage/>} />
        <Route path='/otp' element={<OTPPage/>} />
        <Route path='/reset' element={<ChangePasswordPage/>} />
      </Routes> 
    </Router>
  )
}
