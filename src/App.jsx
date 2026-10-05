import React, { useState, useEffect, useMemo, useRef } from "react";
import Mascot from "./components/Mascot.jsx";
import { C, Confetti, PrimaryButton, SpeechBubble } from "./components/ui.jsx";
import Home from "./screens/Home.jsx";
import Lesson from "./screens/Lesson.jsx";
import Practice from "./screens/Practice.jsx";
import Mascots from "./screens/Mascots.jsx";
import BadgesScreen from "./screens/Badges.jsx";
import Backup from "./screens/Backup.jsx";
import { LESSONS, ALL_CARDS, cardKey } from "./data/lessons.js";
import { getMascot } from "./data/mascots.js";
import { loadProgress, saveProgress, clearProgress, emptyProgress } from "./lib/storage.js";
import { initSpeech, subscribeSpeech } from "./lib/speech.js";
import { normalizeCard } from "./lib/exercises.js";
import { bumpStreak, newBadges, levelInfo, XP_CORRECT, XP_NO_HINT_BONUS, XP_NEW_CARD } from "./lib/game.js";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(emptyProgress);
  const [screen, setScreen] = useState("home");
  const [lessonId, setLessonId] = useState(LESSONS[0].id);
  const [itemIndex, setItemIndex] = useState(0);
  const [mood, setMood] = useState("idle");
  const [confettiRun, setConfettiRun] = useState(0);
  const [awards, setAwards] = useState([]);
  const [speechState, setSpeechState] = useState({ supported: true, ready: false, greekVoice: true });
  const lastLevel = useRef(1);

  // ── Start ──
  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    lastLevel.current = levelInfo(p.xp || 0).level;
    setLoading(false);
    const stopSpeech = initSpeech();
    const unsub = subscribeSpeech(setSpeechState);
    return () => { stopSpeech(); unsub(); };
  }, []);

  // ── Autosave nach jeder Änderung ──
  useEffect(() => {
    if (!loading) saveProgress(progress);
  }, [progress, loading]);

  // Jede Änderung zählt als Aktivität für die Tagesserie.
  const update = (updater) => setProgress((p) => bumpStreak(typeof updater === "function" ? updater(p) : updater));

  // ── Neue Abzeichen vergeben (als Effekt, nicht im Updater) ──
  useEffect(() => {
    if (loading) return;
    const earned = newBadges(progress);
    if (!earned.length) return;
    setProgress((p) => ({ ...p, badges: [...(p.badges || []), ...earned.map((b) => b.id)] }));
    setAwards((a) => [...a, ...earned.map((b) => ({ kind: "badge", badge: b }))]);
    setConfettiRun((r) => r + 1);
  }, [progress, loading]);

  // ── Level-Aufstieg feiern ──
  useEffect(() => {
    if (loading) return;
    const lvl = levelInfo(progress.xp || 0);
    if (lvl.level > lastLevel.current) {
      lastLevel.current = lvl.level;
      setAwards((a) => [...a, { kind: "level", level: lvl }]);
      setConfettiRun((r) => r + 1);
    }
  }, [progress.xp, loading]);

  const mascot = getMascot(progress.mascot);
  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  const normalizedAll = useMemo(() => ALL_CARDS.map(normalizeCard), []);
  const learnedPool = useMemo(
    () => normalizedAll.filter((c) => progress.learned[c.key]),
    [normalizedAll, progress.learned]
  );

  const flashMood = (m) => { setMood(m); setTimeout(() => setMood("idle"), 900); };

  // ── Lernen ──
  const openLesson = (id) => {
    const l = LESSONS.find((x) => x.id === id) || LESSONS[0];
    const firstNew = l.items.findIndex((it) => !progress.learned[cardKey(l.id, it.id)]);
    setLessonId(id);
    setItemIndex(firstNew === -1 ? 0 : firstNew);
    setScreen("lesson");
  };

  // Eine aufgeschlagene Karte gilt als gelernt (kleine XP beim ersten Mal).
  useEffect(() => {
    if (loading || screen !== "lesson") return;
    const item = lesson.items[itemIndex];
    if (!item) return;
    const key = cardKey(lesson.id, item.id);
    if (progress.learned[key]) return;
    flashMood("happy");
    update((p) => (p.learned[key] ? p : {
      ...p,
      learned: { ...p.learned, [key]: 1 },
      xp: (p.xp || 0) + XP_NEW_CARD,
    }));
    // progress absichtlich nicht in den Abhängigkeiten – sonst Endlosschleife.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, itemIndex, lessonId, loading]);

  const nextItem = () => {
    if (itemIndex < lesson.items.length - 1) setItemIndex((i) => i + 1);
    else { setConfettiRun((r) => r + 1); setScreen("home"); }
  };

  // ── Üben ──
  const handleResult = (correct, usedHint, key, run) => {
    flashMood(correct ? "happy" : "sad");
    update((p) => correct
      ? {
          ...p,
          bestRun: Math.max(p.bestRun || 0, run),
          xp: (p.xp || 0) + XP_CORRECT + (usedHint ? 0 : XP_NO_HINT_BONUS),
          correct: { ...p.correct, [key]: (p.correct?.[key] || 0) + 1 },
          answered: (p.answered || 0) + 1,
          totalCorrect: (p.totalCorrect || 0) + 1,
        }
      : { ...p, answered: (p.answered || 0) + 1 });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4" style={{ background: C.bg }}>
        <style>{styles}</style>
        <Mascot height={110} />
        <p className="text-sm" style={{ color: C.mute }}>Einen Moment …</p>
      </div>
    );
  }

  const award = awards[0] || null;

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg }}>
      <style>{styles}</style>
      <Confetti run={confettiRun} />

      {screen === "home" && (
        <Home progress={progress} mascot={mascot} onStartLesson={openLesson}
          onPractice={() => setScreen("practice")} onNav={setScreen} />
      )}

      {screen === "lesson" && (
        <Lesson lesson={lesson} index={itemIndex} mascot={mascot} mood={mood}
          onNext={nextItem} onPrev={() => setItemIndex((i) => Math.max(0, i - 1))}
          onExit={() => setScreen("home")} />
      )}

      {screen === "practice" && (
        learnedPool.length >= 4 ? (
          <Practice pool={learnedPool} allCards={normalizedAll} mascot={mascot}
            onResult={handleResult} onExit={() => setScreen("home")} />
        ) : (
          <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
            <Mascot height={130} mascot={mascot} />
            <SpeechBubble>Lerne erst ein paar Karten, dann üben wir zusammen!</SpeechBubble>
            <PrimaryButton onClick={() => setScreen("home")}>Zurück</PrimaryButton>
          </div>
        )
      )}

      {screen === "mascots" && (
        <Mascots currentId={progress.mascot}
          onPick={(id) => update((p) => ({ ...p, mascot: id }))}
          onDone={() => setScreen("home")} />
      )}

      {screen === "badges" && <BadgesScreen progress={progress} onDone={() => setScreen("home")} />}

      {screen === "backup" && (
        <Backup progress={progress}
          onSaveNow={() => saveProgress(progress)}
          onImport={(p) => { setProgress(p); lastLevel.current = levelInfo(p.xp || 0).level; }}
          onReset={() => { clearProgress(); setProgress(emptyProgress()); lastLevel.current = 1; setAwards([]); }}
          onDone={() => setScreen("home")} />
      )}

      {/* Feier für Abzeichen und neue Level */}
      {award && (
        <div className="fixed inset-0 flex items-center justify-center px-6" style={{ background: "rgba(27,79,114,.45)", zIndex: 60 }}>
          <div className="w-full max-w-sm rounded-3xl px-6 py-7 text-center flex flex-col items-center gap-2"
            style={{ background: C.card, border: `3px solid ${C.orange}` }}>
            <p className="text-5xl">{award.kind === "badge" ? award.badge.emoji : award.level.emoji}</p>
            <p className="text-sm" style={{ color: C.orangeInk }}>
              {award.kind === "badge" ? "Neues Abzeichen!" : "Neues Level!"}
            </p>
            <p className="text-xl font-medium" style={{ color: C.blue }}>
              {award.kind === "badge" ? award.badge.title : `Level ${award.level.level} · ${award.level.title}`}
            </p>
            <p className="text-sm mb-2" style={{ color: C.mute }}>
              {award.kind === "badge" ? award.badge.desc : "Weiter so – du machst das super!"}
            </p>
            <PrimaryButton onClick={() => setAwards((a) => a.slice(1))}>Σούπερ!</PrimaryButton>
          </div>
        </div>
      )}

      {/* Hinweis, falls keine griechische Stimme installiert ist */}
      {speechState.supported && speechState.ready && !speechState.greekVoice && screen !== "mascots" && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-2xl px-4 py-2 text-[11px] text-center"
          style={{ background: "#FBEFD9", color: "#8A6420", border: "1px solid #EBCF97", zIndex: 40 }}>
          Für den Ton fehlt eine griechische Stimme. In den Geräte-Einstellungen unter „Sprache / Text-in-Sprache“ Griechisch (ελληνικά) hinzufügen.
        </div>
      )}
    </div>
  );
}

const styles = `
  @keyframes bob { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(-1.5deg); } }
  @keyframes pop { 0% { transform: scale(1); } 40% { transform: scale(1.12); } 100% { transform: scale(1); } }
  @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
  @keyframes sparkle { 0% { opacity: 0; transform: translateY(4px) scale(.6); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-14px) scale(1); } }
  @keyframes fall { 0% { opacity: 0; transform: translateY(-10vh) rotate(0deg); } 10% { opacity: 1; } 100% { opacity: 0; transform: translateY(85vh) rotate(420deg); } }
  .mascot-bob { animation: bob 3.6s ease-in-out infinite; }
  .mascot-pop { animation: pop .5s ease-in-out; }
  .mascot-shake { animation: shake .4s ease-in-out; }
  .sparkle { position: absolute; font-size: 16px; animation: sparkle 1s ease-out; }
  .confetti-bit { position: absolute; top: 0; animation: fall 1.6s ease-in forwards; }
  input, textarea { font-size: 16px; }
`;
