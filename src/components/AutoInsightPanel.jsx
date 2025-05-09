// src/components/AutoInsightPanel.jsx
import React, { useState } from 'react'

export default function AutoInsightPanel() {
  const [resultado, setResultado] = useState('')
  const [carregando, setCarregando] = useState(false)

  const analisarProjeto = async () => {
    setCarregando(true)
    setResultado('Analisando estrutura do VUNOCODE...\n')
    try {
      const res = await fetch('/api/autoInsight')
      const data = await res.json()
      if (data.sugestoes) {
        setResultado(data.sugestoes)
      } else {
        setResultado('Nenhuma sugestão retornada.')
      }
    } catch (err) {
      setResultado('Erro ao gerar insight.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="bg-white shadow p-4 rounded mb-6 max-w-4xl">
      <h2 className="font-semibold text-lg mb-2">🔎 Análise Inteligente do Projeto</h2>
      <button
        onClick={analisarProjeto}
        disabled={carregando}
        className="mb-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {carregando ? 'Analisando...' : 'Gerar Auto Insight'}
      </button>
      <textarea
        value={resultado}
        readOnly
        className="w-full h-64 p-3 border rounded bg-gray-100 text-sm font-mono"
        placeholder="Resultado da análise da IA aparecerá aqui..."
      />
    </div>
  )
}
