import { useState } from 'react'

export default function RoadmapPreview() {
  const [instruction, setInstruction] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchSuggestion = async () => {
    setLoading(true)
    setSuggestion('')
    try {
      const res = await fetch('/api/roadmapSuggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction })
      })
      const data = await res.json()
      if (data.suggestion) {
        setSuggestion(data.suggestion)
      } else {
        setSuggestion('❌ Nenhuma sugestão gerada.')
      }
    } catch {
      setSuggestion('❌ Erro ao consultar a IA.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
      <h2 className="text-lg font-semibold mb-2">💡 Sugestão de Roadmap com IA</h2>
      <textarea
        value={instruction}
        onChange={e => setInstruction(e.target.value)}
        placeholder="Descreva o sistema ou módulo desejado..."
        className="w-full p-2 border rounded text-sm mb-2 h-24 font-mono"
      />
      <button
        onClick={fetchSuggestion}
        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? 'Gerando...' : 'Gerar Roadmap'}
      </button>
      {suggestion && (
        <pre className="bg-gray-100 text-sm p-3 mt-4 rounded whitespace-pre-wrap">
          {suggestion}
        </pre>
      )}
    </div>
  )
}
