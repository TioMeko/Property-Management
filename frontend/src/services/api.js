import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken')
          window.location.href = '/'
          break
        case 403:
          console.error('Forbidden: You do not have permission to access this resource')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error: Please try again later')
          break
        default:
          console.error('An error occurred:', data?.message || error.message)
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: Please check your internet connection')
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

// API endpoint functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/register', userData),
  logout: () => Promise.resolve(),
  verifyToken: () => api.get('/auth/me'),
  requestPasswordReset: (email) => api.post('/auth/forgot-password', { email }),
}

export const onboardingAPI = {
  saveDraft: (payload) => api.post('/onboarding', payload),
}

export const tenantAPI = {
  getDashboard: () => api.get('/tenant/summary'),
  getLease: () => api.get('/lease'),
  getPayments: () => api.get('/payments'),
}

export const landlordAPI = {
  getDashboard: () =>
    Promise.reject(new Error('Landlord dashboard routes are not available on the backend yet.')),
}

export const maintenanceAPI = {
  getRequests: () => api.get('/maintenance'),
  createRequest: (data) => api.post('/maintenance', data),
  updateStatus: (id, status) => api.patch(`/maintenance/${id}`, { status }),
}

export const paymentAPI = {
  list: () => api.get('/payments'),
}

export const leaseAPI = {
  getActive: () => api.get('/lease'),
}

export const userAPI = {
  getProfile: () => api.get('/auth/me'),
  updateProfile: () =>
    Promise.reject(new Error('User profile update route is not available on the backend yet.')),
}

export default api

