import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/StudentPages/Dashboard';
import EnrollmentHistory from './pages/StudentPages/EnrollmentHistory';
import LandingPage from './pages/LandingPage/LandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/history" element={<EnrollmentHistory/>} />
        <Route path="/" element={<LandingPage/>} />
      </Routes>
    </Router>
  )
}
