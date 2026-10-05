import React from "react";
import { Volume2, Turtle } from "lucide-react";
import { speak } from "../lib/speech.js";

export const C = {
  bg: "#FBF6EC",
  card: "#FFFFFF",
  line: "#E4DED0",
  blue: "#1B4F72",
  blue2: "#2B6CA3",
  ink: "#2C3E4A",
  mute: "#8A9AA5",
  soft: "#5C7180",
  orange: "#E8974E",
  orangeInk: "#B5722B",
  green: "#4C9A6A",
  greenBg: "#DDEFE0",
  red: "#C2604A",
  redBg: "#F8E3DD",
  sand: "#EFEAE0",
};

export function SpeechBubble({ children, tone = "normal" }) {
  const bg = tone === "good" ? C.greenBg : tone === "bad" ? C.redBg : C.card;
  const border = tone === "good" ? C.green : tone === "bad" ? C.red : C.line;
  return (
    <div className="rounded-3xl px-5 py-3.5 text-base leading-snug text-center"
      style={{ background: bg, color: C.ink, border: `2px solid ${border}` }}>
      {children}
    </div>
  );
}

export function Bar({ pct, color = C.blue, height = 10, bg = "#E8E2D6" }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: bg }}>
      <div style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height: "100%", background: color, transition: "width .45s ease" }} />
    </div>
  );
}

export function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-4 rounded-full text-lg font-medium flex items-center justify-center gap-2 active:scale-[.98] transition"
      style={{ background: disabled ? "#C3CDD4" : C.blue, color: C.bg }}>
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, tone = "neutral", small = false }) {
  const map = {
    neutral: { c: C.soft, b: C.line },
    orange: { c: C.orangeInk, b: C.orange },
    blue: { c: C.blue, b: C.blue2 },
    red: { c: C.red, b: "#E6B5A8" },
  };
  const t = map[tone] || map.neutral;
  return (
    <button onClick={onClick}
      className={`w-full ${small ? "py-2.5 text-sm" : "py-3.5 text-base"} rounded-full font-medium flex items-center justify-center gap-2 active:scale-[.98] transition`}
      style={{ background: C.card, color: t.c, border: `2px solid ${t.b}` }}>
      {children}
    </button>
  );
}

export function Chip({ children, bg = C.sand, color = C.soft }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full whitespace-nowrap" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

// Hörbutton: normal + langsam. Muss synchron im Klick laufen (iOS).
export function SayButton({ text, label = "anhören", size = "md" }) {
  if (!text) return null;
  const big = size === "lg";
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => speak(text)}
        className="flex items-center gap-1.5 rounded-full active:scale-95 transition"
        style={{ background: C.blue, color: C.bg, padding: big ? "12px 20px" : "8px 14px", fontSize: big ? 16 : 14 }}>
        <Volume2 size={big ? 20 : 16} /> {label}
      </button>
      <button onClick={() => speak(text, { slow: true })} title="langsam"
        className="flex items-center gap-1 rounded-full active:scale-95 transition"
        style={{ background: C.card, color: C.soft, border: `2px solid ${C.line}`, padding: big ? "11px 16px" : "7px 12px", fontSize: big ? 15 : 13 }}>
        <Turtle size={big ? 18 : 15} /> langsam
      </button>
    </div>
  );
}

// Griechisches Wort mit deutscher Lautschrift darunter.
export function GreekWord({ greek, translit, size = "xl", center = true }) {
  const sizes = { lg: 26, xl: 34, xxl: 44 };
  return (
    <div className={center ? "text-center" : ""}>
      <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: C.blue, fontSize: sizes[size] || 34, lineHeight: 1.15 }}>
        {greek}
      </div>
      {translit && (
        <div className="mt-1 tracking-wide" style={{ color: C.orangeInk, fontSize: 15, fontWeight: 500 }}>
          [{translit}]
        </div>
      )}
    </div>
  );
}

export function Confetti({ run = 0 }) {
  // Nach der Animation wieder abbauen – ein Overlay, das liegen bleibt,
  // fängt sonst für immer alle Klicks ab.
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!run) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1900);
    return () => clearTimeout(t);
  }, [run]);

  if (!run || !visible) return null;
  const bits = ["🎉", "⭐", "✨", "🏅", "💫", "🎊"];
  return (
    // pointerEvents zusätzlich inline: nicht auf eine CSS-Klasse verlassen.
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 50, pointerEvents: "none" }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={`${run}-${i}`} className="confetti-bit"
          style={{ left: `${(i * 5.5 + 4) % 96}%`, animationDelay: `${(i % 6) * 0.08}s`, fontSize: 18 + (i % 3) * 6, pointerEvents: "none" }}>
          {bits[i % bits.length]}
        </span>
      ))}
    </div>
  );
}
