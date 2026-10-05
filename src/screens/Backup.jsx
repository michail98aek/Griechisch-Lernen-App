import React, { useState } from "react";
import { ArrowLeft, Save, Copy, Download, Upload, Trash2, Check, AlertTriangle } from "lucide-react";
import { C, PrimaryButton, GhostButton, Bar } from "../components/ui.jsx";
import { exportCode, importCode } from "../lib/storage.js";
import { overallProgress } from "../lib/game.js";

export default function Backup({ progress, onSaveNow, onImport, onReset, onDone }) {
  const [status, setStatus] = useState(null);
  const [code, setCode] = useState("");
  const [paste, setPaste] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const all = overallProgress(progress);

  const flash = (type, text) => { setStatus({ type, text }); setTimeout(() => setStatus(null), 3000); };

  const doSave = () => {
    const ok = onSaveNow();
    flash(ok ? "ok" : "err", ok ? "Fortschritt gespeichert." : "Speichern nicht möglich (privater Modus?).");
  };

  const doExport = () => {
    const c = exportCode(progress);
    setCode(c);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(c).then(
        () => flash("ok", "Code erstellt und kopiert."),
        () => flash("ok", "Code erstellt – bitte von Hand kopieren.")
      );
    } else flash("ok", "Code erstellt – bitte von Hand kopieren.");
  };

  const doImport = () => {
    const p = importCode(paste);
    if (!p) return flash("err", "Dieser Code passt nicht. Nochmal kopieren?");
    onImport(p);
    setPaste("");
    flash("ok", "Fortschritt übernommen!");
  };

  const savedAt = progress.savedAt ? new Date(progress.savedAt) : null;

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col px-5 py-6 gap-4">
      <div className="flex items-center justify-between">
        <button onClick={onDone} className="flex items-center gap-1.5 text-sm" style={{ color: C.mute }}>
          <ArrowLeft size={16} /> Zurück
        </button>
      </div>

      <h1 className="text-xl font-medium" style={{ color: C.blue }}>Fortschritt sichern</h1>

      <div className="rounded-3xl px-4 py-3.5" style={{ background: C.card, border: `2px solid ${C.line}` }}>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm" style={{ color: C.soft }}>Gelernt</span>
          <span className="text-xl font-semibold" style={{ color: C.blue }}>{all.pct} %</span>
        </div>
        <Bar pct={all.pct} />
        <p className="text-xs mt-2" style={{ color: C.mute }}>
          {all.done} Karten · {progress.xp || 0} XP · {(progress.badges || []).length} Abzeichen
          {savedAt && <> · zuletzt gespeichert {savedAt.toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })}</>}
        </p>
      </div>

      {status && (
        <div className="rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm"
          style={{
            background: status.type === "ok" ? C.greenBg : C.redBg,
            border: `1px solid ${status.type === "ok" ? C.green : C.red}`,
            color: status.type === "ok" ? "#2F6B46" : "#8E3A26",
          }}>
          {status.type === "ok" ? <Check size={16} /> : <AlertTriangle size={16} />} {status.text}
        </div>
      )}

      <PrimaryButton onClick={doSave}><Save size={18} /> Jetzt speichern</PrimaryButton>
      <p className="text-xs -mt-2 px-1" style={{ color: C.mute }}>
        Der Fortschritt wird sowieso nach jeder Antwort automatisch gespeichert. Dieser Knopf ist für dein gutes Gefühl. 🙂
      </p>

      <div className="rounded-3xl px-4 py-4 flex flex-col gap-3" style={{ background: C.card, border: `2px solid ${C.line}` }}>
        <div>
          <p className="font-medium text-base" style={{ color: C.ink }}>Auf ein anderes Gerät mitnehmen</p>
          <p className="text-xs mt-1" style={{ color: C.mute }}>
            Erstelle einen Sicherungscode, schick ihn dir selbst (z. B. per Nachricht) und füge ihn auf dem anderen Gerät unten ein.
          </p>
        </div>
        <GhostButton tone="blue" small onClick={doExport}><Download size={15} /> Sicherungscode erstellen</GhostButton>
        {code && (
          <>
            <textarea readOnly value={code} rows={3} onFocus={(e) => e.target.select()}
              className="w-full rounded-xl px-3 py-2 text-[11px] font-mono resize-none outline-none"
              style={{ background: C.sand, color: C.soft, border: `1px solid ${C.line}` }} />
            <GhostButton small onClick={() => {
              navigator.clipboard?.writeText(code).then(() => flash("ok", "Kopiert!"), () => flash("err", "Bitte von Hand markieren."));
            }}><Copy size={15} /> Code kopieren</GhostButton>
          </>
        )}
        <div className="h-px my-1" style={{ background: C.line }} />
        <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={3}
          placeholder="Sicherungscode hier einfügen …"
          className="w-full rounded-xl px-3 py-2 text-[11px] font-mono resize-none outline-none"
          style={{ background: C.bg, color: C.ink, border: `1px solid ${C.line}` }} />
        <GhostButton tone="orange" small onClick={doImport}><Upload size={15} /> Fortschritt einfügen</GhostButton>
      </div>

      <div className="mt-auto pb-2">
        {confirmReset ? (
          <div className="rounded-2xl px-4 py-3 flex flex-col gap-2" style={{ background: C.redBg, border: `1px solid ${C.red}` }}>
            <p className="text-sm" style={{ color: "#8E3A26" }}>Wirklich alles löschen? Das kann man nicht rückgängig machen.</p>
            <div className="flex gap-2">
              <GhostButton small onClick={() => setConfirmReset(false)}>Abbrechen</GhostButton>
              <GhostButton small tone="red" onClick={() => { onReset(); setConfirmReset(false); flash("ok", "Alles zurückgesetzt."); }}>
                <Trash2 size={15} /> Ja, löschen
              </GhostButton>
            </div>
          </div>
        ) : (
          <GhostButton small tone="red" onClick={() => setConfirmReset(true)}><Trash2 size={15} /> Fortschritt zurücksetzen</GhostButton>
        )}
      </div>
    </div>
  );
}
