import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import LandingPage from './pages/LandingPage'
import TenantDashboard from './pages/TenantDashboard'
import LandlordDashboard from './pages/LandlordDashboard'
import SettingsPage from './pages/SettingsPage'
import Messages from './pages/Messages'
import Maintenance from './pages/Maintenance'
import Payments from './pages/Payments'
import Inspections from './pages/Inspections'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/messages" element={<Messages />} />
        <Route path="/tenant/maintenance" element={<Maintenance />} />
        <Route path="/tenant/payments" element={<Payments />} />
        <Route path="/tenant/inspections" element={<Inspections />} />
        <Route path="/tenant/settings" element={<SettingsPage userType="tenant" />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/landlord/messages" element={<Messages />} />
        <Route path="/landlord/maintenance" element={<Maintenance />} />
        <Route path="/landlord/inspections" element={<Inspections />} />
        <Route path="/landlord/settings" element={<SettingsPage userType="landlord" />} />
      </Routes>
    </Router>
  )
}

export default App