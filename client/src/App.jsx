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
import ManageTeachersPage from './pages/AdminPages/ManageTeachersPage/ManageTeachersPage';
import ManageCourseApprove from './pages/AdminPages/ManageCourseApprove/ManageCourseApprove';
import PrivateRoute from './components/ProtectRoute/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/single-course" element={<SingleCourseViewPage/>} />
        <Route path='/contact-us' element={<ContactUsPage/>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/analytic" element= {<PrivateRoute><AnalyticPage/></PrivateRoute>} />
        <Route path="/teacher-analytic" element= {<PrivateRoute><TeacherAnalyticPage/></PrivateRoute>} />
        <Route path="/manage-teachers" element= {<PrivateRoute><ManageTeachersPage/></PrivateRoute>} />
        <Route path="/manage-course" element= {<PrivateRoute><ManageCourseApprove/></PrivateRoute>} />
        
          
        <Route path="/history" element={<PrivateRoute><EnrollmentHistory/></PrivateRoute>} />
        <Route path='/create-course' element={<PrivateRoute><CreateCourse/></PrivateRoute>} />
        <Route path='/view-course' element={<PrivateRoute><ViewCourseDetails/></PrivateRoute>} />
        <Route path='/created-all-course' element={<PrivateRoute><ViewCourse/></PrivateRoute>} />
        <Route path='/enroll-student' element={<PrivateRoute><EnrollStudents/></PrivateRoute>} />

        <Route path='/register' element = {<RegistrationPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/forgot-password' element={<ForgottenPasswordPage/>} />
        <Route path='/otp' element={<OTPPage/>} />
        <Route path='/reset' element={<ChangePasswordPage/>} />
      </Routes> 
    </Router>
  )
}
