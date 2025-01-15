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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/analytic" element= {<AnalyticPage/>} />
        <Route path="/history" element={<EnrollmentHistory/>} />
        <Route path='/create-course' element={<CreateCourse/>} />
        <Route path='/created-all-course' element={<ViewCourse/>} />
        <Route path='/enroll-student' element={<EnrollStudents/>} />
        <Route path='/contact-us' element={<ContactUsPage/>} />
      </Routes>
    </Router>
  )
}
