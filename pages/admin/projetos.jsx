import { useState, useEffect } from 'react'
import MiniChatVunoIA from '../../components/admin/MiniChatVunoIA'

export default function ProjetosAdmin() {
  const [projetos, setProjetos] = useState([])
  const [novoProjeto, setNovoProjeto] = useState('')
  const [estrategias, setEstrategias] = useState({})
  const [fasesTexto, setFasesTexto] = useState({})

  useEffect(() => {
    fetch('/api/projetos/list')
      .then(res => res.json())
      .then(setProjetos)
  }, [])

  const handleUpload = async (e, nomeProjeto) => {
    const formData = new FormData()
    formData.append('arquivo', e.target.files[0])
    formData.append('projeto', nomeProjeto)

    await fetch('/api/projetos/upload', {
      method: 'POST',
      body: formData,
    })

    e.target.value = ''
    window.location.reload()
  }

  const handleSalvarEstrategia = async (nomeProjeto) => {
    const texto = estrategias[nomeProjeto] || ''
    await fetch('/api/projetos/save-strategy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projeto: nomeProjeto, texto })
    })
  }

  const handleSalvarFases = async (nomeProjeto) => {
    const texto = fasesTexto[nomeProjeto] || ''
    const fases = texto.split('\\n')
    await fetch('/api/projetos/save-fases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projeto: nomeProjeto, fases })
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">📁 Gerenciador de Projetos</h1>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          value={novoProjeto}
          onChange={e => setNovoProjeto(e.target.value)}
          placeholder="Nome do novo projeto"
          className="border p-2 rounded w-64"
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            await fetch('/api/projetos/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nome: novoProjeto }),
            })
            setNovoProjeto('')
            window.location.reload()
          }}
        >
          Criar Projeto
        </button>
      </div>

      {projetos.map((proj, idx) => (
        <div key={idx} className="bg-white rounded shadow p-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-purple-700">{proj.nome}</h2>
            <span className="text-sm text-gray-500">{proj.dataCriacao}</span>
          </div>

          <div className="mt-4">
            <label className="font-semibold text-sm">Enviar Arquivo:</label>
            <input type="file" onChange={e => handleUpload(e, proj.nome)} className="block mt-1" />
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-sm mb-1">📄 Arquivos:</h3>
            <ul className="text-sm list-disc pl-5">
              {proj.arquivos.map((arq, i) => (
                <li key={i}>
                  <a
                    href={`/api/projetos/download?projeto=${proj.nome}&file=${arq}`}
                    className="text-blue-600 underline mr-2"
                    download
                  >
                    {arq}
                  </a>
                  <button
                    onClick={async () => {
                      await fetch('/api/projetos/delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ projeto: proj.nome, file: arq }),
                      })
                      window.location.reload()
                    }}
                    className="text-red-600 text-xs ml-2"
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <label className="block font-semibold text-sm mb-1">💡 Estratégia do Projeto (com IA):</label>
            <textarea
              className="w-full border p-2 rounded text-sm"
              rows={4}
              placeholder="Descreva aqui a visão geral, foco do projeto ou peça ajuda à IA..."
              value={estrategias[proj.nome] || ''}
              onChange={e => setEstrategias(prev => ({ ...prev, [proj.nome]: e.target.value }))}
            />
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => handleSalvarEstrategia(proj.nome)}
            >
              Enviar para IA
            </button>
          </div>

          <div className="mt-4">
            <label className="block font-semibold text-sm mb-1">📌 Etapas / Fases:</label>
            <textarea
              className="w-full border p-2 rounded text-sm"
              rows={3}
              placeholder="Ex: Fase 1 - Estrutura, Fase 2 - Login, Fase 3 - API, etc."
              value={fasesTexto[proj.nome] || ''}
              onChange={e => setFasesTexto(prev => ({ ...prev, [proj.nome]: e.target.value }))}
            />
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => handleSalvarFases(proj.nome)}
            >
              Salvar Estrutura
            </button>
          </div>

          {/* Mini Chat por Projeto */}
          <div className="mt-6 border-t pt-4">
            <MiniChatVunoIA projeto={proj.nome} />
          </div>
        </div>
      ))}
    </div>
  )
}
