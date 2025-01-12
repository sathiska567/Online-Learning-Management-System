import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/StudentPages/Dashboard';
import EnrollmentHistory from './pages/StudentPages/EnrollmentHistory';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/history" element={<EnrollmentHistory/>} />
      </Routes>
    </Router>
  )
}
