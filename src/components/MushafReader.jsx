import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useQuran } from '../hooks/useQuran';
import { formatSurahOption, formatSurahHeader } from '../i18n/surahNames';
import {
  QURAN_TRANSLATIONS,
  MUSHAF_BISMILLAH,
  defaultTranslationId,
} from '../constants/quranEditions';

const SHOW_TRANSLATION_KEY = 'muzakkir-quran-show-translation';
const TRANSLATION_LANG_KEY = 'muzakkir-quran-translation-id';

function loadShowTranslation() {
  try {
    const saved = localStorage.getItem(SHOW_TRANSLATION_KEY);
    if (saved === '0') return false;
    if (saved === '1') return true;
  } catch {
    /* ignore */
  }
  return true;
}

function loadTranslationId(uiLang) {
  try {
    const saved = localStorage.getItem(TRANSLATION_LANG_KEY);
    if (saved && QURAN_TRANSLATIONS.some((tr) => tr.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return defaultTranslationId(uiLang);
}

function useOutsideClose(open, setOpen, ref) {
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen, ref]);
}

export default function MushafReader() {
  const { t, lang } = useLanguage();
  const {
    surahs,
    surahData,
    loadingMeta,
    loadingSurah,
    error,
    bookmark,
    loadSurah,
    setBookmarkAyah,
    clearBookmark,
  } = useQuran();

  const [selectedSurah, setSelectedSurah] = useState(1);
  const [showTranslation, setShowTranslation] = useState(loadShowTranslation);
  const [translationId, setTranslationId] = useState(() => loadTranslationId(lang));
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [surahMenuOpen, setSurahMenuOpen] = useState(false);
  const ayahRefs = useRef({});
  const langMenuRef = useRef(null);
  const surahMenuRef = useRef(null);

  const activeTranslation = QURAN_TRANSLATIONS.find((tr) => tr.id === translationId);
  const currentMeta = surahs.find((s) => s.number === selectedSurah);

  useOutsideClose(langMenuOpen, setLangMenuOpen, langMenuRef);
  useOutsideClose(surahMenuOpen, setSurahMenuOpen, surahMenuRef);

  useEffect(() => {
    loadSurah(selectedSurah);
  }, [selectedSurah, loadSurah]);

  useEffect(() => {
    try {
      localStorage.setItem(SHOW_TRANSLATION_KEY, showTranslation ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [showTranslation]);

  useEffect(() => {
    try {
      localStorage.setItem(TRANSLATION_LANG_KEY, translationId);
    } catch {
      /* ignore */
    }
  }, [translationId]);

  const handleContinue = () => {
    if (!bookmark) return;
    setSelectedSurah(bookmark.surahNumber);
    setTimeout(() => {
      const el = ayahRefs.current[bookmark.ayahNumber];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
  };

  const surahButtonLabel = currentMeta
    ? `${currentMeta.number}. ${currentMeta.name}`
    : t('selectSurah');

  return (
    <div className="mushaf-reader">
      {bookmark && (
        <button type="button" className="mushaf-continue-btn" onClick={handleContinue}>
          📌 {t('continueReading')}: {bookmark.surahName || bookmark.surahNumber}:{bookmark.ayahNumber}
        </button>
      )}

      <div className="mushaf-toolbar mushaf-toolbar-row">
        <div className="mushaf-dropdown-wrap mushaf-surah-wrap" ref={surahMenuRef}>
          <button
            type="button"
            className={`mushaf-tr-btn mushaf-surah-btn ${surahMenuOpen ? 'open' : ''}`}
            onClick={() => {
              setSurahMenuOpen((v) => !v);
              setLangMenuOpen(false);
            }}
            disabled={loadingMeta}
            aria-expanded={surahMenuOpen}
            aria-haspopup="listbox"
          >
            <span className="mushaf-surah-btn-label" lang="ar" dir="rtl">
              {surahButtonLabel}
            </span>
            <span className="mushaf-lang-caret" aria-hidden="true">▾</span>
          </button>

          {surahMenuOpen && (
            <ul className="mushaf-lang-menu mushaf-surah-menu" role="listbox" aria-label={t('selectSurah')}>
              {surahs.map((s) => {
                const selected = s.number === selectedSurah;
                return (
                  <li key={s.number} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      className={`mushaf-lang-option ${selected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSurah(s.number);
                        setSurahMenuOpen(false);
                      }}
                    >
                      <span className="mushaf-surah-option-text" lang="ar" dir="rtl">
                        {formatSurahOption(s, lang)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="button"
          className={`mushaf-tr-btn mushaf-tr-check ${showTranslation ? 'active' : ''}`}
          onClick={() => setShowTranslation((v) => !v)}
          aria-pressed={showTranslation}
        >
          <span className="mushaf-tr-checkbox" aria-hidden="true">
            {showTranslation ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
          </span>
          <span>{t('quranTranslation')}</span>
        </button>

        <div className="mushaf-dropdown-wrap mushaf-lang-wrap" ref={langMenuRef}>
          <button
            type="button"
            className={`mushaf-lang-flag-btn ${langMenuOpen ? 'open' : ''}`}
            onClick={() => {
              setLangMenuOpen((v) => !v);
              setSurahMenuOpen(false);
            }}
            aria-expanded={langMenuOpen}
            aria-haspopup="listbox"
            aria-label={t('language')}
            title={activeTranslation ? t(activeTranslation.labelKey) : t('language')}
          >
            <span className="mushaf-lang-flag" aria-hidden="true">
              {activeTranslation?.flag || '🌐'}
            </span>
          </button>

          {langMenuOpen && (
            <ul className="mushaf-lang-menu" role="listbox" aria-label={t('language')}>
              {QURAN_TRANSLATIONS.map((tr) => {
                const selected = tr.id === translationId;
                return (
                  <li key={tr.id} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      className={`mushaf-lang-option ${selected ? 'selected' : ''}`}
                      onClick={() => {
                        setTranslationId(tr.id);
                        setLangMenuOpen(false);
                        if (!showTranslation) setShowTranslation(true);
                      }}
                    >
                      <span className="mushaf-lang-option-flag" aria-hidden="true">{tr.flag}</span>
                      <span>{t(tr.labelKey)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {loadingSurah && <p className="mushaf-status">{t('loading')}</p>}
      {error && <p className="mushaf-status error">{t('quranError')}</p>}

      {surahData && currentMeta && (
        <article className="mushaf-surah">
          <header className="mushaf-surah-header">
            <h2 className="mushaf-surah-name" lang="ar" dir="rtl">
              {formatSurahHeader(currentMeta, lang)}
            </h2>
            <p className="mushaf-surah-meta">
              {currentMeta.numberOfAyahs} {t('ayahCount')}
              {lang !== 'ar' && currentMeta.englishName ? ` · ${currentMeta.englishName}` : ''}
            </p>
            <p className="mushaf-edition-note">{t('mushafMadinahNote')}</p>
          </header>

          {selectedSurah !== 1 && selectedSurah !== 9 && (
            <p className="mushaf-bismillah" lang="ar" dir="rtl">
              {MUSHAF_BISMILLAH}
            </p>
          )}

          <div className="mushaf-ayahs">
            {surahData.ayahs.map((ayah) => {
              const isBookmarked =
                bookmark?.surahNumber === selectedSurah && bookmark?.ayahNumber === ayah.numberInSurah;
              const translationText = ayah.translations?.[translationId] || '';
              return (
                <div
                  key={ayah.number}
                  ref={(el) => { ayahRefs.current[ayah.numberInSurah] = el; }}
                  className={`mushaf-ayah ${isBookmarked ? 'bookmarked' : ''}`}
                >
                  <button
                    type="button"
                    className="mushaf-ayah-arabic"
                    onClick={() =>
                      setBookmarkAyah(selectedSurah, ayah.numberInSurah, currentMeta.name)
                    }
                    title={t('bookmarkAyah')}
                  >
                    <span className="mushaf-ayah-text" lang="ar" dir="rtl">
                      {ayah.text}
                    </span>
                    <span className="mushaf-ayah-num">
                      {ayah.numberInSurah.toLocaleString('ar-SA')}
                    </span>
                  </button>
                  {showTranslation && translationText && (
                    <p
                      className="mushaf-ayah-translation"
                      lang={activeTranslation?.lang || 'en'}
                      dir={activeTranslation?.lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                      <span className="mushaf-ayah-tr-num">{ayah.numberInSurah}. </span>
                      {translationText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {bookmark?.surahNumber === selectedSurah && (
            <button type="button" className="mushaf-clear-bookmark" onClick={clearBookmark}>
              {t('clearBookmark')}
            </button>
          )}
        </article>
      )}
    </div>
  );
}
