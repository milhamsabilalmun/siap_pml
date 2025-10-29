import axios from 'axios'
import { saveAs } from 'file-saver'

const API_URL = 'http://localhost:5000/api/teachers/'

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

// Get all teachers
const getAllTeachers = async () => {
  const response = await api.get('/')
  return response.data
}

// Get teacher by ID
const getTeacherById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

// Create new teacher
const createTeacher = async (teacherData) => {
  const response = await api.post('/', teacherData)
  return response.data
}

// Update teacher
const updateTeacher = async (id, teacherData) => {
  const response = await api.put(`/${id}`, teacherData)
  return response.data
}

// Delete teacher
const deleteTeacher = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

// Export teachers to Excel
const exportTeachers = async () => {
  const response = await api.get('/export/excel', {
    responseType: 'blob'
  })
  
  const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, 'teachers.xlsx')
  
  return response.data
}

// Import teachers from Excel
const importTeachers = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/import/excel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

const teacherService = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  exportTeachers,
  importTeachers
}

export default teacherService