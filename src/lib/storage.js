// Fortschritt speichern/laden + Backup-Code zum Mitnehmen auf andere Geräte.
import { DEFAULT_MASCOT, MASCOTS } from "../data/mascots.js";
import { LESSONS, cardKey } from "../data/lessons.js";

const KEY = "griechisch-fortschritt-v2";
const OLD_KEY = "kitty-greek-progress-v1";

export const emptyProgress = () => ({
  v: 2,
  learned: {},
  correct: {},
  mascot: DEFAULT_MASCOT.id,
  xp: 0,
  badges: [],
  streakDays: 0,
  streakLast: null,
  bestRun: 0,
  answered: 0,
  totalCorrect: 0,
  savedAt: null,
});

export const todayKey = () => new Date().toISOString().slice(0, 10);

function migrateV1(raw) {
  // Alte Version kannte nur die ersten 6 Buchstaben (als Index) und catId.
  try {
    const old = JSON.parse(raw);
    const p = emptyProgress();
    const first = LESSONS[0];
    if (Array.isArray(old.learned)) {
      old.learned.forEach((i) => {
        const item = first.items[i];
        if (item) p.learned[cardKey(first.id, item.id)] = 1;
      });
    }
    if (typeof old.catId === "string" && MASCOTS.some((m) => m.id === old.catId)) {
      p.mascot = old.catId;
    }
    return p;
  } catch (e) {
    return null;
  }
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && typeof data === "object") return { ...emptyProgress(), ...data };
    }
    const old = window.localStorage.getItem(OLD_KEY);
    if (old) {
      const migrated = migrateV1(old);
      if (migrated) return migrated;
    }
  } catch (e) {
    /* nichts gespeichert oder Speicher gesperrt */
  }
  return emptyProgress();
}

export function saveProgress(p) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...p, savedAt: Date.now() }));
    return true;
  } catch (e) {
    return false;
  }
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(OLD_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// ── Backup-Code: JSON -> UTF-8 -> base64, damit er kopierbar ist ──
export function exportCode(p) {
  try {
    const json = JSON.stringify(p);
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin);
  } catch (e) {
    return "";
  }
}

export function importCode(code) {
  try {
    const bin = atob(String(code).trim());
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const data = JSON.parse(json);
    if (!data || typeof data !== "object" || typeof data.learned !== "object") return null;
    return { ...emptyProgress(), ...data };
  } catch (e) {
    return null;
  }
}
