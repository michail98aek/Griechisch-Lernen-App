# Griechisch lernen

Eine Lern-App fürs Griechische – vom Alphabet bis zu Sätzen, mit denen man
in Griechenland zurechtkommt. Mit Katzen- und Fuchs-Maskottchen.

## Was drin ist

**14 Lektionen, 134 Karten**
1.–4. Das komplette Alphabet (alle 24 Buchstaben)
5. Buchstaben-Paare (αι, ου, μπ, ντ, τσ …) – der Schlüssel zum Lesen
6.–14. Begrüßen · Vorstellen · Zahlen · Café · Einkaufen · Unterwegs ·
   Zeit & Tage · Hilfe & Notfall · Plaudern

Lektionen schalten sich nacheinander frei.

**Aussprache**
- Jede griechische Zeile hat eine deutsche Lautschrift darunter, z. B.
  `καλημέρα [ka-li-ME-ra]`. Die GROSS geschriebene Silbe wird betont.
- Buchstaben, Beispielwörter und Vokabeln lassen sich einzeln anhören –
  normal oder langsam.
- Vorgelesen wird der Buchstaben*name* („άλφα“), nicht die nackten Zeichen;
  das sprechen die Stimmen deutlich sauberer aus.

Lautschrift-Zeichen: `w`=β · `dh`=δ · `th`=θ · `gh`=γ (weich) · `j`=γ vor e/i ·
`ch`=χ · `z`=stimmhaftes S.

> **Ton stumm?** Die App nutzt die Sprachausgabe des Geräts. Dafür muss eine
> **griechische Stimme** installiert sein – iOS: Einstellungen → Bedienungs­hilfen →
> Gesprochene Inhalte → Stimmen; Android: Einstellungen → Sprache → Text-in-Sprache;
> Windows: Einstellungen → Zeit und Sprache → Sprache. Die App weist darauf hin,
> wenn keine gefunden wird.

**Üben – fünf Aufgabentypen**
- Bedeutung wählen · griechisches Wort wählen · nur hören und erkennen
- **Wort zusammensetzen** aus einzelnen Buchstaben
- **Bedeutung eintippen** (erkennt auch „Bus“ für „der Bus“)
- Bei jeder Aufgabe gibt es einen **Tipp-Knopf** (blendet bei Auswahlfragen
  zwei falsche Antworten aus)

**Motivation**
Prozent-Fortschritt · XP und 10 Level mit Titeln · Tagesserie 🔥 ·
11 Abzeichen · Konfetti bei Erfolgen · das Maskottchen freut sich mit.

**Maskottchen**
10 Tiere mit unterschiedlichen Formen – Ohren, Schwanz, Kopf, Schnauze und
Fellzeichnung: 6 Katzen (u. a. getigert, Rundohr, Ohrbüschel, Augenfleck)
und 4 Füchse (Rotfuchs, Polarfuchs, Feuerfuchs, Wüstenfuchs).

**Speichern**
Der Fortschritt wird nach jeder Antwort automatisch im Browser gesichert
(localStorage). Zusätzlich gibt es unter „Sichern“ einen **Sicherungscode**
zum Kopieren – damit lässt sich der Stand auf ein anderes Gerät übertragen.

## Lokal starten
```
npm install
npm run dev
```

## Bauen
```
npm run build      # Ergebnis liegt in dist/
```
Tailwind wird mitgebaut – die App braucht kein CDN und funktioniert offline.

## Veröffentlichen
Das Repo bei [vercel.com/new](https://vercel.com/new) importieren. Vercel
erkennt Vite automatisch (`vercel.json` liegt bei) und liefert eine
`https://…`-Adresse, die man einfach weitergeben kann.
