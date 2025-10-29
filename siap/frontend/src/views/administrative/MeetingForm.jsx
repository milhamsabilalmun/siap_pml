import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import administrativeService from '../../services/administrativeService'

const MeetingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    meeting_title: '',
    meeting_date: '',
    participants: '',
    agenda: '',
    minutes: '',
    file: null
  })

  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      loadMeeting()
    }
  }, [id])

  const loadMeeting = async () => {
    try {
      setLoading(true)
      const data = await administrativeService.getMeetingMinuteById(id)
      setFormData({
        ...data.meeting,
        file: null // We don't load the actual file, just keep it null
      })
      setFileName(data.meeting.file_name || '')
    } catch (err) {
      setError(err.message || 'Failed to load meeting data')
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
        await administrativeService.updateMeetingMinute(id, formData)
      } else {
        await administrativeService.createMeetingMinute(formData)
      }
      navigate('/administrative/meetings')
    } catch (err) {
      setError(err.message || 'Failed to save meeting data')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="meeting-form">
        <div className="page-header">
          <h2>{isEdit ? 'Edit Notula Rapat' : 'Tambah Notula Rapat'}</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="meeting-form">
      <div className="page-header">
        <h2>{isEdit ? 'Edit Notula Rapat' : 'Tambah Notula Rapat'}</h2>
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
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="meeting_title">Judul Rapat *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="meeting_title"
                    name="meeting_title"
                    value={formData.meeting_title}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="meeting_date">Tanggal Rapat *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="meeting_date"
                    name="meeting_date"
                    value={formData.meeting_date}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="participants">Peserta Rapat</label>
                  <input
                    type="text"
                    className="form-control"
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={onChange}
                  />
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="agenda">Agenda *</label>
                  <textarea
                    className="form-control"
                    id="agenda"
                    name="agenda"
                    rows="3"
                    value={formData.agenda}
                    onChange={onChange}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="minutes">Notula</label>
                  <textarea
                    className="form-control"
                    id="minutes"
                    name="minutes"
                    rows="5"
                    value={formData.minutes}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="file">File Pendukung</label>
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
                onClick={() => navigate('/administrative/meetings')}
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

export default MeetingForm