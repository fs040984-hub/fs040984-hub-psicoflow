import React from 'react'

export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2 bg-white p-4 rounded shadow">Dashboard (v0.1)</div>
      <aside className="bg-white p-4 rounded shadow">Resumo</aside>
    </div>
  )
}
