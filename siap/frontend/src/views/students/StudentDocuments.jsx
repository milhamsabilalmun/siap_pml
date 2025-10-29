import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import studentService from '../../services/studentService'
import './StudentDocuments.css'

const StudentDocuments = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [documentType, setDocumentType] = useState('')

  const documentTypes = [
    { value: 'akta_kelahiran', label: 'Akta Kelahiran' },
    { value: 'ijazah', label: 'Ijazah' },
    { value: 'kk', label: 'Kartu Keluarga' },
    { value: 'ktp_orang_tua', label: 'KTP Orang Tua' },
    { value: 'kartu_lain', label: 'Kartu Lainnya' }
  ]

  useEffect(() => {
    loadStudentData()
  }, [id])

  const loadStudentData = async () => {
    try {
      setLoading(true)
      const studentData = await studentService.getStudentById(id)
      const documentsData = await studentService.getStudentDocuments(id)
      setStudent(studentData.student)
      setDocuments(documentsData.documents)
    } catch (err) {
      setError(err.message || 'Failed to load student data')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!selectedFile || !documentType) {
      alert('Please select a file and document type')
      return
    }

    setUploading(true)
    try {
      await studentService.uploadStudentDocument(id, selectedFile, documentType)
      setSelectedFile(null)
      setDocumentType('')
      loadStudentData() // Reload documents
    } catch (err) {
      alert(err.message || 'Failed to upload document')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (documentId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      try {
        await studentService.deleteStudentDocument(documentId)
        loadStudentData() // Reload documents
      } catch (err) {
        alert(err.message || 'Failed to delete document')
      }
    }
  }

  const handlePreview = (filePath) => {
    // In a real application, you would implement file preview logic here
    alert('File preview would be implemented here')
  }

  if (loading) {
    return (
      <div className="student-documents">
        <div className="page-header">
          <h2>Dokumen Siswa</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="student-documents">
        <div className="page-header">
          <h2>Dokumen Siswa</h2>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="student-documents">
      <div className="page-header">
        <h2>Dokumen Siswa</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/students')}
        >
          Kembali
        </button>
      </div>

      {student && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{student.full_name} ({student.student_id})</h5>
            <p>Kelas: {student.class}</p>
          </div>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-header">
          <h5>Upload Dokumen</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpload}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="documentType">Jenis Dokumen *</label>
                  <select
                    className="form-control"
                    id="documentType"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    required
                  >
                    <option value="">Pilih Jenis Dokumen</option>
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="file">File *</label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Dokumen'}
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Daftar Dokumen</h5>
        </div>
        <div className="card-body">
          {documents.length === 0 ? (
            <div className="text-center">
              <p>Belum ada dokumen yang diupload.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Jenis Dokumen</th>
                    <th>Nama File</th>
                    <th>Tanggal Upload</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        {documentTypes.find(type => type.value === doc.document_type)?.label || doc.document_type}
                      </td>
                      <td>{doc.file_name}</td>
                      <td>{new Date(doc.uploaded_at).toLocaleDateString('id-ID')}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-info mr-2"
                          onClick={() => handlePreview(doc.file_path)}
                        >
                          Preview
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(doc.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDocuments