import { useState, useEffect, useRef } from 'react'

export default function MiniChatVunoIA({ projeto, salvar = true }) {
  const [mensagens, setMensagens] = useState([])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const scrollRef = useRef()

  useEffect(() => {
    fetch(`/api/projetos/chat-log?projeto=${projeto}`)
      .then(res => res.json())
      .then(data => setMensagens(data.chat || []))
  }, [projeto])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  const enviarMensagem = async () => {
    if (!input.trim()) return

    const novaEntrada = { role: 'user', content: input }
    const novaLista = [...mensagens, novaEntrada]
    setMensagens(novaLista)
    setInput('')
    setCarregando(true)

    try {
      const res = await fetch('/api/projetos/chat-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projeto, mensagens: novaLista })
      })

      const data = await res.json()
      if (data.resposta) {
        const respostaIA = { role: 'assistant', content: data.resposta }
        const atualizada = [...novaLista, respostaIA]
        setMensagens(atualizada)

        if (salvar) {
          await fetch('/api/projetos/chat-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projeto, mensagens: atualizada })
          })
        }
      }
    } catch (err) {
      console.error('Erro ao consultar IA:', err)
    }

    setCarregando(false)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensagem()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto border rounded p-2 bg-white text-sm space-y-2">
        {mensagens.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-gray-100 text-right' : 'bg-purple-100 text-left'}`}>
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <textarea
        rows={2}
        placeholder="Digite e pressione Enter para enviar..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleEnter}
        className="border p-2 mt-2 rounded text-sm resize-none"
      />

      {carregando && <div className="text-xs text-gray-500 mt-1">Gerando resposta...</div>}
    </div>
  )
}
