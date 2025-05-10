import fs from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const base = process.cwd()
    const arquivos = await listarArquivosGerados(path.join(base, 'src'))
    const historico = await lerJsonSeguro(path.join(base, 'data', 'history.json'))
    const trilhas = await lerJsonSeguro(path.join(base, 'data', 'roadmaps.json'))

    const ultimaExecucao = historico[0] || null
    const ultimaTrilha = ultimaExecucao?.trilha || null
    const arquivosRecentes = ultimaExecucao?.files || []

    const contexto = {
      resumo: {
        totalArquivos: arquivos.length,
        ultimaTrilha,
        arquivosRecentes,
        comandosRecentes: historico.slice(0, 5)
      },
      arquivos,
      trilhas,
      historico
    }

    return res.status(200).json(contexto)
  } catch (err) {
    console.error('[contexto-builder] ERRO:', err.message)
    return res.status(500).json({ error: 'Erro ao gerar contexto do projeto.' })
  }
}

async function listarArquivosGerados(dir, basePath = '') {
  let result = []
  try {
    const itens = await fs.readdir(dir, { withFileTypes: true })
    for (const item of itens) {
      const caminhoRelativo = path.join(basePath, item.name)
      const caminhoAbsoluto = path.join(dir, item.name)

      if (item.isDirectory()) {
        const sub = await listarArquivosGerados(caminhoAbsoluto, caminhoRelativo)
        result = result.concat(sub)
      } else {
        const content = await fs.readFile(caminhoAbsoluto, 'utf8')
        result.push({ path: caminhoRelativo, linhas: content.split('\n').length })
      }
    }
  } catch {}
  return result
}

async function lerJsonSeguro(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}
