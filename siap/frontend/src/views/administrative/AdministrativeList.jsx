import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import administrativeService from '../../services/administrativeService'
import './AdministrativeList.css'

const AdministrativeList = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const data = await administrativeService.getAllDocuments()
      setDocuments(data.documents)
    } catch (err) {
      setError(err.message || 'Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      try {
        await administrativeService.deleteDocument(id)
        loadDocuments() // Reload the list
      } catch (err) {
        alert(err.message || 'Failed to delete document')
      }
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || doc.document_type === filterType
    
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="administrative-list">
        <div className="page-header">
          <h2>Surat Masuk/Keluar</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="administrative-list">
        <div className="page-header">
          <h2>Surat Masuk/Keluar</h2>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="administrative-list">
      <div className="page-header">
        <h2>Surat Masuk/Keluar</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div className="filters">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Cari dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ display: 'inline-block', width: '200px' }}
            />
            <select
              className="form-control"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ display: 'inline-block', width: '150px' }}
            >
              <option value="all">Semua Jenis</option>
              <option value="surat_masuk">Surat Masuk</option>
              <option value="surat_keluar">Surat Keluar</option>
            </select>
          </div>
          <Link to="/administrative/documents/new" className="btn btn-primary">
            Tambah Dokumen
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {filteredDocuments.length === 0 ? (
            <div className="text-center">
              <p>Tidak ada dokumen ditemukan.</p>
              {(searchTerm || filterType !== 'all') && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterType('all')
                  }}
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Jenis</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Tanggal Dokumen</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <span className={`badge bg-${doc.document_type === 'surat_masuk' ? 'info' : 'success'}`}>
                          {doc.document_type === 'surat_masuk' ? 'Surat Masuk' : 'Surat Keluar'}
                        </span>
                      </td>
                      <td>{doc.title}</td>
                      <td>{doc.description}</td>
                      <td>{new Date(doc.document_date).toLocaleDateString('id-ID')}</td>
                      <td>
                        <span className={`badge bg-${doc.status === 'approved' ? 'success' : doc.status === 'rejected' ? 'danger' : 'warning'}`}>
                          {doc.status === 'approved' ? 'Disetujui' : doc.status === 'rejected' ? 'Ditolak' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <Link 
                          to={`/administrative/documents/edit/${doc.id}`} 
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </Link>
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

export default AdministrativeList