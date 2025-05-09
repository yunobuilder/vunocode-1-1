import { useState } from 'react'

export default function MiniChatVunoIA({ projeto }) {
  const [mensagem, setMensagem] = useState('')
  const [historico, setHistorico] = useState([])

  const enviarPergunta = async () => {
    if (!mensagem.trim()) return

    const entradaUsuario = `💬 Você: ${mensagem}`
    setHistorico(prev => [...prev, entradaUsuario])
    setMensagem('')

    try {
      const res = await fetch('/api/projetos/chat-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projeto, pergunta: mensagem })
      })

      const { resposta } = await res.json()
      const respostaIA = `🤖 VunoIA: ${resposta}`
      setHistorico(prev => [...prev, respostaIA])
    } catch {
      setHistorico(prev => [...prev, '❌ Erro ao conectar com a IA.'])
    }
  }

  return (
    <div className="mt-4 border rounded p-3 bg-gray-50">
      <h4 className="font-semibold text-sm mb-2 text-purple-700">💬 Mini Chat com VunoIA</h4>

      <div className="space-y-1 mb-2 text-sm max-h-40 overflow-y-auto bg-white border rounded p-2">
        {historico.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap">{msg}</div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          placeholder="Pergunte algo para a IA..."
          className="flex-1 border p-2 rounded text-sm"
        />
        <button
          className="bg-purple-600 text-white px-3 rounded text-sm"
          onClick={enviarPergunta}
        >
          Perguntar
        </button>
      </div>
    </div>
  )
}
