import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import administrativeService from '../../services/administrativeService'

const AdministrativeForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    document_type: 'surat_masuk',
    title: '',
    description: '',
    document_date: '',
    status: 'pending',
    file: null
  })

  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      loadDocument()
    }
  }, [id])

  const loadDocument = async () => {
    try {
      setLoading(true)
      const data = await administrativeService.getDocumentById(id)
      setFormData({
        ...data.document,
        file: null // We don't load the actual file, just keep it null
      })
      setFileName(data.document.file_name || '')
    } catch (err) {
      setError(err.message || 'Failed to load document data')
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, file: file })
      setFileName(file.name)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isEdit) {
        await administrativeService.updateDocument(id, formData)
      } else {
        await administrativeService.createDocument(formData)
      }
      navigate('/administrative/documents')
    } catch (err) {
      setError(err.message || 'Failed to save document data')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="administrative-form">
        <div className="page-header">
          <h2>{isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'}</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="administrative-form">
      <div className="page-header">
        <h2>{isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'}</h2>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="document_type">Jenis Dokumen *</label>
                  <select
                    className="form-control"
                    id="document_type"
                    name="document_type"
                    value={formData.document_type}
                    onChange={onChange}
                    required
                  >
                    <option value="surat_masuk">Surat Masuk</option>
                    <option value="surat_keluar">Surat Keluar</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="status">Status *</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Disetujui</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="title">Judul *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="description">Deskripsi</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="document_date">Tanggal Dokumen *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="document_date"
                    name="document_date"
                    value={formData.document_date}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="file">File</label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={onFileChange}
                  />
                  {fileName && (
                    <small className="form-text text-muted">
                      File saat ini: {fileName}
                    </small>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Simpan'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary ml-2"
                onClick={() => navigate('/administrative/documents')}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdministrativeForm