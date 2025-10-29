import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h1>SIAP</h1>
          <p>Sistem Informasi dan Aplikasi Pendidikan</p>
        </div>
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout