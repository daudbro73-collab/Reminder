import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div className="lang-switcher">
      <select
        className="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label="Language"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.code.toUpperCase()} — {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
