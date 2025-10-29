import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import studentService from '../../services/studentService'
import './StudentList.css'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const data = await studentService.getAllStudents()
      setStudents(data.students)
    } catch (err) {
      setError(err.message || 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      try {
        await studentService.deleteStudent(id)
        loadStudents() // Reload the list
      } catch (err) {
        alert(err.message || 'Failed to delete student')
      }
    }
  }

  const handleExport = async () => {
    try {
      await studentService.exportStudents()
    } catch (err) {
      alert(err.message || 'Failed to export students')
    }
  }

  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="student-list">
        <div className="page-header">
          <h2>Data Siswa</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="student-list">
        <div className="page-header">
          <h2>Data Siswa</h2>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="student-list">
      <div className="page-header">
        <h2>Data Siswa</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn btn-success mr-2" onClick={handleExport}>
              Export Excel
            </button>
            <Link to="/students/new" className="btn btn-primary">
              Tambah Siswa
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {filteredStudents.length === 0 ? (
            <div className="text-center">
              <p>Tidak ada data siswa ditemukan.</p>
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
                    <th>NIS</th>
                    <th>Nama Lengkap</th>
                    <th>Kelas</th>
                    <th>Jenis Kelamin</th>
                    <th>Tempat, Tanggal Lahir</th>
                    <th>Nama Orang Tua</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.student_id}</td>
                      <td>{student.full_name}</td>
                      <td>{student.class}</td>
                      <td>{student.gender}</td>
                      <td>{student.place_of_birth}, {student.date_of_birth}</td>
                      <td>{student.parent_name}</td>
                      <td>
                        <Link 
                          to={`/students/documents/${student.id}`} 
                          className="btn btn-sm btn-info mr-2"
                        >
                          Dokumen
                        </Link>
                        <Link 
                          to={`/students/edit/${student.id}`} 
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(student.id)}
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

export default StudentList