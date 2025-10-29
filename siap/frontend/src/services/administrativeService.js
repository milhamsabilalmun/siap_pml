import axios from 'axios'

const API_URL = 'http://localhost:5000/api/administrative/'

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

// Get all administrative documents
const getAllDocuments = async () => {
  const response = await api.get('/documents')
  return response.data
}

// Get document by ID
const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`)
  return response.data
}

// Create new document
const createDocument = async (documentData) => {
  const formData = new FormData()
  formData.append('document_type', documentData.document_type)
  formData.append('title', documentData.title)
  formData.append('description', documentData.description)
  formData.append('document_date', documentData.document_date)
  formData.append('status', documentData.status)
  
  if (documentData.file) {
    formData.append('file', documentData.file)
  }
  
  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Update document
const updateDocument = async (id, documentData) => {
  const formData = new FormData()
  formData.append('document_type', documentData.document_type)
  formData.append('title', documentData.title)
  formData.append('description', documentData.description)
  formData.append('document_date', documentData.document_date)
  formData.append('status', documentData.status)
  
  if (documentData.file) {
    formData.append('file', documentData.file)
  }
  
  const response = await api.put(`/documents/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Delete document
const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`)
  return response.data
}

// Get all meeting minutes
const getAllMeetingMinutes = async () => {
  const response = await api.get('/meetings')
  return response.data
}

// Get meeting minute by ID
const getMeetingMinuteById = async (id) => {
  const response = await api.get(`/meetings/${id}`)
  return response.data
}

// Create new meeting minute
const createMeetingMinute = async (meetingData) => {
  const formData = new FormData()
  formData.append('meeting_title', meetingData.meeting_title)
  formData.append('meeting_date', meetingData.meeting_date)
  formData.append('participants', meetingData.participants)
  formData.append('agenda', meetingData.agenda)
  formData.append('minutes', meetingData.minutes)
  
  if (meetingData.file) {
    formData.append('file', meetingData.file)
  }
  
  const response = await api.post('/meetings', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Update meeting minute
const updateMeetingMinute = async (id, meetingData) => {
  const formData = new FormData()
  formData.append('meeting_title', meetingData.meeting_title)
  formData.append('meeting_date', meetingData.meeting_date)
  formData.append('participants', meetingData.participants)
  formData.append('agenda', meetingData.agenda)
  formData.append('minutes', meetingData.minutes)
  
  if (meetingData.file) {
    formData.append('file', meetingData.file)
  }
  
  const response = await api.put(`/meetings/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  
  return response.data
}

// Delete meeting minute
const deleteMeetingMinute = async (id) => {
  const response = await api.delete(`/meetings/${id}`)
  return response.data
}

const administrativeService = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllMeetingMinutes,
  getMeetingMinuteById,
  createMeetingMinute,
  updateMeetingMinute,
  deleteMeetingMinute
}

export default administrativeService