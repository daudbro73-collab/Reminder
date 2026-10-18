import { useState, useEffect, useCallback } from 'react';
import { fetchQuranMeta, fetchQuranSurah } from '../utils/api';
import {
  QURAN_ARABIC_EDITION,
  QURAN_EDITION_IDS,
  QURAN_TRANSLATIONS,
  cleanUthmaniAyahText,
} from '../constants/quranEditions';

const BOOKMARK_KEY = 'muzakkir-quran-bookmark';

function loadBookmark() {
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveBookmark(data) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(data));
}

function normalizeSurahPayload(json, surahNumber) {
  if (!json || json.code !== 200 || !json.data) return null;

  const blocks = Array.isArray(json.data) ? json.data : [json.data];
  const arabic = blocks.find((b) => b.edition?.identifier === QURAN_ARABIC_EDITION) || blocks[0];
  if (!arabic?.ayahs) return null;

  const translationMap = {};
  for (const block of blocks) {
    const id = block.edition?.identifier;
    if (!id || id === QURAN_ARABIC_EDITION) continue;
    translationMap[id] = block.ayahs.map((a) => a.text);
  }

  return {
    number: arabic.number ?? surahNumber,
    name: arabic.name,
    englishName: arabic.englishName,
    englishNameTranslation: arabic.englishNameTranslation,
    numberOfAyahs: arabic.numberOfAyahs ?? arabic.ayahs.length,
    revelationType: arabic.revelationType,
    ayahs: arabic.ayahs.map((ayah, index) => {
      const translations = {};
      for (const tr of QURAN_TRANSLATIONS) {
        translations[tr.id] = translationMap[tr.id]?.[index] || '';
      }
      return {
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: cleanUthmaniAyahText(ayah.text, surahNumber, ayah.numberInSurah),
        translations,
      };
    }),
  };
}

export function useQuran() {
  const [surahs, setSurahs] = useState([]);
  const [surahData, setSurahData] = useState(null);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [error, setError] = useState(null);
  const [bookmark, setBookmark] = useState(loadBookmark);

  useEffect(() => {
    setLoadingMeta(true);
    fetchQuranMeta()
      .then((json) => {
        if (json.code === 200) {
          setSurahs(json.data.surahs.references);
        } else {
          setError('fetch_failed');
        }
      })
      .catch(() => setError('fetch_failed'))
      .finally(() => setLoadingMeta(false));
  }, []);

  const loadSurah = useCallback(async (number) => {
    setLoadingSurah(true);
    setError(null);
    try {
      const json = await fetchQuranSurah(number, QURAN_EDITION_IDS);
      const normalized = normalizeSurahPayload(json, number);
      if (!normalized) {
        setError('fetch_failed');
        setSurahData(null);
        return;
      }
      setSurahData(normalized);
    } catch {
      setError('fetch_failed');
      setSurahData(null);
    } finally {
      setLoadingSurah(false);
    }
  }, []);

  const setBookmarkAyah = useCallback((surahNumber, ayahNumber, surahName) => {
    const data = { surahNumber, ayahNumber, surahName };
    saveBookmark(data);
    setBookmark(data);
  }, []);

  const clearBookmark = useCallback(() => {
    localStorage.removeItem(BOOKMARK_KEY);
    setBookmark(null);
  }, []);

  return {
    surahs,
    surahData,
    loadingMeta,
    loadingSurah,
    error,
    bookmark,
    loadSurah,
    setBookmarkAyah,
    clearBookmark,
  };
}
