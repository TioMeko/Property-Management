import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import LandingPage from './pages/LandingPage'
import TenantDashboard from './pages/TenantDashboard'
import LandlordDashboard from './pages/LandlordDashboard'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/settings" element={<SettingsPage userType="tenant" />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/landlord/settings" element={<SettingsPage userType="landlord" />} />
      </Routes>
    </Router>
  )
}

export default App