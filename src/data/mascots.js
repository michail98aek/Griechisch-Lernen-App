// Maskottchen. Unterschiedlich sind nicht nur die Farben, sondern die Form:
// Ohren, Schwanz, Kopfform, Schnauze, Fellzeichnung und Accessoire.

export const MASCOTS = [
  // ───────── Katzen ─────────
  {
    id: "mia", name: "Mia", species: "cat", kindLabel: "Katze",
    desc: "Die Klassikerin mit Schleife",
    ears: "pointy", head: "round", tail: "curl", marking: "none", accessory: "bow",
    fur: "#FBF6EC", belly: "#FFFFFF", accent: "#E8974E", dark: "#D98236", bow: "#2B6CA3",
    greeting: "Γεια σου! Ich bin Mia.",
  },
  {
    id: "luna", name: "Luna", species: "cat", kindLabel: "Katze",
    desc: "Rundohr im Smoking",
    ears: "round", head: "wide", tail: "fluffy", marking: "tuxedo", accessory: "bow",
    fur: "#9FA9B5", belly: "#FFFFFF", accent: "#EFA1BF", dark: "#6F7985", bow: "#7E6BB5",
    greeting: "Γεια σου! Ich bin Luna.",
  },
  {
    id: "tigris", name: "Tigris", species: "cat", kindLabel: "Tigerkatze",
    desc: "Getigert und frech",
    ears: "pointy", head: "round", tail: "curl", marking: "tabby", accessory: "none",
    fur: "#F0A94C", belly: "#FFE3BC", accent: "#C9742A", dark: "#A85B1E", bow: "#4C9A6A",
    greeting: "Γεια σου! Ich bin Tigris.",
  },
  {
    id: "rosa", name: "Rosa", species: "cat", kindLabel: "Katze",
    desc: "Flauschig mit Ohrbüscheln",
    ears: "tufted", head: "oval", tail: "fluffy", marking: "none", accessory: "bow",
    fur: "#FBE4EC", belly: "#FFFFFF", accent: "#E78BAD", dark: "#CE6F93", bow: "#E8709A",
    greeting: "Γεια σου! Ich bin Rosa.",
  },
  {
    id: "coco", name: "Coco", species: "cat", kindLabel: "Katze",
    desc: "Mit Augenfleck",
    ears: "pointy", head: "wide", tail: "fluffy", marking: "patch", accessory: "scarf",
    fur: "#C79A6E", belly: "#F2DCC2", accent: "#8A5A34", dark: "#7A4C28", bow: "#3E7CB1",
    greeting: "Γεια σου! Ich bin Coco.",
  },
  {
    id: "minze", name: "Minze", species: "cat", kindLabel: "Katze",
    desc: "Rundohr in Minzgrün",
    ears: "round", head: "round", tail: "curl", marking: "tuxedo", accessory: "scarf",
    fur: "#A8D8BE", belly: "#FFFFFF", accent: "#4F9E78", dark: "#3D8463", bow: "#E58E5A",
    greeting: "Γεια σου! Ich bin Minze.",
  },
  // ───────── Füchse ─────────
  {
    id: "foxi", name: "Foxi", species: "fox", kindLabel: "Fuchs",
    desc: "Spitze Schnauze, dicker Schwanz",
    ears: "fox", head: "fox", tail: "bushy", marking: "foxmask", accessory: "scarf",
    fur: "#E8742C", belly: "#FFF4E6", accent: "#C25516", dark: "#4A3228", bow: "#2B6CA3",
    greeting: "Γεια σου! Ich bin Foxi.",
  },
  {
    id: "nifada", name: "Nifáda", species: "fox", kindLabel: "Polarfuchs",
    desc: "Schneeweiß aus dem Norden",
    ears: "fox", head: "fox", tail: "bushy", marking: "foxmask", accessory: "scarf",
    fur: "#F2F5F8", belly: "#FFFFFF", accent: "#B9C6D2", dark: "#8696A6", bow: "#5C9BD1",
    greeting: "Γεια σου! Ich bin Nifáda.",
  },
  {
    id: "floga", name: "Flóga", species: "fox", kindLabel: "Feuerfuchs",
    desc: "Ohrbüschel und Feuerfell",
    ears: "tufted", head: "fox", tail: "bushy", marking: "foxmask", accessory: "none",
    fur: "#D9452B", belly: "#FFE7D4", accent: "#A82D18", dark: "#3E2420", bow: "#E0C24A",
    greeting: "Γεια σου! Ich bin Flóga.",
  },
  {
    id: "ammos", name: "Ámmos", species: "fox", kindLabel: "Wüstenfuchs",
    desc: "Riesenohren, hört alles",
    ears: "big", head: "fox", tail: "bushy", marking: "foxmask", accessory: "bow",
    fur: "#EFD6A8", belly: "#FFF8EA", accent: "#C9A464", dark: "#9B7B45", bow: "#4C9A6A",
    greeting: "Γεια σου! Ich bin Ámmos.",
  },
];

export const DEFAULT_MASCOT = MASCOTS[0];
export const getMascot = (id) => MASCOTS.find((m) => m.id === id) || DEFAULT_MASCOT;
