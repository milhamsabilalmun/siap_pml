import React, { useState, useEffect } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(userData)
  }, [])

  const stats = [
    { title: 'Total Guru', value: '24', icon: 'school', color: 'primary' },
    { title: 'Total Siswa', value: '420', icon: 'people', color: 'success' },
    { title: 'Surat Masuk', value: '15', icon: 'mail', color: 'warning' },
    { title: 'Surat Keluar', value: '8', icon: 'send', color: 'info' }
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Selamat datang, {user.username}!</p>
      </div>

      <div className="row">
        {stats.map((stat, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card stat-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-title">{stat.title}</p>
                  </div>
                  <div className={`stat-icon bg-${stat.color}`}>
                    <span>{stat.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Aktivitas Terbaru</h5>
            </div>
            <div className="card-body">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon bg-primary">
                    <span>user</span>
                  </div>
                  <div className="activity-content">
                    <h6>Data guru baru ditambahkan</h6>
                    <p>Budi Santoso telah ditambahkan sebagai guru mata pelajaran Matematika</p>
                    <small className="text-muted">2 jam yang lalu</small>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon bg-success">
                    <span>file</span>
                  </div>
                  <div className="activity-content">
                    <h6>Surat masuk diterima</h6>
                    <p>Surat edaran dari Dinas Pendidikan tentang kenaikan kelas</p>
                    <small className="text-muted">5 jam yang lalu</small>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon bg-warning">
                    <span>meeting</span>
                  </div>
                  <div className="activity-content">
                    <h6>Notula rapat disimpan</h6>
                    <p>Notula rapat koordinasi semester ganjil telah disimpan</p>
                    <small className="text-muted">1 hari yang lalu</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Informasi Sistem</h5>
            </div>
            <div className="card-body">
              <ul className="info-list">
                <li>
                  <strong>Version:</strong> 1.0.0
                </li>
                <li>
                  <strong>Status:</strong> <span className="badge bg-success">Online</span>
                </li>
                <li>
                  <strong>Last Update:</strong> 25 Oktober 2023
                </li>
                <li>
                  <strong>User Role:</strong> {user.role}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h5>Pengumuman</h5>
            </div>
            <div className="card-body">
              <div className="announcement">
                <h6>Pembagian Jadwal Mengajar</h6>
                <p>Jadwal mengajar semester ganjil telah tersedia. Silakan unduh di menu Data Guru.</p>
                <small className="text-muted">3 hari yang lalu</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard