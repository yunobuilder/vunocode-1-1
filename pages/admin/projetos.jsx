import { useState, useEffect } from 'react'
import MiniChatVunoIA from '../../components/admin/MiniChatVunoIA'
import Sidebar from '../../components/admin/Sidebar'
import TopBar from '../../components/admin/TopBar'
import { useRouter } from 'next/router'

export default function ProjetosAdmin() {
  const [projetos, setProjetos] = useState([])
  const [novoProjeto, setNovoProjeto] = useState('')
  const [estrategias, setEstrategias] = useState({})
  const [fasesTexto, setFasesTexto] = useState({})
  const router = useRouter()

  const carregarProjetos = async () => {
    const res = await fetch('/api/projetos/list')
    const data = await res.json()
    setProjetos(data)
  }

  useEffect(() => {
    carregarProjetos()
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
    carregarProjetos()
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
    const fases = texto.split('\n')
    await fetch('/api/projetos/save-fases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projeto: nomeProjeto, fases })
    })
  }

  const handleEnter = (e, callback) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      callback()
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="p-6">
          <button onClick={() => router.back()} className="mb-4 text-sm text-blue-600 underline">← Voltar</button>
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
                carregarProjetos()
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

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="font-semibold text-sm">Enviar Arquivo:</label>
                  <input type="file" onChange={e => handleUpload(e, proj.nome)} className="block mt-1" />

                  <label className="block font-semibold text-sm mt-4 mb-1">📄 Arquivos:</label>
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
                            carregarProjetos()
                          }}
                          className="text-red-600 text-xs ml-2"
                        >
                          Excluir
                        </button>
                      </li>
                    ))}
                  </ul>

                  <label className="block font-semibold text-sm mt-6 mb-1">💡 Estratégia do Projeto (com IA):</label>
                  <textarea
                    className="w-full border p-2 rounded text-sm"
                    rows={4}
                    placeholder="Descreva aqui a visão geral, foco do projeto ou peça ajuda à IA..."
                    value={estrategias[proj.nome] || ''}
                    onChange={e => setEstrategias(prev => ({ ...prev, [proj.nome]: e.target.value }))}
                    onKeyDown={e => handleEnter(e, () => handleSalvarEstrategia(proj.nome))}
                  />
                  <button
                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => handleSalvarEstrategia(proj.nome)}
                  >
                    Enviar para IA
                  </button>

                  <label className="block font-semibold text-sm mt-6 mb-1">📌 Etapas / Fases:</label>
                  <textarea
                    className="w-full border p-2 rounded text-sm"
                    rows={3}
                    placeholder="Ex: Fase 1 - Estrutura, Fase 2 - Login, Fase 3 - API, etc."
                    value={fasesTexto[proj.nome] || ''}
                    onChange={e => setFasesTexto(prev => ({ ...prev, [proj.nome]: e.target.value }))}
                    onKeyDown={e => handleEnter(e, () => handleSalvarFases(proj.nome))}
                  />
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                    onClick={() => handleSalvarFases(proj.nome)}
                  >
                    Salvar Estrutura
                  </button>
                </div>

                <div>
                  <div className="border rounded p-2 h-full bg-gray-50 min-h-[350px] max-h-[100%]">
                    <MiniChatVunoIA projeto={proj.nome} salvar />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
