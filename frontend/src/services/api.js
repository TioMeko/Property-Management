import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify-token'),
}

export const tenantAPI = {
  getDashboard: () => api.get('/tenant/dashboard'),
  getProperty: () => api.get('/tenant/property'),
  getLease: () => api.get('/tenant/lease'),
}

export const landlordAPI = {
  getDashboard: () => api.get('/landlord/dashboard'),
  getProperties: () => api.get('/landlord/properties'),
  getTenants: () => api.get('/landlord/tenants'),
  getFinances: () => api.get('/landlord/finances'),
  getRevenueChart: () => api.get('/landlord/revenue/chart'),
}

export const maintenanceAPI = {
  getRequests: (params) => api.get('/maintenance/requests', { params }),
  createRequest: (data) => api.post('/maintenance/requests', data),
  updateRequest: (id, data) => api.put(`/maintenance/requests/${id}`, data),
  deleteRequest: (id) => api.delete(`/maintenance/requests/${id}`),
}

export const paymentAPI = {
  getBalance: () => api.get('/payments/balance'),
  getHistory: (params) => api.get('/payments/history', { params }),
  processPayment: (data) => api.post('/payments', data),
  getReceipt: (id) => api.get(`/payments/${id}/receipt`),
}

export const inspectionAPI = {
  getInspections: (params) => api.get('/inspections', { params }),
  scheduleInspection: (data) => api.post('/inspections', data),
  updateInspection: (id, data) => api.put(`/inspections/${id}`, data),
  cancelInspection: (id) => api.delete(`/inspections/${id}`),
  getReport: (id) => api.get(`/inspections/${id}/report`),
}

export const messageAPI = {
  getMessages: () => api.get('/messages'),
  sendMessage: (data) => api.post('/messages', data),
  getThread: (id) => api.get(`/messages/${id}`),
  markAsRead: (id) => api.put(`/messages/${id}/read`),
}

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  uploadAvatar: (formData) => api.post('/user/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getSettings: () => api.get('/user/settings'),
  updateSettings: (data) => api.put('/user/settings', data),
  changePassword: (data) => api.put('/user/password', data),
  deleteAccount: () => api.delete('/user/account'),
}

export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
}

export default api

