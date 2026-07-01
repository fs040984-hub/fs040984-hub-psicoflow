import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PatientsList from './pages/Patients/PatientsList'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <div className="font-bold">🧠 PsicoFlow</div>
          <div className="space-x-4">
            <Link to="/">Dashboard</Link>
            <Link to="/patients">Pacientes</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/patients" element={<PatientsList/>} />
        </Routes>
      </main>
    </div>
  )
}
