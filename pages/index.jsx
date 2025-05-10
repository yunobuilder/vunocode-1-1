// pages/index.jsx
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .order('criado_em', { ascending: false })
      if (!error) setProjetos(data)
    })()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Revolucione sua Criação Digital com VUNOCode 🚀
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-6">
            A plataforma definitiva para automatizar projetos fullstack em minutos. Gere páginas, componentes e sistemas completos com apenas um JSON.
          </p>
          <div className="flex gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-purple-100 transition"
            >
              Entrar
            </a>
            <a
              href="/register"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-800 transition"
            >
              Comece Agora
            </a>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-16 px-4 max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          {[
            { icon: '⚡', title: 'Automação Instantânea', desc: 'Crie estruturas completas e otimizadas em tempo recorde. Esqueça horas de setup manual.' },
            { icon: '🛠️', title: 'Fullstack Integrado', desc: 'Frontend, backend e banco de dados gerados de forma inteligente e modularizada.' },
            { icon: '🔒', title: 'Segurança Avançada', desc: 'Estrutura pronta com autenticação segura, proteção de rotas e logs automáticos.' }
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
              <div className="text-purple-700 text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* MEUS PROJETOS */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Meus Projetos</h2>
          {projetos.length === 0 ? (
            <p className="text-gray-600">Nenhum projeto encontrado.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {projetos.map(p => (
                <li key={p.id} className="text-gray-800">
                  {p.nome}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* DEMONSTRAÇÃO JSON */}
        <section className="py-16 bg-gray-100 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-700">
            Veja Como é Fácil Criar com VUNOCode
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            Basta enviar seu JSON personalizado e em segundos você terá seu projeto rodando,
            completo com rotas, componentes e backend funcional. Simples assim.
          </p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg max-w-3xl mx-auto text-left overflow-x-auto text-sm">
{`{
  "components": [
    {
      "name": "Hero.jsx",
      "content": "<section>...</section>"
    }
  ],
  "pages": [
    {
      "name": "Home.jsx",
      "content": "<div>Minha Página</div>"
    }
  ]
}`}
          </pre>
        </section>

        {/* FEEDBACK */}
        <section className="py-16 px-4 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-700">
            Empresas que Já Confiam 🚀
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: '“O VUNOCode acelerou nosso desenvolvimento em 80%. Nunca foi tão fácil criar projetos completos.”', author: 'TechWave Solutions' },
              { quote: '“Simplesmente incrível. Do JSON ao deploy em minutos. Nossa equipe economizou semanas.”', author: 'CodeMaster Inc.' },
              { quote: '“Funcionalidades avançadas e suporte impecável. VUNOCode é nossa ferramenta nº1.”', author: 'NextGen Devs' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <p className="italic text-gray-600 mb-4">{f.quote}</p>
                <h4 className="font-bold text-purple-700">{f.author}</h4>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
