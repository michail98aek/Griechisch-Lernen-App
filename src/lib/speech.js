// Sprachausgabe. Zwei Dinge sind hier wichtig für gute Aussprache:
//  1) Wir sprechen bei Buchstaben den NAMEN ("άλφα") statt der nackten
//     Zeichen ("Αα") – Zeichenketten aus Einzelbuchstaben liest kaum eine
//     Stimme sinnvoll vor.
//  2) Wir warten, bis echte Stimmen geladen sind, und nehmen bevorzugt eine
//     griechische (am liebsten eine lokal installierte).

let voices = [];
const listeners = new Set();
let state = { supported: true, greekVoice: false, ready: false, voiceName: null };

const notify = () => listeners.forEach((l) => l(state));

export function subscribeSpeech(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function pickGreekVoice() {
  const el = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("el"));
  if (!el.length) return null;
  return el.find((v) => v.localService) || el[0];
}

export function initSpeech() {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    state = { supported: false, greekVoice: false, ready: true, voiceName: null };
    notify();
    return () => {};
  }
  const synth = window.speechSynthesis;
  const load = () => {
    const v = synth.getVoices();
    if (v && v.length) {
      voices = v;
      const g = pickGreekVoice();
      state = { supported: true, greekVoice: !!g, ready: true, voiceName: g ? g.name : null };
      notify();
    }
  };
  load();
  // Stimmen kommen asynchron – Event UND Polling, weil manche Browser
  // das Event nie feuern.
  synth.addEventListener?.("voiceschanged", load);
  if (!synth.onvoiceschanged) synth.onvoiceschanged = load;
  const timers = [150, 400, 900, 1800, 3200].map((ms) => setTimeout(load, ms));
  return () => {
    synth.removeEventListener?.("voiceschanged", load);
    timers.forEach(clearTimeout);
  };
}

// Muss synchron im Klick-Handler laufen, sonst blockt iOS die Ausgabe.
export function speak(text, { slow = false } = {}) {
  if (!text) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    // Chrome hängt gelegentlich im "paused"-Zustand.
    if (synth.paused) synth.resume();
    synth.cancel();

    if (!voices.length) {
      const v = synth.getVoices();
      if (v && v.length) {
        voices = v;
        const g = pickGreekVoice();
        state = { supported: true, greekVoice: !!g, ready: true, voiceName: g ? g.name : null };
        notify();
      }
    }

    const utter = new SpeechSynthesisUtterance(text);
    const g = pickGreekVoice();
    if (g) {
      utter.voice = g;
      utter.lang = g.lang;
    } else {
      utter.lang = "el-GR";
    }
    utter.rate = slow ? 0.5 : 0.85;
    utter.pitch = 1;
    utter.onerror = (e) => {
      // cancel() erzeugt beim vorherigen Utterance "interrupted" – kein Fehler.
      if (e && (e.error === "interrupted" || e.error === "canceled")) return;
      state = { ...state, supported: false };
      notify();
    };
    synth.speak(utter);
  } catch (e) {
    /* Ausgabe nicht möglich – App läuft weiter */
  }
}
