import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  function submit(e){
    e.preventDefault()
    // quick local flow for scaffold
    navigate('/')
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🧠 PsicoFlow</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded p-2" type="email" defaultValue="admin@psicoflow.com" />
        </div>
        <div>
          <label className="block text-sm">Senha</label>
          <input className="w-full border rounded p-2" type="password" defaultValue="Senha123!" />
        </div>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  )
}
