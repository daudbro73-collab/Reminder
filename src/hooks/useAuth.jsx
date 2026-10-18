import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { migrateLegacyUserData, deleteUserData } from '../utils/userStorage';
import { createId } from '../utils/id';

const ACCOUNTS_KEY = 'muzakkir-accounts';
const SESSION_KEY = 'muzakkir-session';

async function hashPin(pin) {
  if (globalThis.crypto?.subtle) {
    const data = new TextEncoder().encode(pin);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let hash = 0;
  for (const char of pin) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return `fb_${Math.abs(hash).toString(16)}`;
}

function isValidSession(session) {
  return Boolean(
    session &&
    typeof session.id === 'string' &&
    session.id &&
    typeof session.name === 'string' &&
    session.name.trim()
  );
}

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // ignore
  }
}

function normalizeName(name) {
  return name.trim().replace(/\s+/g, ' ');
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = loadSession();
    return isValidSession(session) ? session : null;
  });
  const [accounts, setAccounts] = useState(loadAccounts);

  useEffect(() => {
    if (user?.id) {
      migrateLegacyUserData(user.id);
    }
  }, [user?.id]);

  const login = useCallback(async (name, pin) => {
    const trimmed = normalizeName(name);
    if (!trimmed) throw new Error('name_required');
    if (!/^\d{4,6}$/.test(pin)) throw new Error('pin_invalid');

    const pinHash = await hashPin(pin);
    const list = loadAccounts();
    const existing = list.find(
      (a) => a.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (existing) {
      if (existing.pinHash !== pinHash) throw new Error('pin_wrong');
      const session = { id: existing.id, name: existing.name };
      saveSession(session);
      setUser(session);
      return { isNew: false, user: session };
    }

    const account = {
      id: createId(),
      name: trimmed,
      pinHash,
      createdAt: new Date().toISOString(),
    };
    const next = [...list, account];
    saveAccounts(next);
    setAccounts(next);
    const session = { id: account.id, name: account.name };
    saveSession(session);
    setUser(session);
    migrateLegacyUserData(account.id);
    return { isNew: true, user: session };
  }, []);

  const loginAsGuest = useCallback((guestName = 'Гость') => {
    const guestId = `guest_${createId()}`;
    const session = { id: guestId, name: guestName, isGuest: true };
    saveSession(session);
    setUser(session);
    return { isNew: true, user: session };
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setUser(null);
  }, []);

  const deleteAccount = useCallback((idToDelete) => {
    const targetId = idToDelete || user?.id;
    if (!targetId) return;

    deleteUserData(targetId);

    const list = loadAccounts();
    const next = list.filter((a) => a.id !== targetId);
    saveAccounts(next);
    setAccounts(next);

    if (user?.id === targetId) {
      saveSession(null);
      setUser(null);
    }
  }, [user?.id]);

  return (
    <AuthContext.Provider
      value={{ user, accounts, login, loginAsGuest, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
