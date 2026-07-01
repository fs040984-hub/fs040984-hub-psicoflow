import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PatientsList from './pages/Patients/PatientsList'
import { getToken, logout, getUser } from './services/auth'

function ProtectedRoute({ children }){
  const token = getToken()
  if(!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  const user = getUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="font-bold">🧠 PsicoFlow</div>
          <div className="space-x-4 flex items-center">
            <Link to="/">Dashboard</Link>
            <Link to="/patients">Pacientes</Link>
            {user ? (
              <>
                <span className="text-sm text-gray-600 ml-2">{user.nome || user.email}</span>
                <button className="ml-3 text-sm text-red-600" onClick={()=>{ logout(); window.location.href='/login' }}>Sair</button>
              </>
            ) : (
              <Link to="/login">Entrar</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><PatientsList/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
