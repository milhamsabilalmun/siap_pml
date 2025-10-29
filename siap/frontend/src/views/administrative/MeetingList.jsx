import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import administrativeService from '../../services/administrativeService'
import './MeetingList.css'

const MeetingList = () => {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadMeetings()
  }, [])

  const loadMeetings = async () => {
    try {
      setLoading(true)
      const data = await administrativeService.getAllMeetingMinutes()
      setMeetings(data.meetings)
    } catch (err) {
      setError(err.message || 'Failed to load meeting minutes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus notula rapat ini?')) {
      try {
        await administrativeService.deleteMeetingMinute(id)
        loadMeetings() // Reload the list
      } catch (err) {
        alert(err.message || 'Failed to delete meeting minute')
      }
    }
  }

  const filteredMeetings = meetings.filter(meeting =>
    meeting.meeting_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.agenda.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="meeting-list">
        <div className="page-header">
          <h2>Notula Rapat</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="meeting-list">
        <div className="page-header">
          <h2>Notula Rapat</h2>
        </div>
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="meeting-list">
      <div className="page-header">
        <h2>Notula Rapat</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Cari notula rapat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/administrative/meetings/new" className="btn btn-primary">
            Tambah Notula
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {filteredMeetings.length === 0 ? (
            <div className="text-center">
              <p>Tidak ada notula rapat ditemukan.</p>
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
                    <th>Judul Rapat</th>
                    <th>Tanggal</th>
                    <th>Agenda</th>
                    <th>Participants</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td>{meeting.meeting_title}</td>
                      <td>{new Date(meeting.meeting_date).toLocaleDateString('id-ID')}</td>
                      <td>{meeting.agenda}</td>
                      <td>{meeting.participants}</td>
                      <td>
                        <Link 
                          to={`/administrative/meetings/edit/${meeting.id}`} 
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(meeting.id)}
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

export default MeetingList