import { useState } from 'react'

export default function AutoSuggestBox({ onGenerate }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')

  const handleSuggest = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')

    try {
      const res = await fetch('/api/roadmapSuggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: input })
      })
      const data = await res.json()
      setOutput(data.suggestion || 'Sem resposta.')
    } catch {
      setOutput('Erro ao buscar sugestão.')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-2">🧠 Gerador de Módulos por Roadmap</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full border p-2 rounded mb-2 text-sm"
        placeholder="Ex: Criar sistema de login com Firebase"
      />
      <button
        onClick={handleSuggest}
        disabled={loading}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-sm"
      >
        {loading ? 'Gerando...' : 'Gerar com IA'}
      </button>
      {output && (
        <pre className="mt-3 p-3 bg-gray-50 rounded text-sm whitespace-pre-wrap font-mono">
          {output}
        </pre>
      )}
    </div>
  )
}
