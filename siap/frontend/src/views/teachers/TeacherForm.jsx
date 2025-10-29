import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import teacherService from '../../services/teacherService'

const TeacherForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    user_id: '',
    teacher_id: '',
    full_name: '',
    gender: '',
    place_of_birth: '',
    date_of_birth: '',
    religion: '',
    education: '',
    npwp: '',
    phone: '',
    address: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      loadTeacher()
    }
  }, [id])

  const loadTeacher = async () => {
    try {
      setLoading(true)
      const data = await teacherService.getTeacherById(id)
      setFormData(data.teacher)
    } catch (err) {
      setError(err.message || 'Failed to load teacher data')
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isEdit) {
        await teacherService.updateTeacher(id, formData)
      } else {
        await teacherService.createTeacher(formData)
      }
      navigate('/teachers')
    } catch (err) {
      setError(err.message || 'Failed to save teacher data')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="teacher-form">
        <div className="page-header">
          <h2>{isEdit ? 'Edit Data Guru' : 'Tambah Data Guru'}</h2>
        </div>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="teacher-form">
      <div className="page-header">
        <h2>{isEdit ? 'Edit Data Guru' : 'Tambah Data Guru'}</h2>
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
                  <label htmlFor="teacher_id">ID Guru *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="teacher_id"
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="full_name">Nama Lengkap *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="gender">Jenis Kelamin *</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={onChange}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="place_of_birth">Tempat Lahir *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="place_of_birth"
                    name="place_of_birth"
                    value={formData.place_of_birth}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="date_of_birth">Tanggal Lahir *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="religion">Agama *</label>
                  <select
                    className="form-control"
                    id="religion"
                    name="religion"
                    value={formData.religion}
                    onChange={onChange}
                    required
                  >
                    <option value="">Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen Protestan">Kristen Protestan</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="education">Pendidikan *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="npwp">NPWP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="npwp"
                    name="npwp"
                    value={formData.npwp}
                    onChange={onChange}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="phone">No. HP *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="address">Alamat *</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={onChange}
                    required
                  ></textarea>
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
                onClick={() => navigate('/teachers')}
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

export default TeacherForm