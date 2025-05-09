import { useState, useEffect } from 'react'
import TopBar from '../components/admin/TopBar'
import Sidebar from '../components/admin/Sidebar'

import ExecutorControls from '../components/executor/ExecutorControls'
import PreviewModal from '../components/executor/PreviewModal'
import { detectFormat } from '../utils/formatDetector'
import { aiProcess } from '../utils/aiExecutor'

export default function AdminBuilder() {
  // Executor
  const [jsonInput, setJsonInput] = useState('')
  const [mode, setMode] = useState('auto')
  const [previewFiles, setPreviewFiles] = useState([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [log, setLog] = useState('')

  // Relatório (Histórico)
  const [history, setHistory] = useState([])

  // Sugestão IA
  const [suggestion, setSuggestion] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [])

  // --- Histórico GET ---
  const fetchHistory = async () => {
    const res = await fetch('/api/history')
    setHistory(await res.json())
  }

  // --- Run / Translate Handler ---
  const handleRun = async () => {
    setLog(prev => prev + '🔄 Detectando formato...\n')
    try {
      const format = detectFormat(jsonInput, mode)
      setLog(prev => prev + `➡️ Formato: ${format}\n`)

      let files
      if (format === 'natural') {
        setLog(prev => prev + '🧠 Processando IA...\n')
        files = await aiProcess(jsonInput)
      } else if (format === 'json') {
        files = JSON.parse(jsonInput)
      } else {
        files = [{ path: '/src/pages/AutoGen.jsx', content: jsonInput }]
      }

      if (!Array.isArray(files)) files = [files]
      setPreviewFiles(files)
      setLog(prev => prev + `✅ ${files.length} arquivo(s) gerado(s)\n`)
      setIsPreviewOpen(true)
    } catch (err) {
      setLog(prev => prev + `❌ Erro: ${err.message}\n`)
    }
  }

  // --- Confirm + Execute + POST histórico ---
  const confirmExecute = async () => {
    setIsPreviewOpen(false)
    setLog(prev => prev + '🚀 Executando...\n')
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previewFiles),
      })
      const { message } = await res.json()
      setLog(prev => prev + `✅ ${message}\n`)

      // grava no histórico local e remoto
      const entry = {
        timestamp: new Date().toISOString(),
        type: mode,
        files: previewFiles.map(f => f.path),
      }
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      })
      setHistory(prev => [entry, ...prev])
      setJsonInput('')
    } catch {
      setLog(prev => prev + '❌ Falha execução.\n')
    }
  }

  // --- IA Suggestion ---
  const getIASuggestion = async () => {
    setLog(prev => prev + '🧠 Gerando sugestão IA...\n')
    const res = await fetch('/api/openaiProxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: jsonInput }),
    })
    const data = await res.json()
    // assume data.files
    setSuggestion(JSON.stringify(data.files, null, 2))
    setLog(prev => prev + '✅ Sugestão pronta.\n')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            AdminBuilder – Núcleo Técnico 🚀
          </h1>

          {/* Executor */}
          <div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
            <ExecutorControls
              mode={mode}
              onChangeMode={setMode}
              onRun={handleRun}
              onTranslate={handleRun}
            />
            <textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Cole aqui..."
              className="w-full h-44 p-3 border rounded font-mono text-sm"
            />
          </div>

          {/* Preview Modal */}
          {isPreviewOpen && (
            <PreviewModal
              files={previewFiles}
              onConfirm={confirmExecute}
              onCancel={() => setIsPreviewOpen(false)}
            />
          )}

          {/* Sugestão IA */}
<div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
  <h2 className="font-semibold mb-2">💡 Sugestão IA</h2>
  <textarea
    value={suggestion}
    readOnly
    className="w-full h-32 p-2 border rounded font-mono text-sm mb-2 bg-gray-50"
    placeholder='Use o botão abaixo após escrever em "Natural"'
  />
  <button
    onClick={getIASuggestion}
    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
  >
    Obter Sugestão IA
  </button>
</div>


          {/* Log */}
          <div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
            <h2 className="font-semibold mb-2">📜 Log de Execução</h2>
            <pre className="h-32 overflow-auto bg-gray-50 p-2 rounded text-xs">
              {log || '—'}
            </pre>
          </div>

          {/* Relatório */}
          <div className="bg-white p-4 rounded shadow max-w-4xl">
            <h2 className="font-semibold mb-2">🗒 Histórico de Execuções</h2>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Data</th>
                  <th className="border px-2 py-1">Tipo</th>
                  <th className="border px-2 py-1">Arquivos</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">
                      {new Date(h.timestamp).toLocaleString()}
                    </td>
                    <td className="border px-2 py-1">{h.type}</td>
                    <td className="border px-2 py-1">
                      {h.files.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
