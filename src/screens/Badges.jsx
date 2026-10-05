import React from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { C, Bar } from "../components/ui.jsx";
import { BADGES, levelInfo, LEVELS } from "../lib/game.js";

export default function Badges({ progress, onDone }) {
  const have = new Set(progress.badges || []);
  const lvl = levelInfo(progress.xp || 0);
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-6 gap-4">
      <div className="flex items-center justify-between">
        <button onClick={onDone} className="flex items-center gap-1.5 text-sm" style={{ color: C.mute }}>
          <ArrowLeft size={16} /> Zurück
        </button>
      </div>

      <div className="rounded-3xl px-4 py-4 text-center" style={{ background: C.card, border: `2px solid ${C.line}` }}>
        <p className="text-4xl">{lvl.emoji}</p>
        <p className="text-lg font-medium mt-1" style={{ color: C.blue }}>Level {lvl.level} · {lvl.title}</p>
        <p className="text-sm mb-2" style={{ color: C.mute }}>{progress.xp || 0} XP</p>
        <Bar pct={lvl.pct} color={C.orange} />
        <p className="text-xs mt-1.5" style={{ color: C.mute }}>
          {lvl.next ? `Noch ${lvl.toNext} XP bis „${lvl.next.title}“` : "Höchstes Level erreicht!"}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium px-1 mb-2" style={{ color: C.soft }}>
          Abzeichen · {have.size} von {BADGES.length}
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {BADGES.map((b) => {
            const got = have.has(b.id);
            return (
              <div key={b.id} className="rounded-2xl px-3 py-3 text-center"
                style={{ background: got ? C.card : "#F4F1EA", border: `2px solid ${got ? C.orange : "#EAE6DC"}`, opacity: got ? 1 : 0.7 }}>
                <p className="text-3xl">{got ? b.emoji : "🔒"}</p>
                <p className="text-sm font-medium mt-1" style={{ color: got ? C.ink : C.mute }}>{b.title}</p>
                <p className="text-[11px] leading-tight mt-0.5" style={{ color: C.mute }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium px-1 mb-2" style={{ color: C.soft }}>Alle Level</p>
        <div className="flex flex-col gap-1.5">
          {LEVELS.map((l, i) => {
            const reached = (progress.xp || 0) >= l.min;
            return (
              <div key={l.title} className="rounded-xl px-3 py-2 flex items-center gap-2.5"
                style={{ background: reached ? C.card : "#F4F1EA", border: `1.5px solid ${reached ? C.line : "#EAE6DC"}` }}>
                <span className="text-lg">{reached ? l.emoji : "🔒"}</span>
                <span className="flex-1 text-sm" style={{ color: reached ? C.ink : C.mute }}>Level {i + 1} · {l.title}</span>
                <span className="text-xs tabular-nums" style={{ color: C.mute }}>{l.min} XP</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
