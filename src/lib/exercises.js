// Übungstypen:
//   mc_meaning – Griechisch sehen, Bedeutung wählen
//   mc_greek   – Bedeutung sehen, griechisches Wort wählen
//   listen     – nur hören, dann das Geschriebene wählen
//   build      – Wort aus einzelnen Buchstaben zusammensetzen  (kreativ)
//   type       – Bedeutung selbst eintippen                    (kreativ)

export const TYPE_LABEL = {
  mc_meaning: "Was bedeutet das?",
  mc_greek: "Wie schreibt man das?",
  listen: "Hör gut zu – was war das?",
  build: "Setz das Wort zusammen",
  type: "Tipp die Bedeutung ein",
};

// Buchstaben brauchen andere Fragen als Vokabeln.
export function labelFor(round) {
  const k = round.card.kind;
  switch (round.type) {
    case "mc_meaning":
      return k === "letters" ? "Wie heißt dieser Buchstabe?"
           : k === "combos"  ? "Wie klingt dieses Buchstaben-Paar?"
           : "Was bedeutet das?";
    case "mc_greek":
      return k === "letters" ? "Welcher Buchstabe ist das?"
           : "Wie schreibt man das auf Griechisch?";
    case "listen":
      return k === "letters" ? "Hör zu – welcher Buchstabe war das?"
           : "Hör gut zu – was war das?";
    default:
      return TYPE_LABEL[round.type];
  }
}

// Karte in eine einheitliche Form bringen.
export function normalizeCard(card) {
  if (card.kind === "letters") {
    return {
      key: card.key, lessonId: card.lessonId, kind: card.kind,
      greek: card.upper + " " + card.lower,
      translit: card.nameDe,
      answer: card.name,
      answerDe: card.nameDe,
      extra: card.sound,
      say: card.name,
      buildWord: null,
      emoji: card.ex?.emoji || "🔤",
      example: card.ex,
    };
  }
  if (card.kind === "combos") {
    return {
      key: card.key, lessonId: card.lessonId, kind: card.kind,
      greek: card.combo,
      translit: card.soundDe,
      answer: "klingt wie „" + card.soundDe + "“",
      answerDe: card.soundDe,
      extra: card.sound,
      say: card.ex.el,
      buildWord: card.ex.el,
      emoji: card.ex.emoji,
      example: card.ex,
    };
  }
  return {
    key: card.key, lessonId: card.lessonId, kind: card.kind,
    greek: card.el,
    translit: card.de,
    answer: card.meaning,
    answerDe: card.de,
    extra: card.note || null,
    say: card.el,
    buildWord: /^[^\s,;!?·]+$/.test(card.el) && card.el.length >= 3 && card.el.length <= 11 ? card.el : null,
    emoji: card.emoji,
    example: null,
  };
}

const TYPES_BY_KIND = {
  letters: ["mc_greek", "listen", "mc_meaning"],
  combos: ["mc_meaning", "listen", "build"],
  vocab: ["mc_meaning", "mc_greek", "listen", "build", "type"],
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Freitext-Vergleich: nachsichtig, aber nicht beliebig ──
export function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const stripArticle = (s) => s.replace(/^(der|die|das|ein|eine|einen|einem)\s+/, "");

export function acceptedAnswers(answer) {
  const out = new Set();
  const add = (s) => {
    const n = normalizeText(s);
    if (n) { out.add(n); out.add(stripArticle(n)); }
  };
  add(answer);
  add(answer.replace(/\([^)]*\)/g, ""));          // "eins (1)" -> "eins"
  const inside = answer.match(/\(([^)]*)\)/);
  if (inside) add(inside[1]);                      // -> "1"
  answer.split(/[\/,]/).forEach(add);              // "Bitte / Gern"
  return out;
}

export function checkTyped(input, answer) {
  const n = normalizeText(input);
  if (!n) return false;
  return acceptedAnswers(answer).has(n) || acceptedAnswers(answer).has(stripArticle(n));
}

// ── Runde bauen ──
export function buildRound(poolCards, allCards, { forceType = null } = {}) {
  const card = pick(poolCards);
  const allowed = TYPES_BY_KIND[card.kind] || ["mc_meaning"];
  let type = forceType || pick(allowed);
  if (type === "build" && !card.buildWord) type = "mc_meaning";
  if (type === "type" && card.kind !== "vocab") type = "mc_meaning";

  if (type === "build") {
    const word = card.buildWord;
    const tiles = shuffle(Array.from(word).map((ch, i) => ({ ch, id: i })));
    return { card, type, word, tiles };
  }

  if (type === "type") {
    return { card, type };
  }

  // Multiple Choice: Ablenker müssen sich in der ANZEIGE unterscheiden,
  // sonst gäbe es zwei richtige Lösungen (z. B. η, ι, υ klingen alle "i").
  const showField = type === "mc_meaning" ? "answer" : "greek";
  const correctShown = card[showField];
  const seen = new Set([correctShown]);
  const sameLesson = allCards.filter((c) => c.lessonId === card.lessonId && c.key !== card.key);
  const sameKind = allCards.filter((c) => c.kind === card.kind && c.key !== card.key);
  const distractors = [];
  for (const c of [...shuffle(sameLesson), ...shuffle(sameKind)]) {
    if (distractors.length >= 3) break;
    const shown = c[showField];
    if (seen.has(shown)) continue;
    seen.add(shown);
    distractors.push(c);
  }
  const options = shuffle([card, ...distractors]);
  return { card, type, options, showField };
}

// ── Tipps ──
export function hintFor(round, state = {}) {
  const { card, type } = round;
  if (type === "build") {
    const next = round.word[(state.placed || []).length];
    return next ? "Der nächste Buchstabe ist „" + next + "“." : "Fast fertig!";
  }
  if (type === "type") {
    const clean = card.answer.replace(/\([^)]*\)/g, "").trim();
    return "Lautschrift: " + card.translit + " · beginnt mit „" + clean.charAt(0) + "“";
  }
  if (type === "listen") return "Lautschrift: " + card.translit;
  if (type === "mc_greek") return "Lautschrift: " + card.translit;
  return "Lautschrift: " + card.translit + (card.extra ? " · " + card.extra : "");
}

// Bei Multiple Choice blendet der Tipp zwei falsche Antworten aus.
export function eliminateTwo(round) {
  if (!round.options) return [];
  const wrong = round.options.filter((o) => o.key !== round.card.key);
  return shuffle(wrong).slice(0, 2).map((o) => o.key);
}
