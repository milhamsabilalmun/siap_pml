import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2 className="header-title">SIAP</h2>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">
            {JSON.parse(localStorage.getItem('user') || '{}').username || 'User'}
          </span>
          <button 
            className="btn btn-danger btn-sm ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header