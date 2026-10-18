import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getEvidenceForCategory, getEvidenceIds } from '../constants/hadiths';
import { PRESETS } from '../constants/presets';
import PresetIcon from './icons/PresetIcon';
import EvidenceQuote from './EvidenceQuote';
import { pickLocalized } from '../utils/evidenceQuote';

function AyahCard({ ayah, lang, t }) {
  return (
    <blockquote className="ayah-card">
      <p className="evidence-label">{t('quranEvidence')}</p>
      <EvidenceQuote item={ayah} lang={lang} t={t} />
      <span className="ayah-ref">{pickLocalized(ayah.reference, lang)}</span>
    </blockquote>
  );
}

function HadithCard({ hadith, lang, t }) {
  return (
    <blockquote className="hadith-card">
      <p className="evidence-label">{t('hadithEvidence')}</p>
      <EvidenceQuote item={hadith} lang={lang} t={t} />
      <div className="hadith-meta">
        <span className="hadith-grade">{hadith.grade}</span>
        <span className="hadith-source">{hadith.source} №{hadith.number}</span>
      </div>
      <p className="hadith-narrator">
        {t('narratorLabel')} {pickLocalized(hadith.narrator, lang)}
      </p>
      <p className="hadith-isnad" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <strong>{t('isnadLabel')}</strong> {pickLocalized(hadith.isnad, lang)}
      </p>
    </blockquote>
  );
}

const SECTION_KEYS = {
  spiritual: { title: 'sunnahEvidenceTitle', desc: 'sunnahEvidenceDesc' },
  financial: { title: 'hadithFinancialTitle', desc: 'hadithFinancialDesc' },
};

export default function HadithSection({ categoryId }) {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(null);

  const section = SECTION_KEYS[categoryId];
  if (!section) return null;

  const evidenceMap = getEvidenceForCategory(categoryId);
  const evidenceIds = getEvidenceIds(categoryId).filter((id) =>
    PRESETS[categoryId]?.some((p) => p.id === id)
  );

  if (!evidenceIds.length) return null;

  const presetList = PRESETS[categoryId] || [];

  return (
    <section className="hadith-section">
      <h3 className="hadith-section-title">{t(section.title)}</h3>
      <p className="hadith-section-desc">{t(section.desc)}</p>
      <div className="hadith-worship-list">
        {evidenceIds.map((id) => {
          const evidence = evidenceMap[id];
          const isOpen = expanded === id;
          const preset = presetList.find((p) => p.id === id);
          return (
            <div key={id} className={`hadith-worship-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="hadith-worship-btn"
                onClick={() => setExpanded(isOpen ? null : id)}
              >
                <PresetIcon name={preset?.icon || 'quran'} size={20} />
                <span>{t(`presets.${categoryId}.${id}`)}</span>
                <span className="hadith-chevron">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && evidence && (
                <div className="hadith-cards">
                  {evidence.ayah && <AyahCard ayah={evidence.ayah} lang={lang} t={t} />}
                  {evidence.hadiths?.map((h, i) => (
                    <HadithCard key={i} hadith={h} lang={lang} t={t} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
