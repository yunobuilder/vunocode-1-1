'use client'

import React, { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then((data: User[]) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">👥 Usuários cadastrados</h1>

      {loading && <p>Carregando...</p>}

      {!loading && users.length === 0 && <p>Nenhum usuário encontrado.</p>}

      {!loading && users.length > 0 && (
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.id} className="p-4 bg-white rounded shadow">
              <p><strong>ID:</strong> {u.id}</p>
              <p><strong>Nome:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Criado em:</strong> {new Date(u.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
