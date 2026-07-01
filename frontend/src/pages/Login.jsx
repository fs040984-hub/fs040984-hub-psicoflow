import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as doLogin } from '../services/auth'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@psicoflow.com')
  const [password, setPassword] = useState('Senha123!')
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    setError(null)
    try{
      await doLogin(email, password)
      navigate('/')
    }catch(err){
      console.error(err)
      setError('Falha no login. Verifique suas credenciais e se o backend está rodando.')
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🧠 PsicoFlow</h2>
      <form onSubmit={submit} className="space-y-3">
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded p-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Senha</label>
          <input className="w-full border rounded p-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="w-full bg-indigo-600 text-white p-2 rounded" type="submit">Entrar</button>
      </form>
    </div>
  )
}
