import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CATEGORY_META, CATEGORY_IDS } from '../constants/categories';

export function useCategories() {
  const { getCategory } = useLanguage();

  return useMemo(
    () =>
      CATEGORY_IDS.map((id) => {
        const meta = CATEGORY_META[id];
        const i18n = getCategory(id);
        return { ...meta, ...i18n };
      }),
    [getCategory]
  );
}

export function useCategoryMap() {
  const categories = useCategories();
  return useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );
}
