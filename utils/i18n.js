// i18n Utility for VUNOCODE
import { useState, useEffect } from 'react';

const defaultLang = 'pt';

export function useTranslation() {
  const [lang, setLang] = useState(defaultLang);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    const storedLang = localStorage.getItem('lang') || browserLang || defaultLang;
    setLang(storedLang);
    loadTranslations(storedLang);
  }, []);

  const loadTranslations = async (language) => {
    try {
      const res = await fetch(`/locales/${language}.json`);
      const data = await res.json();
      setTranslations(data);
    } catch {
      console.warn('🔔 Falha ao carregar traduções, usando PT-BR padrão');
      const res = await fetch('/locales/pt.json');
      const data = await res.json();
      setTranslations(data);
    }
  };

  const t = (key) => translations[key] || key;

  const changeLanguage = (newLang) => {
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    loadTranslations(newLang);
  };

  return { t, lang, changeLanguage };
}
