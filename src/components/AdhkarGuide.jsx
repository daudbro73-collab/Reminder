import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ADHKAR_CATEGORIES, ADHKAR_COUNT } from '../constants/adhkar';

export default function AdhkarGuide() {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('');

  const filteredCategories = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return ADHKAR_CATEGORIES;

    return ADHKAR_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (entry) =>
          entry.title[lang].toLowerCase().includes(q) ||
          entry.text[lang].toLowerCase().includes(q) ||
          entry.translation?.[lang]?.toLowerCase().includes(q) ||
          entry.transliteration?.[lang]?.toLowerCase().includes(q) ||
          entry.source[lang].toLowerCase().includes(q) ||
          entry.arabic.includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [filter, lang]);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="adhkar-guide">
      <p className="adhkar-intro">{t('adhkarIntro')}</p>

      <input
        type="search"
        className="adhkar-search"
        placeholder={t('adhkarSearch')}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="adhkar-categories">
        {filteredCategories.map((category) => (
          <section
            key={category.id}
            className="adhkar-category"
            style={{ '--cat-color': category.color }}
          >
            <h3 className="adhkar-category-title">
              <span className="adhkar-category-dot" />
              {category.title[lang]}
              <span className="adhkar-category-count">{category.items.length}</span>
            </h3>

            <div className="adhkar-items">
              {category.items.map((entry) => {
                const isOpen = expanded === entry.id;
                return (
                  <div
                    key={entry.id}
                    className={`adhkar-item ${isOpen ? 'open' : ''}`}
                    style={{ '--item-color': category.color }}
                  >
                    <button
                      type="button"
                      className="adhkar-item-btn"
                      onClick={() => toggle(entry.id)}
                    >
                      <span className="adhkar-item-title">{entry.title[lang]}</span>
                      <span className="adhkar-chevron">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="adhkar-item-body">
                        <div className="adhkar-arabic" dir="rtl" lang="ar">
                          {entry.arabic}
                        </div>
                        {entry.transliteration?.[lang] && (
                          <p className="adhkar-transliteration" lang={lang === 'ru' ? 'ru' : 'en'}>
                            <span className="adhkar-block-label">{t('adhkarTransliteration')}</span>
                            {entry.transliteration[lang]}
                          </p>
                        )}
                        {entry.translation?.[lang] && (
                          <p className="adhkar-translation">
                            <span className="adhkar-block-label">{t('adhkarTranslation')}</span>
                            {entry.translation[lang]}
                          </p>
                        )}
                        <p className="adhkar-text">
                          <span className="adhkar-block-label">{t('adhkarInstruction')}</span>
                          {entry.text[lang]}
                        </p>
                        {entry.count && (
                          <p className="adhkar-repeat">{t('adhkarRepeat', { count: entry.count })}</p>
                        )}
                        <p className="adhkar-source">
                          <span className="adhkar-source-label">{t('adhkarSource')}:</span>{' '}
                          {entry.source[lang]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <p className="adhkar-empty">{t('adhkarNoResults')}</p>
      )}

      <p className="adhkar-footer-note">{t('adhkarFooter', { count: ADHKAR_COUNT })}</p>
    </div>
  );
}
