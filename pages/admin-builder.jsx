import React, { useState, useEffect, useCallback } from 'react'
import TopBar from '../components/admin/TopBar'
import Sidebar from '../components/admin/Sidebar'
import ExecutorControls from '../components/executor/ExecutorControls'
import PreviewModal from '../components/executor/PreviewModal'
import { languageToPath, languageToExt } from '../utils/languageMap'

export default function AdminBuilder() {
  // Estados
  const [jsonInput, setJsonInput] = useState('')
  const [mode, setMode] = useState('auto')
  const [language, setLanguage] = useState('auto')
  const [previewFiles, setPreviewFiles] = useState([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [log, setLog] = useState('')
  const [history, setHistory] = useState([])
  const [trilhaAtual, setTrilhaAtual] = useState('')
  const [trilhasDisponiveis, setTrilhasDisponiveis] = useState([])
  const [projetoSelecionado, setProjetoSelecionado] = useState('')
  const [novoProjeto, setNovoProjeto] = useState('')
  const [projetosDisponiveis, setProjetosDisponiveis] = useState([])
  const [chatPrompt, setChatPrompt] = useState('')
  const [chatResposta, setChatResposta] = useState('')
  const [carregandoChat, setCarregandoChat] = useState(false)
  const [loadingRun, setLoadingRun] = useState(false)

  // Fetch genérico
  const fetchJSON = useCallback(async (url, options) => {
    const res = await fetch(url, options)
    const text = await res.text()
    let json
    try {
      json = JSON.parse(text)
    } catch {
      throw new Error(`Erro ${res.status}: resposta não é JSON válido — ${text}`)
    }
    if (!res.ok) {
      throw new Error(json.message || `Erro ${res.status}`)
    }
    return json
  }, [])

  // Funções de carregamento
  const fetchHistory = useCallback(async () => {
    try {
      const data = await fetchJSON('/api/history')
      setHistory(data)
    } catch (err) {
      console.error('[fetchHistory]', err)
    }
  }, [fetchJSON])

  const fetchTrilhas = useCallback(async () => {
    try {
      const data = await fetchJSON('/api/roadmaps/list')
      setTrilhasDisponiveis(data)
    } catch (err) {
      console.error('[fetchTrilhas]', err)
      setTrilhasDisponiveis([])
    }
  }, [fetchJSON])

  const fetchProjetos = useCallback(async () => {
    try {
      // Atualizado para usar endpoint /api/projetos/list
      const data = await fetchJSON('/api/projetos/list')
      // Extrai apenas os nomes para o seletor
      setProjetosDisponiveis(data.map(p => p.nome))
    } catch (err) {
      console.error('[fetchProjetos]', err)
      setProjetosDisponiveis([])
    }
  }, [fetchJSON])

  // Outras callbacks
  const criarProjeto = useCallback(async () => {
    if (!novoProjeto.trim()) return
    try {
      await fetchJSON('/api/projetos/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoProjeto.trim() })
      })
      setNovoProjeto('')
      fetchProjetos()
    } catch (err) {
      console.error('[criarProjeto]', err)
      setLog(prev => prev + `❌ Falha ao criar projeto: ${err.message}\n`)
    }
  }, [novoProjeto, fetchJSON, fetchProjetos])

  const gerarComIA = useCallback(async () => {
    if (!chatPrompt.trim()) return
    setCarregandoChat(true)
    try {
      const data = await fetchJSON('/api/validate-and-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: chatPrompt })
      })
      setChatResposta(JSON.stringify(data.jsonCorrigido ?? data, null, 2))
    } catch (err) {
      console.error('[gerarComIA]', err)
      setChatResposta(`⚠️ Erro: ${err.message}`)
    } finally {
      setCarregandoChat(false)
    }
  }, [chatPrompt, fetchJSON])

  const handleRun = useCallback(async () => {
    if (!jsonInput.trim()) {
      setLog(prev => prev + '⚠️ Insira um JSON antes de executar.\n')
      return
    }
    setLoadingRun(true)
    setLog(prev => prev + '🧠 Validando instrução com IA...\n')
    try {
      const resultado = await fetchJSON('/api/validate-and-fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: jsonInput })
      })
      const jsonCorrigido = resultado.jsonCorrigido ?? resultado
      if (!Array.isArray(jsonCorrigido.arquivos)) {
        setLog(prev => prev + '❌ JSON inválido: esperado { arquivos: [...] }\n')
        return
      }
      const mapped = jsonCorrigido.arquivos.map(f => {
        const basePath = languageToPath[language] ?? ''
        const ext = languageToExt[language] ?? ''
        const filePath = f.path.includes('/') ? f.path : `${basePath}${f.path}${ext}`
        return { path: filePath, content: f.content }
      })
      setPreviewFiles(mapped)
      setLog(prev => prev + `✅ ${mapped.length} arquivo(s) pronto(s). Tempo: ${resultado.durationMs || '-'}ms\n`)
      setIsPreviewOpen(true)
    } catch (err) {
      console.error('[handleRun]', err)
      setLog(prev => prev + `❌ Erro na validação: ${err.message}\n`)
    } finally {
      setLoadingRun(false)
    }
  }, [jsonInput, language, fetchJSON])

  const confirmExecute = useCallback(async () => {
    if (!projetoSelecionado) {
      setLog(prev => prev + '⚠️ Nenhum projeto selecionado.\n')
      return
    }
    setIsPreviewOpen(false)
    setLog(prev => prev + `🚀 Executando no projeto "${projetoSelecionado}"...\n`)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previewFiles)
      })
      const text = await res.text()
      const result = JSON.parse(text)
      if (!res.ok) throw new Error(result.error || 'Erro na execução')
      setLog(prev => prev + `✅ ${result.message ?? 'Execução concluída.'}\n`)

      const entry = {
        timestamp: new Date().toISOString(),
        type: mode,
        trilha: trilhaAtual,
        projeto: projetoSelecionado,
        files: result.files ?? previewFiles.map(f => f.path)
      }
      await fetchJSON('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      })
      setHistory(prev => [entry, ...prev])
      setJsonInput('')
    } catch (err) {
      console.error('[confirmExecute]', err)
      setLog(prev => prev + `❌ Erro na execução: ${err.message}\n`)
    }
  }, [projetoSelecionado, previewFiles, mode, trilhaAtual, fetchJSON])

  // useEffect após todas as callbacks
  useEffect(() => {
    fetchHistory()
    fetchTrilhas()
    fetchProjetos()
  }, [fetchHistory, fetchTrilhas, fetchProjetos])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            AdminBuilder – Núcleo Técnico 🚀
          </h1>

          <div className="flex gap-4 items-center mb-4">
            <input
              type="text"
              placeholder="Nome do Projeto"
              value={novoProjeto}
              onChange={e => setNovoProjeto(e.target.value)}
              className="border p-2 rounded text-sm"
            />
            <button
              onClick={criarProjeto}
              disabled={!novoProjeto.trim()}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >Salvar Projeto</button>
            <select
              value={projetoSelecionado}
              onChange={e => setProjetoSelecionado(e.target.value)}
              className="p-2 border rounded text-sm"
            >
              <option value="">Escolher Projeto</option>
              {projetosDisponiveis.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Geração com IA */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">🧠 Geração com IA</h2>
              <textarea
                value={chatPrompt}
                onChange={e => setChatPrompt(e.target.value)}
                className="w-full p-2 border rounded h-32 text-sm"
                placeholder="Descreva o módulo ou código que deseja gerar"
              />
              <div className="flex gap-3 mt-2">
                <button
                  onClick={gerarComIA}
                  disabled={carregandoChat}
                  className="bg-purple-600 text-white px-4 py-1 rounded disabled:opacity-50"
                >{carregandoChat ? 'Gerando...' : 'Gerar JSON'}</button>
                {chatResposta && (
                  <button
                    onClick={() => navigator.clipboard.writeText(chatResposta)}
                    className="bg-gray-600 text-white px-4 py-1 rounded"
                  >📋 Copiar</button>
                )}
              </div>
              <pre className="mt-4 bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">
                {chatResposta || (carregandoChat ? 'Gerando...' : '—')}
              </pre>
            </div>

            {/* Execução de JSON */}
            <div className="bg-white p-4 rounded shadow">
              <ExecutorControls
                mode={mode}
                onChangeMode={setMode}
                onRun={handleRun}
                disabled={loadingRun}
              />
              <textarea
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                className="w-full p-2 border rounded h-32 font-mono text-sm mt-2"
                placeholder="Cole aqui um JSON de arquivos para executar"
              />
              {isPreviewOpen && (
                <PreviewModal
                  files={previewFiles}
                  onConfirm={confirmExecute}
                  onCancel={() => setIsPreviewOpen(false)}
                />
              )}
              <pre className="mt-4 bg-gray-50 p-2 rounded text-xs max-h-48 overflow-auto whitespace-pre-wrap">
                {log || '—'}
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}