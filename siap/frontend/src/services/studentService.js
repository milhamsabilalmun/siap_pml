import axios from 'axios'
import { saveAs } from 'file-saver'

const API_URL = 'http://localhost:5000/api/students/'

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

// Get all students
const getAllStudents = async () => {
  const response = await api.get('/')
  return response.data
}

// Get student by ID
const getStudentById = async (id) => {
  const response = await api.get(`/${id}`)
  return response.data
}

// Create new student
const createStudent = async (studentData) => {
  const response = await api.post('/', studentData)
  return response.data
}

// Update student
const updateStudent = async (id, studentData) => {
  const response = await api.put(`/${id}`, studentData)
  return response.data
}

// Delete student
const deleteStudent = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

// Get student documents
const getStudentDocuments = async (studentId) => {
  const response = await api.get(`/${studentId}/documents`)
  return response.data
}

// Upload student document
const uploadStudentDocument = async (studentId, file, documentType) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('documentType', documentType)
  
  const response = await api.post(`/${studentId}/documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Delete student document
const deleteStudentDocument = async (documentId) => {
  const response = await api.delete(`/documents/${documentId}`)
  return response.data
}

// Export students to Excel
const exportStudents = async () => {
  const response = await api.get('/export/excel', {
    responseType: 'blob'
  })
  
  const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, 'students.xlsx')
  
  return response.data
}

// Import students from Excel
const importStudents = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/import/excel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

const studentService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDocuments,
  uploadStudentDocument,
  deleteStudentDocument,
  exportStudents,
  importStudents
}

export default studentService