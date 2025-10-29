import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import teacherService from '../../services/teacherService'
import './TeacherList.css'

const TeacherList = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const data = await teacherService.getAllTeachers()
      setTeachers(data.teachers)
    } catch (err) {
      setError(err.message || 'Failed to load teachers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
      try {
        await teacherService.deleteTeacher(id)
        loadTeachers() // Reload the list
      } catch (err) {
        alert(err.message || 'Failed to delete teacher')
      }
    }
  }

  const handleExport = async () => {
    try {
      await teacherService.exportTeachers()
    } catch (err) {
      alert(err.message || 'Failed to export teachers')
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="teacher-list">
        <div className="page-header">
          <h2>Data Guru</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="teacher-list">
        <div className="page-header">
          <h2>Data Guru</h2>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="teacher-list">
      <div className="page-header">
        <h2>Data Guru</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Cari guru..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn btn-success mr-2" onClick={handleExport}>
              Export Excel
            </button>
            <Link to="/teachers/new" className="btn btn-primary">
              Tambah Guru
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {filteredTeachers.length === 0 ? (
            <div className="text-center">
              <p>Tidak ada data guru ditemukan.</p>
              {searchTerm && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSearchTerm('')}
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Guru</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                    <th>Pendidikan</th>
                    <th>No. HP</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>{teacher.teacher_id}</td>
                      <td>{teacher.full_name}</td>
                      <td>{teacher.gender}</td>
                      <td>{teacher.education}</td>
                      <td>{teacher.phone}</td>
                      <td>
                        <Link 
                          to={`/teachers/edit/${teacher.id}`} 
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(teacher.id)}
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

export default TeacherList