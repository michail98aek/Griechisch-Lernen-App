// Griechisch-Inhalte für Anfänger bis "ich komme in Griechenland zurecht".
//
// Lautschrift-Konvention (deutsche Leseweise), Betonung in GROSSBUCHSTABEN:
//   w  = β            wie deutsches W          (βιβλίο -> wi-WLI-o)
//   dh = δ            weiches englisches "th"  (δέκα   -> DHE-ka)
//   th = θ            hartes englisches "th"   (θάλασσα-> THA-la-sa)
//   gh = γ vor a/o/u  weiches, gehauchtes G    (γάτα   -> GHA-ta)
//   j  = γ vor e/i    wie deutsches J          (γεια   -> ja)
//   ch = χ            wie in "Bach"/"ich"
//   s  = scharfes S,  z = stimmhaftes S wie in "Rose"

export const TRANSLIT_LEGEND = [
  { sign: "GROSS", meaning: "betonte Silbe" },
  { sign: "w", meaning: "β – wie deutsches W" },
  { sign: "dh", meaning: "δ – weiches „th“ (englisch this)" },
  { sign: "th", meaning: "θ – hartes „th“ (englisch think)" },
  { sign: "gh", meaning: "γ – weiches, gehauchtes G" },
  { sign: "j", meaning: "γ vor e/i – wie deutsches J" },
  { sign: "ch", meaning: "χ – wie in „Bach“ / „ich“" },
  { sign: "z", meaning: "ζ – stimmhaftes S wie in „Rose“" },
];

export const LESSONS = [
  // ───────────────────────── Alphabet ─────────────────────────
  {
    id: "alpha1",
    title: "Alphabet 1",
    subtitle: "Α Β Γ Δ Ε Ζ",
    kind: "letters",
    emoji: "🔤",
    items: [
      {
        id: "alpha",
        upper: "Α", lower: "α", name: "άλφα", nameDe: "AL-fa",
        sound: "wie das A in „Apfel“", soundDe: "a",
        ex: { el: "άλογο", de: "A-lo-gho", meaning: "Pferd", emoji: "🐴" },
      },
      {
        id: "beta",
        upper: "Β", lower: "β", name: "βήτα", nameDe: "WI-ta",
        sound: "wie das W in „Wasser“ – nie wie ein B!", soundDe: "w",
        ex: { el: "βιβλίο", de: "wi-WLI-o", meaning: "Buch", emoji: "📖" },
      },
      {
        id: "gamma",
        upper: "Γ", lower: "γ", name: "γάμμα", nameDe: "GHA-ma",
        sound: "vor a/o/u wie ein weiches, gehauchtes G – vor e/i wie ein J",
        soundDe: "gh / j",
        note: "γάτα = GHA-ta (weiches G), aber γεια = ja (wie J)",
        ex: { el: "γάτα", de: "GHA-ta", meaning: "Katze", emoji: "🐱" },
        ex2: { el: "γέλιο", de: "JE-lio", meaning: "Lachen", emoji: "😄" },
      },
      {
        id: "delta",
        upper: "Δ", lower: "δ", name: "δέλτα", nameDe: "DHEL-ta",
        sound: "weiches „th“ wie im englischen „this“", soundDe: "dh",
        ex: { el: "δέντρο", de: "DHEN-dro", meaning: "Baum", emoji: "🌳" },
      },
      {
        id: "epsilon",
        upper: "Ε", lower: "ε", name: "έψιλον", nameDe: "E-psi-lon",
        sound: "kurzes E wie in „Bett“", soundDe: "e",
        ex: { el: "ελέφαντας", de: "e-LE-fan-das", meaning: "Elefant", emoji: "🐘" },
      },
      {
        id: "zita",
        upper: "Ζ", lower: "ζ", name: "ζήτα", nameDe: "ZI-ta",
        sound: "stimmhaftes S wie in „Rose“ – summend, nicht scharf", soundDe: "z",
        ex: { el: "ζάχαρη", de: "ZA-cha-ri", meaning: "Zucker", emoji: "🍬" },
      },
    ],
  },
  {
    id: "alpha2",
    title: "Alphabet 2",
    subtitle: "Η Θ Ι Κ Λ Μ Ν",
    kind: "letters",
    emoji: "🔤",
    items: [
      {
        id: "ita",
        upper: "Η", lower: "η", name: "ήτα", nameDe: "I-ta",
        sound: "wie das I in „Igel“", soundDe: "i",
        ex: { el: "ήλιος", de: "I-lios", meaning: "Sonne", emoji: "☀️" },
      },
      {
        id: "thita",
        upper: "Θ", lower: "θ", name: "θήτα", nameDe: "THI-ta",
        sound: "hartes „th“ wie im englischen „think“", soundDe: "th",
        ex: { el: "θάλασσα", de: "THA-la-sa", meaning: "Meer", emoji: "🌊" },
      },
      {
        id: "iota",
        upper: "Ι", lower: "ι", name: "ιώτα", nameDe: "JO-ta",
        sound: "wie das I in „Igel“", soundDe: "i",
        ex: { el: "ιστορία", de: "i-sto-RI-a", meaning: "Geschichte", emoji: "📜" },
      },
      {
        id: "kappa",
        upper: "Κ", lower: "κ", name: "κάππα", nameDe: "KA-pa",
        sound: "wie K", soundDe: "k",
        ex: { el: "καφές", de: "ka-FES", meaning: "Kaffee", emoji: "☕" },
      },
      {
        id: "lamda",
        upper: "Λ", lower: "λ", name: "λάμδα", nameDe: "LAM-dha",
        sound: "wie L", soundDe: "l",
        ex: { el: "λεμόνι", de: "le-MO-ni", meaning: "Zitrone", emoji: "🍋" },
      },
      {
        id: "mi",
        upper: "Μ", lower: "μ", name: "μι", nameDe: "MI",
        sound: "wie M", soundDe: "m",
        ex: { el: "μήλο", de: "MI-lo", meaning: "Apfel", emoji: "🍎" },
      },
      {
        id: "ni",
        upper: "Ν", lower: "ν", name: "νι", nameDe: "NI",
        sound: "wie N", soundDe: "n",
        ex: { el: "νερό", de: "ne-RO", meaning: "Wasser", emoji: "💧" },
      },
    ],
  },
  {
    id: "alpha3",
    title: "Alphabet 3",
    subtitle: "Ξ Ο Π Ρ Σ",
    kind: "letters",
    emoji: "🔤",
    items: [
      {
        id: "ksi",
        upper: "Ξ", lower: "ξ", name: "ξι", nameDe: "KSI",
        sound: "wie X in „Taxi“", soundDe: "ks",
        ex: { el: "ξύλο", de: "KSI-lo", meaning: "Holz", emoji: "🪵" },
      },
      {
        id: "omikron",
        upper: "Ο", lower: "ο", name: "όμικρον", nameDe: "O-mi-kron",
        sound: "wie O in „Rose“", soundDe: "o",
        ex: { el: "όνομα", de: "O-no-ma", meaning: "Name", emoji: "🏷️" },
      },
      {
        id: "pi",
        upper: "Π", lower: "π", name: "πι", nameDe: "PI",
        sound: "wie P", soundDe: "p",
        ex: { el: "πόρτα", de: "POR-ta", meaning: "Tür", emoji: "🚪" },
      },
      {
        id: "ro",
        upper: "Ρ", lower: "ρ", name: "ρο", nameDe: "RO",
        sound: "gerolltes R mit der Zungenspitze – nicht im Hals", soundDe: "r",
        note: "Sieht aus wie ein P, ist aber ein R!",
        ex: { el: "ρολόι", de: "ro-LO-i", meaning: "Uhr", emoji: "⏰" },
      },
      {
        id: "sigma",
        upper: "Σ", lower: "σ / ς", name: "σίγμα", nameDe: "SI-ghma",
        sound: "scharfes S wie in „Bus“", soundDe: "s",
        note: "Am Wortende schreibt man ς statt σ: Νίκος",
        ex: { el: "σπίτι", de: "SPI-ti", meaning: "Haus", emoji: "🏠" },
      },
    ],
  },
  {
    id: "alpha4",
    title: "Alphabet 4",
    subtitle: "Τ Υ Φ Χ Ψ Ω",
    kind: "letters",
    emoji: "🔤",
    items: [
      {
        id: "taf",
        upper: "Τ", lower: "τ", name: "ταυ", nameDe: "TAF",
        sound: "wie T", soundDe: "t",
        ex: { el: "τυρί", de: "ti-RI", meaning: "Käse", emoji: "🧀" },
      },
      {
        id: "ipsilon",
        upper: "Υ", lower: "υ", name: "ύψιλον", nameDe: "I-psi-lon",
        sound: "wie I – nicht wie ü!", soundDe: "i",
        note: "Griechisch hat drei Buchstaben für „i“: η, ι, υ",
        ex: { el: "ύπνος", de: "IP-nos", meaning: "Schlaf", emoji: "😴" },
      },
      {
        id: "fi",
        upper: "Φ", lower: "φ", name: "φι", nameDe: "FI",
        sound: "wie F", soundDe: "f",
        ex: { el: "φίλος", de: "FI-los", meaning: "Freund", emoji: "🧑‍🤝‍🧑" },
      },
      {
        id: "chi",
        upper: "Χ", lower: "χ", name: "χι", nameDe: "CHI",
        sound: "wie CH – vor a/o/u wie in „Bach“, vor e/i wie in „ich“", soundDe: "ch",
        ex: { el: "χέρι", de: "CHE-ri", meaning: "Hand", emoji: "✋" },
      },
      {
        id: "psi",
        upper: "Ψ", lower: "ψ", name: "ψι", nameDe: "PSI",
        sound: "wie PS in „Psychologie“", soundDe: "ps",
        ex: { el: "ψάρι", de: "PSA-ri", meaning: "Fisch", emoji: "🐟" },
      },
      {
        id: "omega",
        upper: "Ω", lower: "ω", name: "ωμέγα", nameDe: "o-ME-gha",
        sound: "wie O – klingt genau wie όμικρον", soundDe: "o",
        ex: { el: "ώρα", de: "O-ra", meaning: "Stunde", emoji: "🕐" },
      },
    ],
  },
  // ───────────────────── Buchstaben-Kombinationen ─────────────────────
  {
    id: "combos",
    title: "Buchstaben-Paare",
    subtitle: "Der Schlüssel zum Lesen",
    kind: "combos",
    emoji: "🔑",
    intro: "Zwei Buchstaben, ein Laut. Damit kannst du fast alles lesen!",
    items: [
      { id: "ai", combo: "αι", soundDe: "e", sound: "klingt wie ε – ein kurzes E", ex: { el: "και", de: "ke", meaning: "und", emoji: "➕" } },
      { id: "ei", combo: "ει", soundDe: "i", sound: "klingt wie ein I", ex: { el: "είναι", de: "I-ne", meaning: "ist / sind", emoji: "🟰" } },
      { id: "oi", combo: "οι", soundDe: "i", sound: "klingt auch wie ein I", ex: { el: "οικογένεια", de: "i-ko-JE-nia", meaning: "Familie", emoji: "👨‍👩‍👧" } },
      { id: "ou", combo: "ου", soundDe: "u", sound: "klingt wie ein U", ex: { el: "μουσική", de: "mu-si-KI", meaning: "Musik", emoji: "🎵" } },
      { id: "av", combo: "αυ", soundDe: "af / aw", sound: "wie „af“ – vor weichen Lauten „aw“", ex: { el: "αυτός", de: "af-TOS", meaning: "er", emoji: "👨" } },
      { id: "ev", combo: "ευ", soundDe: "ef / ew", sound: "wie „ef“ – vor weichen Lauten „ew“", ex: { el: "ευχαριστώ", de: "ef-cha-ri-STO", meaning: "danke", emoji: "🙏" } },
      { id: "mp", combo: "μπ", soundDe: "b", sound: "so schreibt man das deutsche B", ex: { el: "μπίρα", de: "BI-ra", meaning: "Bier", emoji: "🍺" } },
      { id: "nt", combo: "ντ", soundDe: "d", sound: "so schreibt man das deutsche D", ex: { el: "ντομάτα", de: "do-MA-ta", meaning: "Tomate", emoji: "🍅" } },
      { id: "gk", combo: "γκ / γγ", soundDe: "g / ng", sound: "so schreibt man das harte G", ex: { el: "αγγλικά", de: "an-gli-KA", meaning: "Englisch", emoji: "🇬🇧" } },
      { id: "ts", combo: "τσ", soundDe: "ts", sound: "wie das Z in „Zahn“", ex: { el: "τσάι", de: "TSA-i", meaning: "Tee", emoji: "🍵" } },
      { id: "tz", combo: "τζ", soundDe: "ds", sound: "stimmhaftes „ds“", ex: { el: "τζατζίκι", de: "dza-DZI-ki", meaning: "Tzatziki", emoji: "🥒" } },
      { id: "gi", combo: "γι", soundDe: "j", sound: "wie das deutsche J", ex: { el: "γιαούρτι", de: "ja-UR-ti", meaning: "Joghurt", emoji: "🥛" } },
    ],
  },
  // ───────────────────────── Sprechen ─────────────────────────
  {
    id: "greet",
    title: "Begrüßen",
    subtitle: "Hallo, danke, tschüss",
    kind: "vocab",
    emoji: "👋",
    items: [
      { id: "jasu", el: "γεια σου", de: "ja su", meaning: "Hallo (zu einer Person)", emoji: "👋" },
      { id: "jasas", el: "γεια σας", de: "ja sas", meaning: "Hallo (höflich / zu mehreren)", emoji: "🙋" },
      { id: "kalimera", el: "καλημέρα", de: "ka-li-ME-ra", meaning: "Guten Morgen", emoji: "🌅", note: "bis etwa 12 Uhr" },
      { id: "kalispera", el: "καλησπέρα", de: "ka-li-SPE-ra", meaning: "Guten Abend", emoji: "🌆" },
      { id: "kalinichta", el: "καληνύχτα", de: "ka-li-NICH-ta", meaning: "Gute Nacht", emoji: "🌙" },
      { id: "andio", el: "αντίο", de: "an-DI-o", meaning: "Auf Wiedersehen", emoji: "👋" },
      { id: "efcharisto", el: "ευχαριστώ", de: "ef-cha-ri-STO", meaning: "Danke", emoji: "🙏" },
      { id: "parakalo", el: "παρακαλώ", de: "pa-ra-ka-LO", meaning: "Bitte / Gern", emoji: "🤲" },
      { id: "signomi", el: "συγγνώμη", de: "si-GHNO-mi", meaning: "Entschuldigung", emoji: "😅" },
      { id: "ne", el: "ναι", de: "ne", meaning: "Ja", emoji: "✅", note: "Achtung: klingt wie deutsch „nein“, heißt aber JA!" },
      { id: "ochi", el: "όχι", de: "O-chi", meaning: "Nein", emoji: "❌" },
      { id: "taleme", el: "τα λέμε", de: "ta LE-me", meaning: "Bis dann", emoji: "🤙" },
    ],
  },
  {
    id: "self",
    title: "Dich vorstellen",
    subtitle: "Wer bist du?",
    kind: "vocab",
    emoji: "🧑",
    items: [
      { id: "posselene", el: "πώς σε λένε;", de: "pos se LE-ne", meaning: "Wie heißt du?", emoji: "❓" },
      { id: "melene", el: "με λένε…", de: "me LE-ne", meaning: "Ich heiße…", emoji: "🪪" },
      { id: "cheropoli", el: "χαίρω πολύ", de: "CHE-ro po-LI", meaning: "Sehr erfreut", emoji: "🤝" },
      { id: "tikanis", el: "τι κάνεις;", de: "ti KA-nis", meaning: "Wie geht's?", emoji: "🙂" },
      { id: "kala", el: "καλά, ευχαριστώ", de: "ka-LA, ef-cha-ri-STO", meaning: "Gut, danke", emoji: "👍" },
      { id: "apopou", el: "από πού είσαι;", de: "a-PO pu I-se", meaning: "Woher kommst du?", emoji: "🌍" },
      { id: "germania", el: "είμαι από τη Γερμανία", de: "I-me a-PO ti gher-ma-NI-a", meaning: "Ich komme aus Deutschland", emoji: "🇩🇪" },
      { id: "anglika", el: "μιλάς αγγλικά;", de: "mi-LAS an-gli-KA", meaning: "Sprichst du Englisch?", emoji: "💬" },
      { id: "dhenkatal", el: "δεν καταλαβαίνω", de: "dhen ka-ta-la-WE-no", meaning: "Ich verstehe nicht", emoji: "🤷" },
      { id: "pioarga", el: "πιο αργά, παρακαλώ", de: "pio ar-GHA, pa-ra-ka-LO", meaning: "Langsamer, bitte", emoji: "🐢" },
      { id: "postolene", el: "πώς το λένε αυτό;", de: "pos to LE-ne af-TO", meaning: "Wie heißt das?", emoji: "👉" },
    ],
  },
  {
    id: "numbers",
    title: "Zahlen",
    subtitle: "1 bis 100",
    kind: "vocab",
    emoji: "🔢",
    items: [
      { id: "n1", el: "ένα", de: "E-na", meaning: "eins (1)", emoji: "1️⃣" },
      { id: "n2", el: "δύο", de: "DHI-o", meaning: "zwei (2)", emoji: "2️⃣" },
      { id: "n3", el: "τρία", de: "TRI-a", meaning: "drei (3)", emoji: "3️⃣" },
      { id: "n4", el: "τέσσερα", de: "TE-se-ra", meaning: "vier (4)", emoji: "4️⃣" },
      { id: "n5", el: "πέντε", de: "PEN-de", meaning: "fünf (5)", emoji: "5️⃣" },
      { id: "n6", el: "έξι", de: "E-ksi", meaning: "sechs (6)", emoji: "6️⃣" },
      { id: "n7", el: "εφτά", de: "ef-TA", meaning: "sieben (7)", emoji: "7️⃣" },
      { id: "n8", el: "οχτώ", de: "och-TO", meaning: "acht (8)", emoji: "8️⃣" },
      { id: "n9", el: "εννιά", de: "e-NIA", meaning: "neun (9)", emoji: "9️⃣" },
      { id: "n10", el: "δέκα", de: "DHE-ka", meaning: "zehn (10)", emoji: "🔟" },
      { id: "n20", el: "είκοσι", de: "I-ko-si", meaning: "zwanzig (20)", emoji: "💯" },
      { id: "n100", el: "εκατό", de: "e-ka-TO", meaning: "hundert (100)", emoji: "💯" },
    ],
  },
  {
    id: "cafe",
    title: "Im Café",
    subtitle: "Essen & trinken",
    kind: "vocab",
    emoji: "☕",
    items: [
      { id: "enakafe", el: "ένα καφέ, παρακαλώ", de: "E-na ka-FE, pa-ra-ka-LO", meaning: "Einen Kaffee, bitte", emoji: "☕" },
      { id: "nero", el: "νερό", de: "ne-RO", meaning: "Wasser", emoji: "💧" },
      { id: "krasi", el: "κρασί", de: "kra-SI", meaning: "Wein", emoji: "🍷" },
      { id: "bira", el: "μπίρα", de: "BI-ra", meaning: "Bier", emoji: "🍺" },
      { id: "psomi", el: "ψωμί", de: "pso-MI", meaning: "Brot", emoji: "🍞" },
      { id: "salata", el: "σαλάτα", de: "sa-LA-ta", meaning: "Salat", emoji: "🥗" },
      { id: "menu", el: "το μενού, παρακαλώ", de: "to me-NU, pa-ra-ka-LO", meaning: "Die Karte, bitte", emoji: "📋" },
      { id: "logariasmo", el: "τον λογαριασμό, παρακαλώ", de: "ton lo-ghar-ja-SMO, pa-ra-ka-LO", meaning: "Die Rechnung, bitte", emoji: "🧾" },
      { id: "oreo", el: "ήταν πολύ ωραίο", de: "I-tan po-LI o-RE-o", meaning: "Es war sehr lecker", emoji: "😋" },
      { id: "stinijia", el: "στην υγειά μας!", de: "stin i-JA mas", meaning: "Zum Wohl!", emoji: "🥂" },
      { id: "chortofagos", el: "είμαι χορτοφάγος", de: "I-me chor-to-FA-ghos", meaning: "Ich bin Vegetarier", emoji: "🥬" },
    ],
  },
  {
    id: "shop",
    title: "Einkaufen",
    subtitle: "Preise & Markt",
    kind: "vocab",
    emoji: "🛍️",
    items: [
      { id: "posokani", el: "πόσο κάνει;", de: "PO-so KA-ni", meaning: "Was kostet das?", emoji: "💰" },
      { id: "akrivo", el: "είναι ακριβό", de: "I-ne a-kri-WO", meaning: "Das ist teuer", emoji: "😮" },
      { id: "fthino", el: "φθηνό", de: "fthi-NO", meaning: "billig", emoji: "🏷️" },
      { id: "theloafto", el: "θέλω αυτό", de: "THE-lo af-TO", meaning: "Ich möchte das", emoji: "👉" },
      { id: "echete", el: "έχετε…;", de: "E-che-te", meaning: "Haben Sie…?", emoji: "🔍" },
      { id: "agora", el: "η αγορά", de: "i a-gho-RA", meaning: "der Markt", emoji: "🏪" },
      { id: "resta", el: "τα ρέστα", de: "ta RE-sta", meaning: "das Wechselgeld", emoji: "🪙" },
      { id: "karta", el: "με κάρτα", de: "me KAR-ta", meaning: "mit Karte", emoji: "💳" },
      { id: "metrita", el: "μετρητά", de: "me-tri-TA", meaning: "Bargeld", emoji: "💵" },
    ],
  },
  {
    id: "way",
    title: "Unterwegs",
    subtitle: "Wo ist…?",
    kind: "vocab",
    emoji: "🧭",
    items: [
      { id: "pouine", el: "πού είναι…;", de: "pu I-ne", meaning: "Wo ist…?", emoji: "❓" },
      { id: "toualeta", el: "η τουαλέτα", de: "i tu-a-LE-ta", meaning: "die Toilette", emoji: "🚻" },
      { id: "aristera", el: "αριστερά", de: "a-ri-ste-RA", meaning: "links", emoji: "⬅️" },
      { id: "deksia", el: "δεξιά", de: "dhe-ksi-A", meaning: "rechts", emoji: "➡️" },
      { id: "eftheia", el: "ευθεία", de: "ef-THI-a", meaning: "geradeaus", emoji: "⬆️" },
      { id: "konda", el: "κοντά", de: "kon-DA", meaning: "nah", emoji: "📍" },
      { id: "makria", el: "μακριά", de: "ma-kri-A", meaning: "weit", emoji: "🛣️" },
      { id: "paralia", el: "η παραλία", de: "i pa-ra-LI-a", meaning: "der Strand", emoji: "🏖️" },
      { id: "leoforio", el: "το λεωφορείο", de: "to le-o-fo-RI-o", meaning: "der Bus", emoji: "🚌" },
      { id: "limani", el: "το λιμάνι", de: "to li-MA-ni", meaning: "der Hafen", emoji: "⛴️" },
      { id: "chathika", el: "χάθηκα", de: "CHA-thi-ka", meaning: "Ich habe mich verlaufen", emoji: "🗺️" },
    ],
  },
  {
    id: "time",
    title: "Zeit & Tage",
    subtitle: "Wann?",
    kind: "vocab",
    emoji: "🕐",
    items: [
      { id: "tiora", el: "τι ώρα είναι;", de: "ti O-ra I-ne", meaning: "Wie viel Uhr ist es?", emoji: "⏰" },
      { id: "simera", el: "σήμερα", de: "SI-me-ra", meaning: "heute", emoji: "📅" },
      { id: "avrio", el: "αύριο", de: "AW-ri-o", meaning: "morgen", emoji: "➡️" },
      { id: "chthes", el: "χθες", de: "chthes", meaning: "gestern", emoji: "⬅️" },
      { id: "tora", el: "τώρα", de: "TO-ra", meaning: "jetzt", emoji: "⚡" },
      { id: "deftera", el: "Δευτέρα", de: "dhef-TE-ra", meaning: "Montag", emoji: "1️⃣" },
      { id: "triti", el: "Τρίτη", de: "TRI-ti", meaning: "Dienstag", emoji: "2️⃣" },
      { id: "tetarti", el: "Τετάρτη", de: "te-TAR-ti", meaning: "Mittwoch", emoji: "3️⃣" },
      { id: "pempti", el: "Πέμπτη", de: "PEM-pti", meaning: "Donnerstag", emoji: "4️⃣" },
      { id: "paraskevi", el: "Παρασκευή", de: "pa-ra-ske-WI", meaning: "Freitag", emoji: "5️⃣" },
      { id: "savato", el: "Σάββατο", de: "SA-wa-to", meaning: "Samstag", emoji: "6️⃣" },
      { id: "kiriaki", el: "Κυριακή", de: "ki-ria-KI", meaning: "Sonntag", emoji: "7️⃣" },
    ],
  },
  {
    id: "help",
    title: "Hilfe & Notfall",
    subtitle: "Wichtig!",
    kind: "vocab",
    emoji: "🆘",
    items: [
      { id: "voithia", el: "βοήθεια!", de: "wo-I-thia", meaning: "Hilfe!", emoji: "🆘" },
      { id: "giatro", el: "καλέστε γιατρό", de: "ka-LE-ste ja-TRO", meaning: "Rufen Sie einen Arzt", emoji: "👨‍⚕️" },
      { id: "astinomia", el: "αστυνομία", de: "a-sti-no-MI-a", meaning: "Polizei", emoji: "🚓" },
      { id: "nosokomio", el: "νοσοκομείο", de: "no-so-ko-MI-o", meaning: "Krankenhaus", emoji: "🏥" },
      { id: "farmakio", el: "φαρμακείο", de: "far-ma-KI-o", meaning: "Apotheke", emoji: "💊" },
      { id: "ponai", el: "πονάει", de: "po-NA-i", meaning: "es tut weh", emoji: "🤕" },
      { id: "arostos", el: "είμαι άρρωστος", de: "I-me A-ro-stos", meaning: "ich bin krank", emoji: "🤒" },
      { id: "tsanda", el: "χάθηκε η τσάντα μου", de: "CHA-thi-ke i TSAN-da mu", meaning: "Meine Tasche ist weg", emoji: "👜" },
      { id: "tilefono", el: "τηλέφωνο", de: "ti-LE-fo-no", meaning: "Telefon", emoji: "📞" },
    ],
  },
  {
    id: "smalltalk",
    title: "Plaudern",
    subtitle: "Gefühle & Wünsche",
    kind: "vocab",
    emoji: "💬",
    items: [
      { id: "orea", el: "ωραία!", de: "o-RE-a", meaning: "Schön!", emoji: "✨" },
      { id: "telia", el: "τέλεια!", de: "TE-lia", meaning: "Perfekt!", emoji: "🌟" },
      { id: "maresi", el: "μ’ αρέσει", de: "ma-RE-si", meaning: "Es gefällt mir", emoji: "❤️" },
      { id: "polikala", el: "πολύ καλά", de: "po-LI ka-LA", meaning: "sehr gut", emoji: "👌" },
      { id: "ligo", el: "λίγο", de: "LI-gho", meaning: "ein wenig", emoji: "🤏" },
      { id: "kourasmenos", el: "κουρασμένος", de: "ku-ra-SME-nos", meaning: "müde", emoji: "😴" },
      { id: "pinao", el: "πεινάω", de: "pi-NA-o", meaning: "Ich habe Hunger", emoji: "🍽️" },
      { id: "dipsao", el: "διψάω", de: "dhi-PSA-o", meaning: "Ich habe Durst", emoji: "🥤" },
      { id: "sigcharitiria", el: "συγχαρητήρια", de: "sing-cha-ri-TI-ria", meaning: "Gratulation", emoji: "🎉" },
      { id: "kalitichi", el: "καλή τύχη", de: "ka-LI TI-chi", meaning: "Viel Glück", emoji: "🍀" },
      { id: "kalotaksidi", el: "καλό ταξίδι", de: "ka-LO ta-KSI-dhi", meaning: "Gute Reise", emoji: "✈️" },
    ],
  },
];

// Jede Lerneinheit bekommt eine global eindeutige Karten-ID.
export const cardKey = (lessonId, itemId) => lessonId + ":" + itemId;

export const ALL_CARDS = LESSONS.flatMap((l) =>
  l.items.map((it) => ({ ...it, lessonId: l.id, kind: l.kind, key: cardKey(l.id, it.id) }))
);

export const TOTAL_CARDS = ALL_CARDS.length;

// Was die Sprachausgabe sagen soll.
export const sayTextFor = (card) => {
  if (card.kind === "letters") return card.name;
  if (card.kind === "combos") return card.ex.el;
  return card.el;
};

// Griechischer Text, der angezeigt wird.
export const greekTextFor = (card) => {
  if (card.kind === "letters") return card.upper + " " + card.lower;
  if (card.kind === "combos") return card.combo;
  return card.el;
};

// Deutsche Lautschrift.
export const translitFor = (card) => {
  if (card.kind === "letters") return card.nameDe;
  if (card.kind === "combos") return card.soundDe;
  return card.de;
};

// Die "Lösung" einer Übung.
export const answerFor = (card) => {
  if (card.kind === "letters") return card.name + " – " + card.sound;
  if (card.kind === "combos") return "klingt wie „" + card.soundDe + "“";
  return card.meaning;
};
