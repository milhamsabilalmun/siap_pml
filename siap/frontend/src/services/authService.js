import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL
})

// Add a request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Login user
const login = async (username, password) => {
  const response = await api.post('login', { username, password })
  return response.data
}

// Get user profile
const getProfile = async () => {
  const response = await api.get('profile')
  return response.data
}

const authService = {
  login,
  getProfile
}

export default authService