// Motivation: XP, Level mit Titeln, Tagesserie, Abzeichen.
import { LESSONS, TOTAL_CARDS, cardKey } from "../data/lessons.js";
import { todayKey } from "./storage.js";

export const XP_CORRECT = 10;
export const XP_NO_HINT_BONUS = 5;
export const XP_NEW_CARD = 4;

export const LEVELS = [
  { min: 0, title: "Neugierig", emoji: "🐣" },
  { min: 60, title: "Buchstaben-Fan", emoji: "🔤" },
  { min: 160, title: "Erstleser", emoji: "📖" },
  { min: 320, title: "Plauderer", emoji: "💬" },
  { min: 540, title: "Café-Profi", emoji: "☕" },
  { min: 820, title: "Markt-Held", emoji: "🛍️" },
  { min: 1150, title: "Inselentdecker", emoji: "🏝️" },
  { min: 1550, title: "Griechenland-Freund", emoji: "🇬🇷" },
  { min: 2000, title: "Sprachmeister", emoji: "🏛️" },
  { min: 2600, title: "Olympier", emoji: "⚡" },
];

export function levelInfo(xp) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) idx = i;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  const base = cur.min;
  const span = next ? next.min - base : 1;
  const pct = next ? Math.round(((xp - base) / span) * 100) : 100;
  return { level: idx + 1, ...cur, next, pct: Math.max(0, Math.min(100, pct)), toNext: next ? next.min - xp : 0 };
}

// ── Fortschritt in Prozent ──
export function lessonProgress(progress, lesson) {
  const done = lesson.items.filter((it) => progress.learned[cardKey(lesson.id, it.id)]).length;
  return { done, total: lesson.items.length, pct: Math.round((done / lesson.items.length) * 100) };
}

export function overallProgress(progress) {
  const done = Object.keys(progress.learned).length;
  return { done, total: TOTAL_CARDS, pct: Math.round((done / TOTAL_CARDS) * 100) };
}

export function isLessonDone(progress, lesson) {
  return lessonProgress(progress, lesson).pct === 100;
}

// Eine Lektion ist frei, wenn die vorige fertig ist (erste immer frei).
export function isLessonUnlocked(progress, index) {
  if (index === 0) return true;
  return isLessonDone(progress, LESSONS[index - 1]);
}

// ── Tagesserie ──
export function bumpStreak(p) {
  const today = todayKey();
  if (p.streakLast === today) return p;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const days = p.streakLast === yesterday ? (p.streakDays || 0) + 1 : 1;
  return { ...p, streakDays: days, streakLast: today };
}

// ── Abzeichen ──
export const BADGES = [
  { id: "start", emoji: "🎓", title: "Losgelegt", desc: "Die erste Karte gelernt", test: (p) => Object.keys(p.learned).length >= 1 },
  { id: "alphabet", emoji: "🔤", title: "Alphabet", desc: "Alle 24 Buchstaben gelernt", test: (p) => LESSONS.filter((l) => l.kind === "letters").every((l) => isLessonDone(p, l)) },
  { id: "combos", emoji: "🔑", title: "Leseschlüssel", desc: "Alle Buchstaben-Paare gelernt", test: (p) => isLessonDone(p, LESSONS.find((l) => l.kind === "combos")) },
  { id: "run10", emoji: "🎯", title: "Zehn am Stück", desc: "10 richtige Antworten in Folge", test: (p) => (p.bestRun || 0) >= 10 },
  { id: "run25", emoji: "🏹", title: "Treffsicher", desc: "25 richtige Antworten in Folge", test: (p) => (p.bestRun || 0) >= 25 },
  { id: "streak3", emoji: "🔥", title: "Drei Tage", desc: "3 Tage hintereinander geübt", test: (p) => (p.streakDays || 0) >= 3 },
  { id: "streak7", emoji: "☄️", title: "Eine Woche", desc: "7 Tage hintereinander geübt", test: (p) => (p.streakDays || 0) >= 7 },
  { id: "xp500", emoji: "💎", title: "500 Punkte", desc: "500 XP gesammelt", test: (p) => (p.xp || 0) >= 500 },
  { id: "half", emoji: "⛳", title: "Halbzeit", desc: "50 % von allem gelernt", test: (p) => overallProgress(p).pct >= 50 },
  { id: "traveler", emoji: "✈️", title: "Reisefertig", desc: "Begrüßen, Café, Unterwegs & Hilfe fertig", test: (p) => ["greet", "cafe", "way", "help"].every((id) => isLessonDone(p, LESSONS.find((l) => l.id === id))) },
  { id: "all", emoji: "🏆", title: "Alles geschafft", desc: "100 % aller Lektionen", test: (p) => overallProgress(p).pct === 100 },
];

// Gibt neu verdiente Abzeichen zurück (ohne p zu verändern).
export function newBadges(p) {
  const have = new Set(p.badges || []);
  return BADGES.filter((b) => !have.has(b.id) && b.test(p));
}
