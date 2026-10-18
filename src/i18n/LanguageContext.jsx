import { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, translations, t as translate } from './translations';
import { getPresetTranslations, getHabitPresetTranslations, getPrayerTranslations } from './presetStrings';

const STORAGE_KEY = 'reminder-lang';

const LanguageContext = createContext(null);

function detectLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    // private mode
  }
  const browser = navigator.language?.slice(0, 2);
  if (translations[browser]) return browser;
  return 'ru';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = current.dir;
    document.title = translations[lang].pageTitle;
  }, [lang, current.dir]);

  const t = (key, vars) => {
    const presetMatch = key.match(/^presets\.(\w+)\.(\w+)$/);
    if (presetMatch) {
      const val = getPresetTranslations(lang)[presetMatch[1]]?.[presetMatch[2]];
      if (val) return val;
    }
    const habitMatch = key.match(/^habitPresets\.(\w+)\.(\w+)$/);
    if (habitMatch) {
      const val = getHabitPresetTranslations(lang)[habitMatch[1]]?.[habitMatch[2]];
      if (val) return val;
    }
    const prayerMatch = key.match(/^prayers\.(\w+)$/);
    if (prayerMatch) {
      const val = getPrayerTranslations(lang)[prayerMatch[1]];
      if (val) return val;
    }
    return translate(lang, key, vars);
  };

  const getCategory = (id) => ({
    ...translations[lang].categories[id],
    id,
  });

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getCategory, locale: current.locale, dir: current.dir, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
