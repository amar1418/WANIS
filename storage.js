// © 2025 Wa-Nis — Storage Module (ES Module)
// Unified persistence layer: localStorage (long-term) + sessionStorage (session-only)
// Provides typed, namespaced, versioned storage with migration support.

const STORAGE_NAMESPACE = 'wanis';
const STORAGE_VERSION = 1;

/** Prefix all keys to avoid collisions */
function ns(key) {
  return `${STORAGE_NAMESPACE}:v${STORAGE_VERSION}:${key}`;
}

/** Safe JSON parse with fallback */
function safeParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/** localStorage wrapper — persistent across sessions */
export const LocalStore = {
  /** Get parsed value or default */
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(ns(key));
      return raw ? safeParse(raw, defaultValue) : defaultValue;
    } catch (e) {
      console.warn('[LocalStore] get failed', key, e);
      return defaultValue;
    }
  },

  /** Set value (auto-stringify) */
  set(key, value) {
    try {
      localStorage.setItem(ns(key), JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('[LocalStore] set failed', key, e);
      return false;
    }
  },

  /** Remove key */
  remove(key) {
    try {
      localStorage.removeItem(ns(key));
      return true;
    } catch (e) {
      console.warn('[LocalStore] remove failed', key, e);
      return false;
    }
  },

  /** Clear all namespaced keys */
  clearAll() {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(`${STORAGE_NAMESPACE}:v${STORAGE_VERSION}:`));
      keys.forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.error('[LocalStore] clearAll failed', e);
      return false;
    }
  },

  /** Get all keys in namespace */
  keys() {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(`${STORAGE_NAMESPACE}:v${STORAGE_VERSION}:`))
      .map(k => k.replace(`${STORAGE_NAMESPACE}:v${STORAGE_VERSION}:`, ''));
  }
};

/** sessionStorage wrapper — cleared when tab/window closes */
export const SessionStore = {
  get(key, defaultValue = null) {
    try {
      const raw = sessionStorage.getItem(ns(key));
      return raw ? safeParse(raw, defaultValue) : defaultValue;
    } catch (e) {
      console.warn('[SessionStore] get failed', key, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      sessionStorage.setItem(ns(key), JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('[SessionStore] set failed', key, e);
      return false;
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(ns(key));
      return true;
    } catch (e) {
      console.warn('[SessionStore] remove failed', key, e);
      return false;
    }
  },

  clearAll() {
    try {
      const keys = Object.keys(sessionStorage).filter(k => k.startsWith(`${STORAGE_NAMESPACE}:v${STORAGE_VERSION}:`));
      keys.forEach(k => sessionStorage.removeItem(k));
      return true;
    } catch (e) {
      console.error('[SessionStore] clearAll failed', e);
      return false;
    }
  }
};

/** High-level App State Persistence — combines both stores */
export const AppPersistence = {
  /** Keys used by the app */
  KEYS: {
    APP_STATE: 'app_state',           // Long-term: view, book, chapter, page, theme, font, size, immersive
    READING_SESSION: 'reading_session', // Session-only: scroll position, temp UI state
    USER_PREFS: 'user_prefs',         // Long-term: theme, font, size (mirrored from app_state for quick access)
    DRAFT_NOTES: 'draft_notes'        // Session-only: unsaved user notes/annotations
  },

  /** Save full app state to localStorage */
  saveAppState(state) {
    return LocalStore.set(this.KEYS.APP_STATE, {
      ...state,
      _savedAt: Date.now(),
      _version: STORAGE_VERSION
    });
  },

  /** Load full app state from localStorage */
  loadAppState(defaultState) {
    const saved = LocalStore.get(this.KEYS.APP_STATE);
    if (!saved) return defaultState;
    // Simple version migration placeholder
    if (saved._version !== STORAGE_VERSION) {
      console.info('[AppPersistence] Version mismatch, migrating...', saved._version, '→', STORAGE_VERSION);
      // Migration logic would go here
    }
    return { ...defaultState, ...saved };
  },

  /** Save reading session (scroll, temp UI) to sessionStorage */
  saveReadingSession(sessionData) {
    return SessionStore.set(this.KEYS.READING_SESSION, {
      ...sessionData,
      _updatedAt: Date.now()
    });
  },

  /** Load reading session */
  loadReadingSession(defaultSession = {}) {
    return SessionStore.get(this.KEYS.READING_SESSION, defaultSession);
  },

  /** Save user preferences (theme, font, size) — mirrored for quick access */
  saveUserPrefs(prefs) {
    return LocalStore.set(this.KEYS.USER_PREFS, {
      ...prefs,
      _updatedAt: Date.now()
    });
  },

  /** Load user preferences */
  loadUserPrefs(defaultPrefs = {}) {
    return LocalStore.get(this.KEYS.USER_PREFS, defaultPrefs);
  },

  /** Save draft notes (annotations, highlights) — session only */
  saveDraftNotes(notes) {
    return SessionStore.set(this.KEYS.DRAFT_NOTES, {
      ...notes,
      _updatedAt: Date.now()
    });
  },

  /** Load draft notes */
  loadDraftNotes(defaultNotes = {}) {
    return SessionStore.get(this.KEYS.DRAFT_NOTES, defaultNotes);
  },

  /** Clear all app data (logout/reset) */
  clearAll() {
    LocalStore.clearAll();
    SessionStore.clearAll();
  },

  /** Export all data for backup */
  exportAll() {
    const data = {};
    LocalStore.keys().forEach(key => {
      data[key] = LocalStore.get(key);
    });
    return JSON.stringify(data, null, 2);
  },

  /** Import data from backup */
  importAll(json) {
    try {
      const data = JSON.parse(json);
      Object.entries(data).forEach(([key, value]) => {
        LocalStore.set(key, value);
      });
      return true;
    } catch (e) {
      console.error('[AppPersistence] Import failed', e);
      return false;
    }
  }
};

/** Migration utilities for future schema changes */
export const Migration = {
  /** Register a migration function */
  migrations: [],

  add(version, fn) {
    this.migrations.push({ version, fn });
    this.migrations.sort((a, b) => a.version - b.version);
  },

  /** Run all pending migrations */
  async run(currentVersion) {
    const pending = this.migrations.filter(m => m.version > currentVersion);
    for (const m of pending) {
      console.info('[Migration] Running v' + m.version);
      await m.fn(LocalStore, SessionStore);
    }
    return pending.length;
  }
};

export default {
  LocalStore,
  SessionStore,
  AppPersistence,
  Migration
};