export function userKey(userId, base) {
  return userId ? `${base}:${userId}` : base;
}

export function loadJson(userId, base, fallback) {
  try {
    const raw = localStorage.getItem(userKey(userId, base));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function loadArray(userId, base) {
  const data = loadJson(userId, base, []);
  return Array.isArray(data) ? data : [];
}

export function loadObject(userId, base, defaults) {
  const data = loadJson(userId, base, null);
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return { ...defaults, ...data };
  }
  return { ...defaults };
}

export function saveJson(userId, base, data) {
  try {
    localStorage.setItem(userKey(userId, base), JSON.stringify(data));
  } catch {
    // private mode / quota — ignore
  }
}

export function migrateLegacyUserData(userId) {
  if (!userId) return;
  const pairs = [
    ['reminder-tasks', []],
    ['reminder-habits', []],
    ['reminder-settings', null],
  ];
  for (const [base, fallback] of pairs) {
    const scoped = userKey(userId, base);
    if (localStorage.getItem(scoped)) continue;
    const legacy = localStorage.getItem(base);
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        if (base === 'reminder-settings') {
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            localStorage.setItem(scoped, legacy);
          }
        } else if (Array.isArray(parsed)) {
          localStorage.setItem(scoped, legacy);
        }
      } catch {
        // skip corrupt legacy
      }
    } else if (fallback !== null) {
      saveJson(userId, base, fallback);
    }
  }
}

export function deleteUserData(userId) {
  if (!userId) return;
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.endsWith(`:${userId}`) || key.includes(`:${userId}:`))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // ignore
  }
}

