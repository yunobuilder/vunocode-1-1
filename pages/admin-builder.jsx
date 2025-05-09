import { useState, useEffect } from 'react'
import TopBar from '../components/admin/TopBar'
import Sidebar from '../components/admin/Sidebar'
import ExecutorControls from '../components/executor/ExecutorControls'
import PreviewModal from '../components/executor/PreviewModal'
import { languageToPath, languageToExt } from '../utils/languageMap'
import Link from 'next/link'

export default function AdminBuilder() {
  const [jsonInput, setJsonInput] = useState('')
  const [mode, setMode] = useState('auto')
  const [language, setLanguage] = useState('auto')
  const [previewFiles, setPreviewFiles] = useState([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [log, setLog] = useState('')
  const [history, setHistory] = useState([])
  const [trilhaAtual, setTrilhaAtual] = useState('')
  const [trilhasDisponiveis, setTrilhasDisponiveis] = useState([])

  useEffect(() => {
    fetchHistory()
    fetchTrilhas()
  }, [])

  const fetchHistory = async () => {
    const res = await fetch('/api/history')
    setHistory(await res.json())
  }

  const fetchTrilhas = async () => {
    try {
      const res = await fetch('/api/roadmaps/list')
      const data = await res.json()
      setTrilhasDisponiveis(data)
    } catch {
      setTrilhasDisponiveis([])
    }
  }

  const handleRun = async () => {
    setLog(prev => prev + '🧠 Validando instrução com IA...\n')

    try {
      const res = await fetch('/api/validateAndFix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: jsonInput })
      })

      const { jsonCorrigido } = await res.json()

      if (!Array.isArray(jsonCorrigido.arquivos)) {
        setLog(prev => prev + '❌ Formato inválido. Esperado: { arquivos: [ ... ] }\n')
        return
      }

      const mapped = jsonCorrigido.arquivos.map(f => {
        const basePath = languageToPath[language] ?? ''
        const ext = languageToExt[language] ?? ''
        const path = f.path?.includes('/')
          ? f.path
          : `${basePath}${f.name || 'file'}${ext}`
        return { path, content: f.content }
      })

      setPreviewFiles(mapped)
      setLog(prev => prev + `✅ ${mapped.length} instrução(ões) pronta(s)\n`)
      setIsPreviewOpen(true)
    } catch (err) {
      setLog(prev => prev + `❌ Erro: ${err.message}\n`)
    }
  }

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

      const entry = {
        timestamp: new Date().toISOString(),
        type: mode,
        trilha: trilhaAtual,
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
      setLog(prev => prev + '❌ Falha na execução.\n')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          {/* Barra de progresso da trilha atual */}
          {trilhaAtual && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-600">Progresso da Trilha:</label>
              <div className="w-full bg-gray-200 rounded h-3 mt-1">
                <div
                  className="bg-purple-600 h-3 rounded"
                  style={{ width: `${Math.min(100, Math.floor(Math.random() * 80 + 10))}%` }}
                />
              </div>
            </div>
          )}

          <div className="mb-6">
  <h1 className="text-3xl font-bold text-purple-700">
    AdminBuilder – Núcleo Técnico 🚀
  </h1>
</div>

          <div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
            <ExecutorControls
              mode={mode}
              onChangeMode={setMode}
              onRun={handleRun}
            />

            <div className="mb-4 flex items-center gap-3">
              <label className="font-semibold">Linguagem:</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="auto">Auto Detectar</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React (JSX)</option>
                <option value="python">Python</option>
                <option value="php">PHP</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="docker">Dockerfile</option>
                <option value="sql">SQL</option>
                <option value="markdown">Markdown</option>
              </select>

              <label className="font-semibold ml-4">Trilha:</label>
              <select
                value={trilhaAtual}
                onChange={e => setTrilhaAtual(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="">Nenhuma</option>
                {trilhasDisponiveis.map((t, i) => (
                  <option key={i} value={t.nome}>{t.nome}</option>
                ))}
              </select>
            </div>

            <textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Cole aqui..."
              className="w-full h-44 p-3 border rounded font-mono text-sm"
            />
          </div>

          {isPreviewOpen && (
            <PreviewModal
              files={previewFiles}
              onConfirm={confirmExecute}
              onCancel={() => setIsPreviewOpen(false)}
            />
          )}

          <div className="bg-white p-4 rounded shadow mb-6 max-w-4xl">
            <h2 className="font-semibold mb-2">📜 Log de Execução</h2>
            <pre className="h-64 overflow-auto bg-gray-50 p-2 rounded text-xs">
              {log || '—'}
            </pre>
          </div>

          <div className="bg-white p-4 rounded shadow max-w-4xl">
            <h2 className="font-semibold mb-2">🗒 Histórico de Execuções</h2>
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Data</th>
                    <th className="border px-2 py-1">Tipo</th>
                    <th className="border px-2 py-1">Trilha</th>
                    <th className="border px-2 py-1">Arquivos</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 10).map((h, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">
                        {new Date(h.timestamp).toLocaleString()}
                      </td>
                      <td className="border px-2 py-1">{h.type}</td>
                      <td className="border px-2 py-1">{h.trilha || '—'}</td>
                      <td className="border px-2 py-1">
                        {h.files.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
