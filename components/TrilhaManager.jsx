import { useState, useEffect } from 'react'

export default function TrilhaManager({ projeto }) {
  const [trilhas, setTrilhas] = useState([])
  const [detalhe, setDetalhe] = useState(null)

  useEffect(() => {
    fetch('/api/roadmaps?projeto=' + projeto)
      .then(res => res.json())
      .then(setTrilhas)
  }, [projeto])

  const abrirDetalhe = (nome) => {
    fetch(`/api/roadmaps/${nome}?projeto=${projeto}`)
      .then(res => res.json())
      .then(setDetalhe)
  }

  const atualizarTarefa = async (fase, tarefa, status, obs) => {
    await fetch(`/api/roadmaps/update?projeto=${projeto}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: detalhe.nome, fase, tarefa, status, obs }),
    })
    abrirDetalhe(detalhe.nome)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trilhas do Projeto</h2>

      {trilhas.map((trilha, i) => (
        <div key={i} className="border rounded p-4 mb-4 shadow bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{trilha.nome}</h3>
            <span className="text-sm text-gray-500">Fase atual: {trilha.faseAtual}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Status: {trilha.statusGeral}</p>
          <div className="mt-2">Progresso: {trilha.percentualConcluido}%</div>
          <button onClick={() => abrirDetalhe(trilha.nome)} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Ver Detalhes</button>
        </div>
      ))}

      {detalhe && (
        <div className="mt-6 border rounded p-4 bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Trilha: {detalhe.nome}</h3>
          {Object.entries(detalhe.progresso).map(([fase, tarefas]) => (
            <div key={fase} className="mb-4">
              <h4 className="text-md font-semibold">Fase {fase}</h4>
              {Object.entries(tarefas).map(([tarefa, val]) => {
                const status = typeof val === 'string' ? val : val.status
                const obs = typeof val === 'string' ? '' : val.obs || ''
                return (
                  <div key={tarefa} className="mb-2">
                    <div className="flex items-center justify-between">
                      <span>{tarefa}</span>
                      <select value={status} onChange={(e) => atualizarTarefa(fase, tarefa, e.target.value, obs)} className="border p-1 rounded">
                        <option value="pendente">Pendente</option>
                        <option value="em-andamento">Em andamento</option>
                        <option value="ok">Concluído</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Observação"
                      className="w-full mt-1 p-1 border rounded"
                      value={obs}
                      onChange={(e) => atualizarTarefa(fase, tarefa, status, e.target.value)}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
