// Componente: Seletor de Linguagem para o Executor
export default function LanguageSelector({ selectedLanguage, setSelectedLanguage }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Linguagem:</label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="auto">Auto Detectar</option>
          <option value="python">Python (.py)</option>
          <option value="php">PHP (.php)</option>
          <option value="javascript">JavaScript (.js)</option>
          <option value="c">C (.c)</option>
          <option value="cpp">C++ (.cpp)</option>
          <option value="java">Java (.java)</option>
          <option value="docker">Dockerfile</option>
          <option value="sql">SQL (.sql)</option>
          <option value="markdown">Markdown (.md)</option>
        </select>
      </div>
    );
  }
  