import React, { useState, useEffect } from "react";
import { Volume2, ArrowLeft, ArrowRight, Sparkles, Lock } from "lucide-react";

const STORAGE_KEY = "kitty-greek-progress-v1";

const LESSON = [
  { upper: "Α", lower: "α", name: "Άλφα", short: "klingt wie A", phonetic: "a", emoji: "🐴", word: "άλογο", meaning: "Pferd" },
  { upper: "Β", lower: "β", name: "Βήτα", short: "klingt wie W", phonetic: "w", emoji: "📖", word: "βιβλίο", meaning: "Buch" },
  { upper: "Γ", lower: "γ", name: "Γάμμα", short: "klingt weich, fast wie J", phonetic: "j", emoji: "🐱", word: "γάτα", meaning: "Katze" },
  { upper: "Δ", lower: "δ", name: "Δέλτα", short: "klingt wie das englische TH", phonetic: "th", emoji: "🌳", word: "δέντρο", meaning: "Baum" },
  { upper: "Ε", lower: "ε", name: "Έψιλον", short: "klingt wie ein kurzes E", phonetic: "e", emoji: "🐘", word: "ελέφαντας", meaning: "Elefant" },
  { upper: "Ζ", lower: "ζ", name: "Ζήτα", short: "klingt weich wie ein S", phonetic: "s", emoji: "🍬", word: "ζάχαρη", meaning: "Zucker" },
];

const LOCKED = [
  { title: "Lektion 2", count: 6 },
  { title: "Lektion 3", count: 12 },
];

function CatFace({ height = 160, celebrate = false }) {
  const width = Math.round(height * 0.86);
  return (
    <div className={celebrate ? "cat-celebrate" : "cat-idle"} style={{ position: "relative", width, height }}>
      {celebrate && (
        <>
          <span className="sparkle" style={{ left: 0, top: 10 }}>✨</span>
          <span className="sparkle" style={{ right: -2, top: 20 }}>✨</span>
          <span className="sparkle" style={{ left: "42%", top: -6 }}>✨</span>
        </>
      )}
      <svg width={width} height={height} viewBox="0 0 172 200" aria-hidden="true">
        {/* tail */}
        <path
          d="M148,178 C186,176 194,128 166,104 C155,95 141,104 145,116 C150,130 165,136 160,156 C157,170 143,178 126,176"
          fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        />
        <path d="M160,110 C168,116 171,126 168,134" fill="none" stroke="#E8974E" strokeWidth="4" strokeLinecap="round" />

        {/* body */}
        <path
          d="M52,196 C46,142 60,110 86,110 C112,110 126,142 120,196 C120,204 96,208 86,208 C76,208 52,204 52,196 Z"
          fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="4" strokeLinejoin="round"
        />
        <ellipse cx="86" cy="168" rx="24" ry="32" fill="#FFFFFF" opacity="0.55" />

        {/* front paws */}
        <ellipse cx="68" cy="200" rx="14" ry="9" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="3.5" />
        <ellipse cx="104" cy="200" rx="14" ry="9" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="3.5" />
        <path d="M62,198 L62,203 M68,199 L68,204 M74,198 L74,203" stroke="#2C3E4A" strokeWidth="2" strokeLinecap="round" />
        <path d="M98,198 L98,203 M104,199 L104,204 M110,198 L110,203" stroke="#2C3E4A" strokeWidth="2" strokeLinecap="round" />

        {/* bow */}
        <path d="M72,132 L86,142 L100,132 L100,140 L86,150 L72,140 Z" fill="#2B6CA3" stroke="#2C3E4A" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="86" cy="140" r="4" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="2" />

        {/* ears */}
        <path d="M50,72 L36,26 L76,62 Z" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="4" strokeLinejoin="round" />
        <path d="M122,72 L136,26 L96,62 Z" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="4" strokeLinejoin="round" />
        <path d="M53,63 L43,36 L69,58 Z" fill="#E8974E" />
        <path d="M119,63 L129,36 L103,58 Z" fill="#E8974E" />

        {/* head */}
        <circle cx="86" cy="98" r="52" fill="#FBF6EC" stroke="#2C3E4A" strokeWidth="4" />
        <path d="M126,80 Q150,84 148,66" fill="#E8974E" stroke="#2C3E4A" strokeWidth="2.5" />

        {/* blush */}
        <circle cx="52" cy="112" r="9" fill="#E8974E" opacity="0.35" />
        <circle cx="120" cy="112" r="9" fill="#E8974E" opacity="0.35" />

        {/* eyes */}
        {celebrate ? (
          <>
            <path d="M64,96 L72,102 L80,96" fill="none" stroke="#2C3E4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M92,96 L100,102 L108,96" fill="none" stroke="#2C3E4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <ellipse cx="70" cy="98" rx="6" ry="7.5" fill="#2C3E4A" />
            <ellipse cx="102" cy="98" rx="6" ry="7.5" fill="#2C3E4A" />
            <circle cx="72.5" cy="95" r="1.8" fill="#FBF6EC" />
            <circle cx="104.5" cy="95" r="1.8" fill="#FBF6EC" />
          </>
        )}

        {/* nose + mouth */}
        <path d="M81,113 L91,113 L86,119 Z" fill="#E8974E" />
        <path d="M86,119 L86,124" stroke="#2C3E4A" strokeWidth="2" strokeLinecap="round" />
        {celebrate ? (
          <path d="M86,124 Q76,138 62,132 M86,124 Q96,138 110,132" fill="none" stroke="#2C3E4A" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <>
            <path d="M86,124 Q78,130 70,127" fill="none" stroke="#2C3E4A" strokeWidth="3" strokeLinecap="round" />
            <path d="M86,124 Q94,130 102,127" fill="none" stroke="#2C3E4A" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {/* whiskers */}
        <g stroke="#2C3E4A" strokeWidth="1.6" strokeLinecap="round">
          <path d="M56,108 L28,102" /><path d="M56,114 L27,114" /><path d="M56,120 L28,126" />
          <path d="M116,108 L144,102" /><path d="M116,114 L145,114" /><path d="M116,120 L144,126" />
        </g>
      </svg>
    </div>
  );
}

function SpeechBubble({ children }) {
  return (
    <div className="rounded-3xl px-5 py-4 text-base sm:text-lg leading-snug" style={{ background: "#FFFFFF", color: "#2C3E4A", border: "2px solid #E4DED0" }}>
      {children}
    </div>
  );
}

function PawRow({ total, filled }) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="text-lg" style={{ opacity: i < filled ? 1 : 0.25 }}>🐾</span>
      ))}
    </div>
  );
}

export default function GreekLearningApp() {
  const [loading, setLoading] = useState(true);
  const [learned, setLearned] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screen, setScreen] = useState("home");
  const [celebrating, setCelebrating] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speechOk, setSpeechOk] = useState(true);

  const [quizPool, setQuizPool] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChoices, setQuizChoices] = useState([]);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSpeechOk(false);
      return;
    }
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    try {
      if (!window.speechSynthesis) {
        setSpeechOk(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const greekVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("el"));
      if (greekVoice) utter.voice = greekVoice;
      utter.lang = "el-GR";
      utter.rate = 0.8;
      utter.onerror = () => setSpeechOk(false);
      window.speechSynthesis.speak(utter);
    } catch (e) {
      setSpeechOk(false);
    }
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.learned)) setLearned(new Set(data.learned));
        if (typeof data.currentIndex === "number") setCurrentIndex(data.currentIndex);
        if (data.screen === "lesson" || data.screen === "home") setScreen(data.screen);
      }
    } catch (e) {
      // noch kein gespeicherter Fortschritt vorhanden
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          learned: Array.from(learned),
          currentIndex,
          screen: screen === "quiz" ? "home" : screen,
        })
      );
    } catch (e) {
      // Speichern fehlgeschlagen, Sitzung läuft trotzdem weiter
    }
  }, [learned, currentIndex, screen, loading]);

  useEffect(() => {
    if (loading || screen !== "lesson") return;
    if (!learned.has(currentIndex)) {
      setCelebrating(true);
      setLearned((prev) => new Set(prev).add(currentIndex));
      const t = setTimeout(() => setCelebrating(false), 1000);
      return () => clearTimeout(t);
    }
  }, [currentIndex, screen, loading]);

  const firstUnlearned = LESSON.findIndex((_, i) => !learned.has(i));
  const allLearned = learned.size >= LESSON.length;

  const startLesson = () => {
    const target = firstUnlearned === -1 ? 0 : firstUnlearned;
    setCurrentIndex(target);
    setScreen("lesson");
  };

  const nextLetter = () => {
    if (currentIndex < LESSON.length - 1) setCurrentIndex((i) => i + 1);
    else setScreen("home");
  };

  const prevLetter = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    else setScreen("home");
  };

  const buildQuizRound = (pool) => {
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const others = pool.filter((i) => i !== correct);
    const wrongPoolSource = others.length >= 3 ? others : LESSON.map((_, i) => i).filter((i) => i !== correct);
    const wrong = [];
    while (wrong.length < 3 && wrongPoolSource.length > 0) {
      const pick = wrongPoolSource[Math.floor(Math.random() * wrongPoolSource.length)];
      if (!wrong.includes(pick)) wrong.push(pick);
    }
    const choices = [...wrong, correct].sort(() => Math.random() - 0.5);
    setQuizAnswer(correct);
    setQuizChoices(choices);
    setQuizFeedback(null);
    speak(LESSON[correct].upper + LESSON[correct].lower);
  };

  const startQuiz = () => {
    const pool = Array.from(learned);
    setQuizPool(pool);
    setQuizScore(0);
    setScreen("quiz");
    buildQuizRound(pool);
  };

  const answerQuiz = (choiceIdx) => {
    if (quizFeedback) return;
    const correct = choiceIdx === quizAnswer;
    setQuizFeedback(correct ? "right" : "wrong");
    if (correct) setQuizScore((s) => s + 1);
    setTimeout(() => buildQuizRound(quizPool), 1100);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4" style={{ background: "#FBF6EC" }}>
        <style>{introStyles}</style>
        <CatFace height={110} />
        <p className="text-sm" style={{ color: "#8A9AA5" }}>Einen Moment ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ background: "#FBF6EC" }}>
      <style>{introStyles}</style>

      {screen === "home" && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center gap-6">
          <CatFace height={190} celebrate={celebrating} />
          <SpeechBubble>
            {learned.size === 0 && "Γεια σου! Ich bin Mia. Lass uns zusammen Griechisch lernen!"}
            {learned.size > 0 && !allLearned && "Weiter geht's! Du machst das wirklich gut."}
            {allLearned && "Du kennst schon alle Buchstaben dieser Lektion! Wollen wir spielen?"}
          </SpeechBubble>

          <div className="w-full flex flex-col items-center gap-2">
            <PawRow total={LESSON.length} filled={learned.size} />
            <p className="text-sm" style={{ color: "#8A9AA5" }}>{learned.size} von {LESSON.length} Buchstaben gelernt</p>
          </div>

          <button onClick={startLesson} className="w-full py-4 rounded-full text-lg font-medium" style={{ background: "#1B4F72", color: "#FBF6EC" }}>
            {allLearned ? "Nochmal üben" : "Weiter lernen"}
          </button>

          {learned.size >= 3 && (
            <button
              onClick={startQuiz}
              className="w-full py-3.5 rounded-full text-base font-medium flex items-center justify-center gap-2"
              style={{ background: "#FFFFFF", color: "#B5722B", border: "2px solid #E8974E" }}
            >
              <Sparkles size={16} /> Rate-Spiel spielen
            </button>
          )}

          <div className="flex gap-2 mt-2">
            {LOCKED.map((l) => (
              <div key={l.title} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "#F1EEE6", color: "#A7AEB4" }}>
                <Lock size={11} /> {l.title} bald
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "lesson" && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col px-6 py-6">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setScreen("home")} style={{ color: "#8A9AA5" }}>
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-1.5">
              {LESSON.map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ background: i === currentIndex ? "#1B4F72" : learned.has(i) ? "#B7CBD6" : "#E4DED0" }} />
              ))}
            </div>
            <div style={{ width: 20 }} />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <CatFace height={150} celebrate={celebrating} />
            <SpeechBubble>
              Das ist {LESSON[currentIndex].name}. Es {LESSON[currentIndex].short}.
            </SpeechBubble>

            <div className="flex flex-col items-center gap-2">
              <button onClick={() => speak(LESSON[currentIndex].upper + LESSON[currentIndex].lower)} className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(180deg,#2B6CA3 0%,#1B4F72 100%)", border: "3px solid #173F5C" }}>
                  <div className="w-[78%] aspect-square rounded-full bg-[#FBF6EC] flex items-center justify-center">
                    <span className="text-4xl" style={{ fontFamily: "Georgia, serif", color: "#1B4F72" }}>
                      {LESSON[currentIndex].upper}{LESSON[currentIndex].lower}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm" style={{ color: "#5C7180" }}>
                  <Volume2 size={14} /> antippen zum Hören
                </span>
              </button>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#EFEAE0", color: "#5C7180" }}>
                spricht sich ungefähr: {LESSON[currentIndex].phonetic}
              </span>
            </div>

            <div className="rounded-2xl px-5 py-3 flex items-center gap-3" style={{ background: "#FFFFFF", border: "2px solid #E4DED0" }}>
              <span className="text-3xl">{LESSON[currentIndex].emoji}</span>
              <div className="text-left">
                <p style={{ fontFamily: "Georgia, serif", color: "#1B4F72" }} className="text-lg">{LESSON[currentIndex].word}</p>
                <p className="text-sm" style={{ color: "#8A9AA5" }}>{LESSON[currentIndex].meaning}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            {currentIndex > 0 && (
              <button onClick={prevLetter} className="py-3.5 px-5 rounded-full" style={{ background: "#FFFFFF", border: "2px solid #E4DED0", color: "#5C7180" }}>
                <ArrowLeft size={18} />
              </button>
            )}
            <button onClick={nextLetter} className="flex-1 py-3.5 rounded-full text-base font-medium flex items-center justify-center gap-2" style={{ background: "#1B4F72", color: "#FBF6EC" }}>
              {currentIndex < LESSON.length - 1 ? "Weiter" : "Fertig"} <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}

      {screen === "quiz" && quizAnswer !== null && (
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center gap-5">
          <button onClick={() => setScreen("home")} className="self-start flex items-center gap-1.5 text-sm" style={{ color: "#8A9AA5" }}>
            <ArrowLeft size={15} /> Zurück
          </button>

          <CatFace height={130} celebrate={quizFeedback === "right"} />
          <p className="text-sm" style={{ color: "#8A9AA5" }}>Punkte: {quizScore}</p>
          <SpeechBubble>Welcher Buchstabe war das?</SpeechBubble>

          <button onClick={() => speak(LESSON[quizAnswer].upper + LESSON[quizAnswer].lower)} className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#1B4F72" }}>
            <Volume2 size={28} color="#FBF6EC" />
          </button>
          <span className="text-xs px-3 py-1 rounded-full -mt-3" style={{ background: "#EFEAE0", color: "#5C7180" }}>
            Tipp: spricht sich {LESSON[quizAnswer].phonetic}
          </span>

          <div className="grid grid-cols-2 gap-3 w-full">
            {quizChoices.map((choiceIdx) => {
              const isCorrectTile = quizFeedback && choiceIdx === quizAnswer;
              return (
                <button
                  key={choiceIdx}
                  onClick={() => answerQuiz(choiceIdx)}
                  disabled={!!quizFeedback}
                  className="py-6 rounded-2xl text-3xl"
                  style={{ fontFamily: "Georgia, serif", background: isCorrectTile ? "#DDEFE0" : "#FFFFFF", border: `2px solid ${isCorrectTile ? "#4C9A6A" : "#E4DED0"}`, color: "#1B4F72" }}
                >
                  {LESSON[choiceIdx].upper}{LESSON[choiceIdx].lower}
                </button>
              );
            })}
          </div>

          {quizFeedback && (
            <p className="text-sm" style={{ color: quizFeedback === "right" ? "#4C9A6A" : "#C2604A" }}>
              {quizFeedback === "right" ? "Toll gemacht!" : "Fast! Weiter geht's."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const introStyles = `
  @keyframes bob { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(-1.5deg); } }
  @keyframes pop { 0% { transform: scale(1); } 40% { transform: scale(1.1); } 100% { transform: scale(1); } }
  @keyframes sparkle { 0% { opacity: 0; transform: translateY(4px) scale(0.6); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-14px) scale(1); } }
  .cat-idle { animation: bob 3.6s ease-in-out infinite; }
  .cat-celebrate { animation: pop 0.5s ease-in-out; }
  .sparkle { position: absolute; font-size: 16px; animation: sparkle 1s ease-out; }
`;
