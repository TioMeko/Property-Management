import React, { createContext, useState, useEffect } from 'react'
import { authAPI, tenantAPI, landlordAPI, userAPI } from '../services/api'

// Create the context
const AppContext = createContext(undefined)

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          // Verify token and get user data
          const response = await authAPI.verifyToken()
          setUser(response.data.user)
          setIsAuthenticated(true)
        } catch {
          // Token is invalid, clear it
          localStorage.removeItem('authToken')
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      setError(null)
      setLoading(true)
      const response = await authAPI.login(credentials)
      
      const { token, user: userData } = response.data

      // Store token in localStorage
      localStorage.setItem('authToken', token)

      // Update state
      setUser(userData)
      setIsAuthenticated(true)
      setLoading(false)

      return { success: true, user: userData }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  // Signup function
  const signup = async (userData) => {
    try {
      setError(null)
      setLoading(true)
      const response = await authAPI.signup(userData)
      
      const { token, user: newUser } = response.data

      // Store token in localStorage
      localStorage.setItem('authToken', token)

      // Update state
      setUser(newUser)
      setIsAuthenticated(true)
      setLoading(false)

      return { success: true, user: newUser }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state and localStorage regardless of API call result
      localStorage.removeItem('authToken')
      setUser(null)
      setIsAuthenticated(false)
      setDashboardData(null)
      setError(null)
    }
  }

  // Fetch dashboard data based on user role
  const fetchDashboardData = async () => {
    if (!user || !isAuthenticated) {
      setError('User not authenticated')
      return null
    }

    try {
      setLoading(true)
      setError(null)

      let response
      if (user.role === 'tenant') {
        response = await tenantAPI.getDashboard()
      } else if (user.role === 'landlord') {
        throw new Error('Landlord dashboard API is not available yet')
      } else {
        throw new Error('Invalid user role')
      }

      setDashboardData(response.data)
      setLoading(false)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch dashboard data'
      setError(errorMessage)
      setLoading(false)
      return null
    }
  }

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      setError(null)
      const response = await userAPI.updateProfile(updatedData)
      setUser(response.data.user)
      return { success: true, user: response.data.user }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    dashboardData,

    // Actions
    login,
    signup,
    logout,
    fetchDashboardData,
    updateUserProfile,
    clearError,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext

