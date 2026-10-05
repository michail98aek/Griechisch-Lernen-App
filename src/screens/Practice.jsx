import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Lightbulb, Volume2, Delete, CornerDownLeft, Flame } from "lucide-react";
import Mascot from "../components/Mascot.jsx";
import { C, SpeechBubble, PrimaryButton, GhostButton, Chip, GreekWord, SayButton } from "../components/ui.jsx";
import { speak } from "../lib/speech.js";
import { buildRound, hintFor, eliminateTwo, checkTyped, labelFor } from "../lib/exercises.js";

export default function Practice({ pool, allCards, mascot, onResult, onExit }) {
  const [round, setRound] = useState(() => buildRound(pool, allCards));
  const [feedback, setFeedback] = useState(null);
  const [hint, setHint] = useState(null);
  const [eliminated, setEliminated] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [typed, setTyped] = useState("");
  const [run, setRun] = useState(0);
  const [score, setScore] = useState(0);
  const spokenFor = useRef(null);

  // Bei Hör-Aufgaben einmal automatisch vorlesen.
  useEffect(() => {
    if (round.type === "listen" && spokenFor.current !== round.card.key + round.type) {
      spokenFor.current = round.card.key + round.type;
      speak(round.card.say);
    }
  }, [round]);

  const nextRound = () => {
    setFeedback(null); setHint(null); setEliminated([]); setPlaced([]); setTyped("");
    setRound(buildRound(pool, allCards));
  };

  const finish = (correct) => {
    setFeedback(correct ? "right" : "wrong");
    const newRun = correct ? run + 1 : 0;
    setRun(newRun);
    if (correct) setScore((s) => s + 1);
    onResult(correct, !!hint, round.card.key, newRun);
    // Bei Fehler das Richtige vorsprechen – so lernt man die Aussprache mit.
    if (!correct) setTimeout(() => speak(round.card.say), 350);
    setTimeout(nextRound, correct ? 1000 : 2100);
  };

  const askHint = () => {
    if (feedback || hint) return;
    setHint(hintFor(round, { placed }));
    if (round.options) setEliminated(eliminateTwo(round));
  };

  const mood = feedback === "right" ? "happy" : feedback === "wrong" ? "sad" : "idle";

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-5">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onExit} className="flex items-center gap-1.5 text-sm" style={{ color: C.mute }}>
          <ArrowLeft size={16} /> Zurück
        </button>
        <div className="flex items-center gap-2">
          <Chip bg={C.sand}>⭐ {score}</Chip>
          {run >= 2 && <Chip bg="#FBEFD9" color="#8A6420"><span className="inline-flex items-center gap-1"><Flame size={11} /> {run}</span></Chip>}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
        <Mascot height={104} mascot={mascot} mood={mood} />

        {feedback ? (
          <SpeechBubble tone={feedback === "right" ? "good" : "bad"}>
            {feedback === "right"
              ? run >= 5 ? `Πολύ καλά! ${run} richtige am Stück!` : "Richtig! Πολύ καλά!"
              : <>Fast! Richtig ist: <b>{round.card.answer}</b> – <span style={{ fontFamily: "Georgia, serif" }}>{round.card.greek}</span> [{round.card.translit}]</>}
          </SpeechBubble>
        ) : (
          <SpeechBubble>{labelFor(round)}</SpeechBubble>
        )}

        {/* ── Aufgabe ── */}
        {round.type === "listen" && (
          <button onClick={() => speak(round.card.say)}
            className="w-24 h-24 rounded-full flex items-center justify-center active:scale-95 transition"
            style={{ background: C.blue }} aria-label="Nochmal hören">
            <Volume2 size={34} color={C.bg} />
          </button>
        )}

        {round.type === "mc_meaning" && (
          <div className="flex flex-col items-center gap-2">
            <GreekWord greek={round.card.greek} translit={hint ? round.card.translit : null} size="xxl" />
            <SayButton text={round.card.say} label="anhören" />
          </div>
        )}

        {round.type === "mc_greek" && (
          round.card.kind === "letters" ? (
            // Nicht den griechischen Namen zeigen – der stünde ja schon in der Antwort.
            <div className="flex flex-col items-center gap-1 px-4">
              <p className="text-3xl font-medium tracking-wide" style={{ color: C.orangeInk }}>[{round.card.answerDe}]</p>
              <p className="text-sm" style={{ color: C.soft }}>{round.card.extra}</p>
            </div>
          ) : (
            <p className="text-xl font-medium px-2" style={{ color: C.ink }}>
              {round.card.emoji} {round.card.answer}
            </p>
          )
        )}

        {round.type === "type" && (
          <div className="w-full flex flex-col items-center gap-3">
            <GreekWord greek={round.card.greek} translit={round.card.translit} size="xl" />
            <SayButton text={round.card.say} label="anhören" />
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && typed.trim() && !feedback) finish(checkTyped(typed, round.card.answer)); }}
              disabled={!!feedback}
              placeholder="auf Deutsch eintippen …"
              autoComplete="off" autoCorrect="off" spellCheck="false"
              className="w-full px-4 py-3 rounded-2xl text-center text-lg outline-none"
              style={{ background: C.card, border: `2px solid ${feedback ? C.line : C.blue2}`, color: C.ink }}
            />
          </div>
        )}

        {round.type === "build" && (
          <div className="w-full flex flex-col items-center gap-3">
            <p className="text-lg" style={{ color: C.ink }}>{round.card.emoji} {round.card.answer}</p>
            {/* Ablagefeld */}
            <div className="w-full min-h-[58px] rounded-2xl px-3 py-2 flex items-center justify-center gap-1 flex-wrap"
              style={{ background: C.card, border: `2px dashed ${C.blue2}` }}>
              {placed.length === 0 && <span className="text-sm" style={{ color: C.mute }}>Buchstaben antippen …</span>}
              {placed.map((tid) => {
                const t = round.tiles.find((x) => x.id === tid);
                return (
                  <span key={tid} className="px-2.5 py-1 rounded-lg text-2xl"
                    style={{ fontFamily: "Georgia, serif", background: C.sand, color: C.blue }}>{t.ch}</span>
                );
              })}
            </div>
            {/* Vorrat */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {round.tiles.filter((t) => !placed.includes(t.id)).map((t) => (
                <button key={t.id} disabled={!!feedback}
                  onClick={() => {
                    const next = [...placed, t.id];
                    setPlaced(next);
                    if (next.length === round.word.length) {
                      const made = next.map((id) => round.tiles.find((x) => x.id === id).ch).join("");
                      setTimeout(() => finish(made === round.word), 150);
                    }
                  }}
                  className="px-3 py-2 rounded-xl text-2xl active:scale-95 transition"
                  style={{ fontFamily: "Georgia, serif", background: C.card, border: `2px solid ${C.line}`, color: C.blue }}>
                  {t.ch}
                </button>
              ))}
            </div>
            {placed.length > 0 && !feedback && (
              <button onClick={() => setPlaced(placed.slice(0, -1))}
                className="flex items-center gap-1.5 text-sm" style={{ color: C.mute }}>
                <Delete size={15} /> letzten zurück
              </button>
            )}
          </div>
        )}

        {/* ── Antwortmöglichkeiten ── */}
        {round.options && (
          <div className={`grid gap-2.5 w-full ${round.type === "mc_meaning" ? "grid-cols-1" : "grid-cols-2"}`}>
            {round.options.map((o) => {
              const isRight = o.key === round.card.key;
              const gone = eliminated.includes(o.key);
              const show = feedback && isRight;
              return (
                <button key={o.key} disabled={!!feedback || gone}
                  onClick={() => finish(isRight)}
                  className="rounded-2xl px-3 py-3.5 active:scale-[.98] transition"
                  style={{
                    background: show ? C.greenBg : C.card,
                    border: `2px solid ${show ? C.green : C.line}`,
                    color: C.blue,
                    opacity: gone ? 0.25 : 1,
                    fontFamily: round.showField === "greek" || o.kind === "letters" ? "Georgia, serif" : "inherit",
                    fontSize: round.showField === "greek" ? 22 : o.kind === "letters" ? 20 : 15,
                  }}>
                  {o[round.showField]}
                  {round.showField === "greek" && (
                    <span className="block text-xs mt-0.5" style={{ color: C.mute, fontFamily: "inherit" }}>[{o.translit}]</span>
                  )}
                  {round.showField === "answer" && o.kind === "letters" && (
                    <span className="block text-xs mt-0.5" style={{ color: C.mute }}>[{o.answerDe}]</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Tipp */}
        {hint ? (
          <div className="w-full rounded-2xl px-4 py-2.5 flex items-start gap-2 text-left"
            style={{ background: "#FBEFD9", border: "1px solid #EBCF97" }}>
            <Lightbulb size={15} color="#8A6420" className="mt-0.5 shrink-0" />
            <p className="text-sm" style={{ color: "#8A6420" }}>{hint}</p>
          </div>
        ) : (
          !feedback && (
            <button onClick={askHint} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full"
              style={{ background: C.card, border: `2px solid ${C.orange}`, color: C.orangeInk }}>
              <Lightbulb size={15} /> Tipp zeigen
            </button>
          )
        )}
      </div>

      {round.type === "type" && !feedback && (
        <div className="mt-4">
          <PrimaryButton disabled={!typed.trim()} onClick={() => finish(checkTyped(typed, round.card.answer))}>
            <CornerDownLeft size={17} /> Prüfen
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
