import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import Dashboard from './views/Dashboard'
import TeacherList from './views/teachers/TeacherList'
import TeacherForm from './views/teachers/TeacherForm'
import StudentList from './views/students/StudentList'
import StudentForm from './views/students/StudentForm'
import StudentDocuments from './views/students/StudentDocuments'
import AdministrativeList from './views/administrative/AdministrativeList'
import AdministrativeForm from './views/administrative/AdministrativeForm'
import MeetingList from './views/administrative/MeetingList'
import MeetingForm from './views/administrative/MeetingForm'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Teacher Routes */}
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teachers/new" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />
        
        {/* Student Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/new" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
        <Route path="/students/documents/:id" element={<StudentDocuments />} />
        
        {/* Administrative Routes */}
        <Route path="/administrative/documents" element={<AdministrativeList />} />
        <Route path="/administrative/documents/new" element={<AdministrativeForm />} />
        <Route path="/administrative/documents/edit/:id" element={<AdministrativeForm />} />
        
        <Route path="/administrative/meetings" element={<MeetingList />} />
        <Route path="/administrative/meetings/new" element={<MeetingForm />} />
        <Route path="/administrative/meetings/edit/:id" element={<MeetingForm />} />
      </Route>
    </Routes>
  )
}

export default App