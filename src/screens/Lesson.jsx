import React from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import Mascot from "../components/Mascot.jsx";
import { C, SpeechBubble, PrimaryButton, SayButton, GreekWord } from "../components/ui.jsx";

export default function Lesson({ lesson, index, mascot, mood, onNext, onPrev, onExit }) {
  const item = lesson.items[index];
  const isLetter = lesson.kind === "letters";
  const isCombo = lesson.kind === "combos";
  const last = index === lesson.items.length - 1;

  // Was groß in der Mitte steht + die Lautschrift darunter
  const bigGreek = isLetter ? `${item.upper} ${item.lower}` : isCombo ? item.combo : item.el;
  const bigTranslit = isLetter ? item.nameDe : isCombo ? item.soundDe : item.de;
  const sayMain = isLetter ? item.name : isCombo ? item.ex.el : item.el;

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-5">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onExit} style={{ color: C.mute }} aria-label="Zurück"><ArrowLeft size={20} /></button>
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[60%]">
          {lesson.items.map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-full"
              style={{ background: i === index ? C.blue : i < index ? "#B7CBD6" : C.line }} />
          ))}
        </div>
        <span className="text-xs tabular-nums" style={{ color: C.mute }}>{index + 1}/{lesson.items.length}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <Mascot height={112} mascot={mascot} mood={mood} />

        {isLetter && (
          <SpeechBubble>
            Das ist <b>{item.name}</b>.
            <span className="block text-sm mt-1" style={{ color: C.soft }}>So klingt’s: {item.sound}</span>
          </SpeechBubble>
        )}
        {isCombo && (
          <SpeechBubble>
            <b>{item.combo}</b> spricht sich „{item.soundDe}“.
            <span className="block text-sm mt-1" style={{ color: C.soft }}>{item.sound}</span>
          </SpeechBubble>
        )}
        {!isLetter && !isCombo && <SpeechBubble><b>{item.meaning}</b></SpeechBubble>}

        {/* Hauptkarte */}
        <div className="w-full rounded-3xl px-5 py-5 flex flex-col items-center gap-3"
          style={{ background: C.card, border: `2px solid ${C.line}` }}>
          <GreekWord greek={bigGreek} translit={bigTranslit} size={isLetter || isCombo ? "xxl" : "xl"} />
          {!isLetter && !isCombo && (
            <p className="text-base" style={{ color: C.soft }}>{item.emoji} {item.meaning}</p>
          )}
          <SayButton text={sayMain} label={isCombo ? "Beispiel hören" : "anhören"} size="lg" />
        </div>

        {/* Beispielwort mit eigener Aussprache */}
        {item.ex && (
          <div className="w-full rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: C.card, border: `2px solid ${C.line}` }}>
            <span className="text-3xl shrink-0">{item.ex.emoji}</span>
            <div className="text-left flex-1 min-w-0">
              <p style={{ fontFamily: "Georgia, serif", color: C.blue }} className="text-lg leading-tight">{item.ex.el}</p>
              <p className="text-sm" style={{ color: C.orangeInk }}>[{item.ex.de}]</p>
              <p className="text-sm" style={{ color: C.mute }}>{item.ex.meaning}</p>
            </div>
            <div className="shrink-0"><SayButton text={item.ex.el} label="" /></div>
          </div>
        )}

        {/* Zweites Beispiel (z. B. Gamma hat zwei Laute) */}
        {item.ex2 && (
          <div className="w-full rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: C.card, border: `2px solid ${C.line}` }}>
            <span className="text-3xl shrink-0">{item.ex2.emoji}</span>
            <div className="text-left flex-1 min-w-0">
              <p style={{ fontFamily: "Georgia, serif", color: C.blue }} className="text-lg leading-tight">{item.ex2.el}</p>
              <p className="text-sm" style={{ color: C.orangeInk }}>[{item.ex2.de}]</p>
              <p className="text-sm" style={{ color: C.mute }}>{item.ex2.meaning}</p>
            </div>
            <div className="shrink-0"><SayButton text={item.ex2.el} label="" /></div>
          </div>
        )}

        {item.note && (
          <div className="w-full rounded-2xl px-4 py-2.5 flex items-start gap-2 text-left"
            style={{ background: "#FBEFD9", border: "1px solid #EBCF97" }}>
            <Info size={15} color="#8A6420" className="mt-0.5 shrink-0" />
            <p className="text-sm" style={{ color: "#8A6420" }}>{item.note}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        {index > 0 && (
          <button onClick={onPrev} className="py-3.5 px-5 rounded-full"
            style={{ background: C.card, border: `2px solid ${C.line}`, color: C.soft }} aria-label="Zurück">
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="flex-1">
          <PrimaryButton onClick={onNext}>
            {last ? "Lektion fertig" : "Weiter"} <ArrowRight size={17} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
