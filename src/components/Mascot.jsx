import React from "react";
import { DEFAULT_MASCOT } from "../data/mascots.js";

const OUT = "#2C3E4A";

// Kopfformen: unterschiedliche Silhouetten statt nur Farben.
const HEADS = {
  round: { cx: 86, cy: 96, rx: 52, ry: 52, eyeY: 96, eyeDx: 16, noseY: 112, mouthY: 118 },
  wide:  { cx: 86, cy: 98, rx: 57, ry: 47, eyeY: 96, eyeDx: 18, noseY: 112, mouthY: 118 },
  oval:  { cx: 86, cy: 96, rx: 47, ry: 54, eyeY: 94, eyeDx: 15, noseY: 112, mouthY: 118 },
  fox:   { cx: 86, cy: 92, rx: 53, ry: 44, eyeY: 88, eyeDx: 18, noseY: 122, mouthY: 130 },
};

function Ears({ variant, fur, accent, dark }) {
  if (variant === "round") {
    return (
      <g>
        <circle cx="56" cy="50" r="15" fill={fur} stroke={OUT} strokeWidth="4" />
        <circle cx="116" cy="50" r="15" fill={fur} stroke={OUT} strokeWidth="4" />
        <circle cx="56" cy="52" r="7.5" fill={accent} />
        <circle cx="116" cy="52" r="7.5" fill={accent} />
      </g>
    );
  }
  if (variant === "tufted") {
    return (
      <g>
        <path d="M54,70 L44,14 L82,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M118,70 L128,14 L90,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M57,61 L48,26 L72,54 Z" fill={accent} />
        <path d="M115,61 L124,26 L100,54 Z" fill={accent} />
        {/* Ohrbüschel – kurze Fellspitzen seitlich am Ohr */}
        <g stroke={dark} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M50,32 L40,26" /><path d="M54,45 L43,41" />
          <path d="M122,32 L132,26" /><path d="M118,45 L129,41" />
        </g>
      </g>
    );
  }
  if (variant === "fox") {
    return (
      <g>
        <path d="M48,74 L32,12 L84,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M124,74 L140,12 L88,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        {/* dunkle Ohrspitzen – typisch Fuchs */}
        <path d="M32,12 L41,46 L57,34 Z" fill={dark} />
        <path d="M140,12 L131,46 L115,34 Z" fill={dark} />
        <path d="M52,66 L45,40 L70,56 Z" fill={accent} />
        <path d="M120,66 L127,40 L102,56 Z" fill={accent} />
      </g>
    );
  }
  if (variant === "big") {
    return (
      <g>
        <path d="M46,76 C14,58 10,22 26,14 C44,6 70,34 82,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M126,76 C158,58 162,22 146,14 C128,6 102,34 90,58 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M50,68 C28,54 26,30 36,25 C48,21 64,40 73,57 Z" fill={accent} />
        <path d="M122,68 C144,54 146,30 136,25 C124,21 108,40 99,57 Z" fill={accent} />
      </g>
    );
  }
  // pointy – klassische Katzenohren
  return (
    <g>
      <path d="M50,70 L36,24 L78,60 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M122,70 L136,24 L94,60 Z" fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
      <path d="M53,61 L43,34 L70,56 Z" fill={accent} />
      <path d="M119,61 L129,34 L102,56 Z" fill={accent} />
    </g>
  );
}

function Tail({ variant, fur, belly, dark }) {
  if (variant === "bushy") {
    // Dicker Fuchsschwanz mit heller Spitze
    return (
      <g>
        <path
          d="M124,178 C154,188 186,172 188,138 C190,106 164,88 146,98 C130,107 138,126 147,137 C158,150 164,162 148,171 C140,176 132,178 124,178 Z"
          fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round"
        />
        <path d="M146,98 C164,88 188,104 188,132 C180,110 168,98 150,101 Z" fill={belly} stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      </g>
    );
  }
  if (variant === "fluffy") {
    return (
      <path
        d="M126,176 C150,182 176,168 176,140 C176,116 158,104 146,112 C136,119 142,132 148,140 C156,151 158,160 146,166 C139,170 132,174 126,176 Z"
        fill={fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round"
      />
    );
  }
  // curl – dünner, geschwungener Katzenschwanz
  return (
    <g>
      <path
        d="M148,178 C186,176 194,128 166,104 C155,95 141,104 145,116 C150,130 165,136 160,156 C157,170 143,178 126,176"
        fill={fur} stroke={OUT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M160,110 C168,116 171,126 168,134" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Accessory({ variant, color, fur }) {
  if (variant === "bow") {
    return (
      <g>
        <path d="M68,150 L86,162 L104,150 L104,162 L86,174 L68,162 Z" fill={color} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="86" cy="162" r="5" fill={fur} stroke={OUT} strokeWidth="2" />
      </g>
    );
  }
  if (variant === "scarf") {
    return (
      <g>
        <path d="M58,142 C70,152 102,152 114,142 C116,150 114,156 112,158 C98,166 74,166 60,158 C58,156 56,150 58,142 Z" fill={color} stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <path d="M104,157 L112,176 L98,172 Z" fill={color} stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
      </g>
    );
  }
  return null;
}

export default function Mascot({ height = 160, mood = "idle", mascot = DEFAULT_MASCOT }) {
  const width = Math.round(height * 0.86);
  const m = mascot;
  const H = HEADS[m.head] || HEADS.round;
  const isFox = m.species === "fox";
  const happy = mood === "happy";
  const sad = mood === "sad";

  const animClass = happy ? "mascot-pop" : sad ? "mascot-shake" : "mascot-bob";

  return (
    <div className={animClass} style={{ position: "relative", width, height }}>
      {happy && (
        <>
          <span className="sparkle" style={{ left: 0, top: 10 }}>✨</span>
          <span className="sparkle" style={{ right: -2, top: 20 }}>✨</span>
          <span className="sparkle" style={{ left: "42%", top: -6 }}>✨</span>
        </>
      )}
      <svg width={width} height={height} viewBox="0 0 172 212" aria-hidden="true">
        <Tail variant={m.tail} fur={m.fur} belly={m.belly} dark={m.dark} />

        {/* Körper */}
        <path
          d="M52,196 C46,142 60,110 86,110 C112,110 126,142 120,196 C120,204 96,208 86,208 C76,208 52,204 52,196 Z"
          fill={m.fur} stroke={OUT} strokeWidth="4" strokeLinejoin="round"
        />
        {m.marking === "tuxedo" ? (
          <path d="M86,112 C100,112 108,140 106,196 C106,202 94,205 86,205 C78,205 66,202 66,196 C64,140 72,112 86,112 Z" fill={m.belly} stroke={OUT} strokeWidth="2.5" />
        ) : (
          <ellipse cx="86" cy="168" rx="24" ry="30" fill={m.belly} opacity="0.5" />
        )}

        {/* Pfoten */}
        <ellipse cx="68" cy="200" rx="14" ry="9" fill={m.fur} stroke={OUT} strokeWidth="3.5" />
        <ellipse cx="104" cy="200" rx="14" ry="9" fill={m.fur} stroke={OUT} strokeWidth="3.5" />
        <path d="M62,198 L62,203 M68,199 L68,204 M74,198 L74,203" stroke={OUT} strokeWidth="2" strokeLinecap="round" />
        <path d="M98,198 L98,203 M104,199 L104,204 M110,198 L110,203" stroke={OUT} strokeWidth="2" strokeLinecap="round" />

        {/* Schal liegt hinter dem Kopf, die Schleife kommt weiter unten davor */}
        {m.accessory === "scarf" && <Accessory variant="scarf" color={m.bow} fur={m.fur} />}
        <Ears variant={m.ears} fur={m.fur} accent={m.accent} dark={m.dark} />

        {/* Kopf */}
        <ellipse cx={H.cx} cy={H.cy} rx={H.rx} ry={H.ry} fill={m.fur} stroke={OUT} strokeWidth="4" />

        {/* Fuchs: Wangenbüschel + spitze Schnauze */}
        {m.marking === "foxmask" && (
          <>
            <path d="M44,90 L26,100 L41,104 L28,113 L48,117 Z" fill={m.belly} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M128,90 L146,100 L131,104 L144,113 L124,117 Z" fill={m.belly} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
          </>
        )}
        {isFox && (
          <path d="M86,105 C71,105 64,117 70,128 Q86,141 102,128 C108,117 101,105 86,105 Z"
            fill={m.belly} stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
        )}

        {m.accessory === "bow" && <Accessory variant="bow" color={m.bow} fur={m.fur} />}

        {/* Fellzeichnung */}
        {m.marking === "tabby" && (
          <g stroke={m.dark} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M86,50 L86,64" /><path d="M72,54 L75,67" /><path d="M100,54 L97,67" />
          </g>
        )}
        {m.marking === "patch" && (
          <ellipse cx={H.cx - H.eyeDx} cy={H.eyeY} rx="18" ry="16" fill={m.dark} opacity="0.5" />
        )}

        {/* Wangen */}
        {!isFox && (
          <>
            <circle cx={H.cx - 34} cy={H.noseY} r="9" fill={m.accent} opacity="0.35" />
            <circle cx={H.cx + 34} cy={H.noseY} r="9" fill={m.accent} opacity="0.35" />
          </>
        )}

        {/* Augen */}
        {happy ? (
          <g fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d={`M${H.cx - H.eyeDx - 8},${H.eyeY - 2} L${H.cx - H.eyeDx},${H.eyeY + 5} L${H.cx - H.eyeDx + 8},${H.eyeY - 2}`} />
            <path d={`M${H.cx + H.eyeDx - 8},${H.eyeY - 2} L${H.cx + H.eyeDx},${H.eyeY + 5} L${H.cx + H.eyeDx + 8},${H.eyeY - 2}`} />
          </g>
        ) : sad ? (
          <g>
            <ellipse cx={H.cx - H.eyeDx} cy={H.eyeY + 1} rx="6.5" ry="7" fill={OUT} />
            <ellipse cx={H.cx + H.eyeDx} cy={H.eyeY + 1} rx="6.5" ry="7" fill={OUT} />
            <circle cx={H.cx - H.eyeDx + 2.5} cy={H.eyeY - 2} r="2" fill="#FFFFFF" />
            <circle cx={H.cx + H.eyeDx + 2.5} cy={H.eyeY - 2} r="2" fill="#FFFFFF" />
            {/* besorgte Brauen: außen tief, innen hoch – sonst wirkt es wütend */}
            <g fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round">
              <path d={`M${H.cx - H.eyeDx - 9},${H.eyeY - 10} L${H.cx - H.eyeDx + 5},${H.eyeY - 15}`} />
              <path d={`M${H.cx + H.eyeDx + 9},${H.eyeY - 10} L${H.cx + H.eyeDx - 5},${H.eyeY - 15}`} />
            </g>
          </g>
        ) : (
          <g>
            <ellipse cx={H.cx - H.eyeDx} cy={H.eyeY} rx="6.5" ry="8" fill={OUT} />
            <ellipse cx={H.cx + H.eyeDx} cy={H.eyeY} rx="6.5" ry="8" fill={OUT} />
            <circle cx={H.cx - H.eyeDx + 2.5} cy={H.eyeY - 3} r="2" fill="#FFFFFF" />
            <circle cx={H.cx + H.eyeDx + 2.5} cy={H.eyeY - 3} r="2" fill="#FFFFFF" />
          </g>
        )}

        {/* Nase + Mund */}
        <path d={`M${H.cx - 5},${H.noseY} L${H.cx + 5},${H.noseY} L${H.cx},${H.noseY + 6} Z`} fill={isFox ? m.dark : m.accent} />
        {happy ? (
          <path d={`M${H.cx},${H.mouthY} Q${H.cx - 10},${H.mouthY + 14} ${H.cx - 24},${H.mouthY + 8} M${H.cx},${H.mouthY} Q${H.cx + 10},${H.mouthY + 14} ${H.cx + 24},${H.mouthY + 8}`} fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        ) : sad ? (
          // Mundwinkel nach unten – sonst sieht "traurig" aus wie zufrieden.
          <path d={`M${H.cx - 13},${H.mouthY + 6} Q${H.cx},${H.mouthY - 3} ${H.cx + 13},${H.mouthY + 6}`} fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        ) : (
          <g fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round">
            <path d={`M${H.cx},${H.mouthY} Q${H.cx - 8},${H.mouthY + 6} ${H.cx - 16},${H.mouthY + 3}`} />
            <path d={`M${H.cx},${H.mouthY} Q${H.cx + 8},${H.mouthY + 6} ${H.cx + 16},${H.mouthY + 3}`} />
          </g>
        )}

        {/* Schnurrhaare */}
        {!isFox && (
        <g stroke={OUT} strokeWidth="1.6" strokeLinecap="round">
          <path d={`M${H.cx - 30},${H.noseY - 6} L${H.cx - 58},${H.noseY - 12}`} />
          <path d={`M${H.cx - 30},${H.noseY} L${H.cx - 59},${H.noseY}`} />
          <path d={`M${H.cx + 30},${H.noseY - 6} L${H.cx + 58},${H.noseY - 12}`} />
          <path d={`M${H.cx + 30},${H.noseY} L${H.cx + 59},${H.noseY}`} />
        </g>
        )}
      </svg>
    </div>
  );
}
