import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import Mascot from "../components/Mascot.jsx";
import { C, PrimaryButton } from "../components/ui.jsx";
import { MASCOTS } from "../data/mascots.js";

function Group({ title, list, currentId, onPick }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-medium px-1 mb-2" style={{ color: C.soft }}>{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {list.map((m) => {
          const active = m.id === currentId;
          return (
            <button key={m.id} onClick={() => onPick(m.id)}
              className="relative flex flex-col items-center gap-0.5 rounded-3xl pt-3 pb-3 px-2 active:scale-[.98] transition"
              style={{ background: active ? "#EAF1F6" : C.card, border: `2.5px solid ${active ? C.blue : C.line}` }}>
              {active && (
                <span className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                  style={{ width: 22, height: 22, background: C.blue }}>
                  <Check size={14} color={C.bg} />
                </span>
              )}
              <Mascot height={104} mascot={m} />
              <span className="text-base font-medium" style={{ color: C.ink }}>{m.name}</span>
              <span className="text-[11px]" style={{ color: C.mute }}>{m.kindLabel}</span>
              <span className="text-[11px] leading-tight text-center px-1" style={{ color: C.mute }}>{m.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Mascots({ currentId, onPick, onDone }) {
  const current = MASCOTS.find((m) => m.id === currentId) || MASCOTS[0];
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-6">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onDone} className="flex items-center gap-1.5 text-sm" style={{ color: C.mute }}>
          <ArrowLeft size={16} /> Zurück
        </button>
      </div>
      <h1 className="text-xl font-medium text-center" style={{ color: C.blue }}>Wer soll dich begleiten?</h1>
      <p className="text-sm text-center mb-5" style={{ color: C.mute }}>Katzen und Füchse – such dir eins aus.</p>

      <Group title="🐱 Katzen" list={MASCOTS.filter((m) => m.species === "cat")} currentId={currentId} onPick={onPick} />
      <Group title="🦊 Füchse" list={MASCOTS.filter((m) => m.species === "fox")} currentId={currentId} onPick={onPick} />

      <div className="mt-auto pb-2">
        <PrimaryButton onClick={onDone}>Mit {current.name} lernen</PrimaryButton>
      </div>
    </div>
  );
}
