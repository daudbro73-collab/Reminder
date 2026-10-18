export const L = (ru, en, ar, es) => ({ ru, en, ar, es });

export function meaning(translation, transliteration) {
  return { translation: L(...translation), transliteration: L(...transliteration) };
}

export function item(id, title, arabic, text, source, count = null, extra = {}) {
  return {
    id,
    title: L(...title),
    arabic,
    text: L(...text),
    source: L(...source),
    count,
    ...extra,
  };
}

export function cat(id, color, title, items) {
  return { id, color, title: L(...title), items };
}
