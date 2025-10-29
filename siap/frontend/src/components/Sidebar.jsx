import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const userRole = JSON.parse(localStorage.getItem('user') || '{}').role || 'guru'

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      roles: ['admin', 'wali_kelas', 'guru']
    },
    {
      title: 'Data Guru',
      path: '/teachers',
      icon: 'school',
      roles: ['admin', 'wali_kelas', 'guru']
    },
    {
      title: 'Data Siswa',
      path: '/students',
      icon: 'people',
      roles: ['admin', 'wali_kelas', 'guru']
    },
    {
      title: 'Administrasi',
      path: '/administrative/documents',
      icon: 'description',
      roles: ['admin', 'wali_kelas', 'guru'],
      submenu: [
        {
          title: 'Surat Masuk/Keluar',
          path: '/administrative/documents',
          roles: ['admin', 'wali_kelas', 'guru']
        },
        {
          title: 'Notula Rapat',
          path: '/administrative/meetings',
          roles: ['admin', 'wali_kelas', 'guru']
        }
      ]
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  )

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>SIAP</h3>
        <p>Sistem Informasi dan Aplikasi Pendidikan</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {filteredMenuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className={isActive(item.path) ? 'active' : ''}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </Link>
              
              {item.submenu && (
                <ul className="submenu">
                  {item.submenu
                    .filter(subItem => subItem.roles.includes(userRole))
                    .map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link 
                          to={subItem.path} 
                          className={isActive(subItem.path) ? 'active' : ''}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar