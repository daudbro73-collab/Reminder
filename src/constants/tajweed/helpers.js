export const L = (ru, en, ar, es) => ({ ru, en, ar, es });

export function rule(id, title, desc, exampleAr, extra = {}) {
  return {
    id,
    title: L(...title),
    desc: L(...desc),
    example: { ar: exampleAr },
    ...extra,
  };
}

export function letterRule(id, letter, title, desc, exampleAr, detail = null) {
  return {
    id,
    type: 'letter',
    letter,
    title: L(...title),
    desc: L(...desc),
    detail: detail ? L(...detail) : null,
    example: { ar: exampleAr },
  };
}

export function category(id, color, title, rules) {
  return { id, color, title: L(...title), rules };
}
