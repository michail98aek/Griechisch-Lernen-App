import React from "react";
import { Sparkles, Lock, Check, Dumbbell, Save, Award, PawPrint, Flame } from "lucide-react";
import Mascot from "../components/Mascot.jsx";
import { C, SpeechBubble, Bar, PrimaryButton, GhostButton, Chip } from "../components/ui.jsx";
import { LESSONS } from "../data/lessons.js";
import { levelInfo, lessonProgress, overallProgress, isLessonUnlocked, isLessonDone } from "../lib/game.js";

export default function Home({ progress, mascot, onStartLesson, onPractice, onNav }) {
  const lvl = levelInfo(progress.xp || 0);
  const all = overallProgress(progress);
  const learnedCount = Object.keys(progress.learned).length;

  const nextIdx = LESSONS.findIndex((l, i) => isLessonUnlocked(progress, i) && !isLessonDone(progress, l));
  const nextLesson = nextIdx === -1 ? null : LESSONS[nextIdx];

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-6 gap-4">
      <div className="flex flex-col items-center gap-3">
        <Mascot height={150} mascot={mascot} />
        <SpeechBubble>
          {learnedCount === 0
            ? mascot.greeting + " Lass uns Griechisch lernen!"
            : all.pct === 100
            ? "Du hast alles geschafft! Lass uns üben, damit es sitzt."
            : `Schön, dass du da bist! Du hast schon ${all.pct} % geschafft.`}
        </SpeechBubble>
      </div>

      {/* Gesamtfortschritt */}
      <div className="rounded-3xl px-4 py-3.5" style={{ background: C.card, border: `2px solid ${C.line}` }}>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: C.soft }}>Gesamtfortschritt</span>
          <span className="text-2xl font-semibold" style={{ color: C.blue }}>{all.pct} %</span>
        </div>
        <Bar pct={all.pct} />
        <p className="text-xs mt-1.5" style={{ color: C.mute }}>{all.done} von {all.total} Karten gelernt</p>
      </div>

      {/* Level + Serie */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl px-4 py-3" style={{ background: C.card, border: `2px solid ${C.line}` }}>
          <p className="text-xs" style={{ color: C.mute }}>Level {lvl.level}</p>
          <p className="text-base font-medium leading-tight" style={{ color: C.blue }}>{lvl.emoji} {lvl.title}</p>
          <div className="mt-2"><Bar pct={lvl.pct} height={7} color={C.orange} /></div>
          <p className="text-[11px] mt-1" style={{ color: C.mute }}>
            {lvl.next ? `${lvl.toNext} XP bis „${lvl.next.title}“` : "höchstes Level!"}
          </p>
        </div>
        <div className="rounded-3xl px-4 py-3 flex flex-col justify-between" style={{ background: C.card, border: `2px solid ${C.line}` }}>
          <p className="text-xs" style={{ color: C.mute }}>Tagesserie</p>
          <p className="text-2xl font-semibold flex items-center gap-1.5" style={{ color: C.orangeInk }}>
            <Flame size={22} /> {progress.streakDays || 0}
          </p>
          <p className="text-[11px]" style={{ color: C.mute }}>
            {(progress.xp || 0)} XP · Beste Serie {progress.bestRun || 0}
          </p>
        </div>
      </div>

      {nextLesson ? (
        <PrimaryButton onClick={() => onStartLesson(nextLesson.id)}>
          {nextLesson.emoji} {lessonProgress(progress, nextLesson).done > 0 ? "Weiter:" : "Lernen:"} {nextLesson.title}
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => onStartLesson(LESSONS[0].id)}>Noch mal durchgehen</PrimaryButton>
      )}

      {learnedCount >= 4 && (
        <GhostButton tone="orange" onClick={onPractice}>
          <Dumbbell size={17} /> Üben &amp; Spielen
        </GhostButton>
      )}

      {/* Lektionsliste */}
      <div className="flex flex-col gap-2 mt-1">
        <p className="text-sm font-medium px-1" style={{ color: C.soft }}>Alle Lektionen</p>
        {LESSONS.map((l, i) => {
          const lp = lessonProgress(progress, l);
          const unlocked = isLessonUnlocked(progress, i);
          const done = lp.pct === 100;
          return (
            <button key={l.id} disabled={!unlocked} onClick={() => onStartLesson(l.id)}
              className="rounded-2xl px-4 py-3 flex items-center gap-3 text-left active:scale-[.99] transition"
              style={{
                background: unlocked ? C.card : "#F4F1EA",
                border: `2px solid ${done ? C.green : unlocked ? C.line : "#EAE6DC"}`,
                opacity: unlocked ? 1 : 0.65,
              }}>
              <span className="text-xl w-7 text-center">{unlocked ? l.emoji : "🔒"}</span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-medium truncate" style={{ color: unlocked ? C.ink : C.mute }}>{l.title}</span>
                  {done && <Check size={15} color={C.green} />}
                </span>
                <span className="text-xs block truncate" style={{ color: C.mute }}>
                  {unlocked ? l.subtitle : "Erst die Lektion davor fertig machen"}
                </span>
                {unlocked && <span className="block mt-1.5"><Bar pct={lp.pct} height={6} color={done ? C.green : C.blue2} /></span>}
              </span>
              <span className="text-xs tabular-nums" style={{ color: C.mute }}>
                {unlocked ? `${lp.done}/${lp.total}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2 mb-2">
        <GhostButton small onClick={() => onNav("mascots")}><PawPrint size={15} /> Tier</GhostButton>
        <GhostButton small onClick={() => onNav("badges")}><Award size={15} /> Abzeichen</GhostButton>
        <GhostButton small onClick={() => onNav("backup")}><Save size={15} /> Sichern</GhostButton>
      </div>
    </div>
  );
}
