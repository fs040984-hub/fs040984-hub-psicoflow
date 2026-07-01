import React, {useEffect, useState} from 'react'
import api from '../../services/api'

export default function PatientsList(){
  const [patients, setPatients] = useState([])
  useEffect(()=>{
    api.get('/api/patients').then(r=> setPatients(r.data)).catch(()=>setPatients([]))
  },[])
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-3">Pacientes</h3>
      <table className="w-full text-left">
        <thead><tr><th>Nome</th><th>Telefone</th></tr></thead>
        <tbody>
          {patients.map(p=> (
            <tr key={p.id}><td>{p.nome}</td><td>{p.telefone}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
