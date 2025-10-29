import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../../services/authService'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { username, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await authService.login(username, password)
      
      // Save token and user data to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Redirect based on role
      switch (data.user.role) {
        case 'admin':
          navigate('/dashboard')
          break
        case 'wali_kelas':
          navigate('/dashboard')
          break
        case 'guru':
          navigate('/dashboard')
          break
        default:
          navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="text-center mt-3">
          <p className="mb-0">
            <strong>Credentials:</strong><br />
            Admin: admin / password<br />
            Wali Kelas: walikelas / password<br />
            Guru: guru1 / password
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login