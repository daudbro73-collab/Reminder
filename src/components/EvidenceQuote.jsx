import { normalizeQuote, pickTranslation } from '../utils/evidenceQuote';

export default function EvidenceQuote({ item, lang, t }) {
  const { textAr, translation } = normalizeQuote(item);
  const localized = pickTranslation(translation, lang);

  return (
    <div className="evidence-quote">
      <p className="evidence-original-label">{t('originalArabic')}</p>
      <p className="evidence-text-ar" dir="rtl" lang="ar">
        {textAr}
      </p>
      {localized && (
        <div className="evidence-translation-single">
          <p className="evidence-translation-label">{t('translationLabel')}</p>
          <p className="evidence-translation-text">{localized}</p>
        </div>
      )}
    </div>
  );
}
