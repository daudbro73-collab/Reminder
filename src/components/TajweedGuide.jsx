import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  TAJWEED_CATEGORIES,
  TAJWEED_RULE_COUNT,
  TAJWEED_SECTION_COUNT,
} from '../constants/tajweedRules';

export default function TajweedGuide() {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('');

  const filteredCategories = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return TAJWEED_CATEGORIES;

    return TAJWEED_CATEGORIES.map((cat) => ({
      ...cat,
      rules: cat.rules.filter((rule) => {
        const haystack = [
          rule.title[lang],
          rule.desc[lang],
          rule.detail?.[lang],
          rule.example.ar,
          rule.letter,
          rule.harakatSample,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      }),
    })).filter((cat) => cat.rules.length > 0);
  }, [filter, lang]);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="tajweed-guide">
      <p className="tajweed-intro">
        {t('tajweedIntroFull', { count: TAJWEED_RULE_COUNT, sections: TAJWEED_SECTION_COUNT })}
      </p>

      <input
        type="search"
        className="tajweed-search"
        placeholder={t('tajweedSearch')}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="tajweed-categories">
        {filteredCategories.map((category) => (
          <section
            key={category.id}
            className={`tajweed-category ${category.id === 'alphabet' ? 'tajweed-category-alphabet' : ''}`}
            style={{ '--cat-color': category.color }}
          >
            <h3 className="tajweed-category-title">
              <span className="tajweed-category-dot" />
              {category.title[lang]}
              <span className="tajweed-category-count">{category.rules.length}</span>
            </h3>

            {category.id === 'alphabet' && !filter && (
              <div className="tajweed-alphabet-grid" aria-hidden="true">
                {category.rules.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`tajweed-alphabet-cell ${expanded === r.id ? 'active' : ''}`}
                    onClick={() => toggle(r.id)}
                    title={r.title[lang]}
                  >
                    <span className="tajweed-alphabet-char" dir="rtl" lang="ar">
                      {r.letter}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="tajweed-rules">
              {category.rules.map((rule) => {
                const isOpen = expanded === rule.id;
                return (
                  <div
                    key={rule.id}
                    className={`tajweed-rule ${isOpen ? 'open' : ''} ${rule.type === 'letter' ? 'tajweed-rule-letter' : ''}`}
                    style={{ '--rule-color': category.color }}
                  >
                    <button
                      type="button"
                      className="tajweed-rule-btn"
                      onClick={() => toggle(rule.id)}
                    >
                      {rule.type === 'letter' && (
                        <span className="tajweed-rule-letter-badge" dir="rtl" lang="ar">
                          {rule.letter}
                        </span>
                      )}
                      {rule.harakatSample && (
                        <span className="tajweed-rule-harakat-badge" dir="rtl" lang="ar">
                          {rule.harakatSample}
                        </span>
                      )}
                      <span className="tajweed-rule-title">{rule.title[lang]}</span>
                      <span className="tajweed-chevron">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="tajweed-rule-body">
                        {rule.type === 'letter' && (
                          <p className="tajweed-letter-hero" dir="rtl" lang="ar">
                            {rule.letter}
                          </p>
                        )}
                        {rule.harakatSample && (
                          <p className="tajweed-harakat-hero" dir="rtl" lang="ar">
                            {rule.harakatSample}
                          </p>
                        )}
                        <p className="tajweed-rule-desc">{rule.desc[lang]}</p>
                        {rule.detail?.[lang] && (
                          <p className="tajweed-rule-detail">{rule.detail[lang]}</p>
                        )}
                        <p className="tajweed-example" dir="rtl" lang="ar">
                          {rule.example.ar}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <p className="tajweed-empty">{t('tajweedNoResults')}</p>
        )}
      </div>
    </div>
  );
}
