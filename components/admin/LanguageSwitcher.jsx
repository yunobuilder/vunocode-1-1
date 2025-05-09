// Language Switcher Component
import { useTranslation } from '../../utils/i18n';

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useTranslation();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 rounded ${lang === 'pt' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
      >
        PT
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
    </div>
  );
}
