import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TenantDashboard from './pages/TenantDashboard'
import LandlordDashboard from './pages/LandlordDashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
      </Routes>
    </Router>
  )
}

export default App