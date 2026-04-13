/**
 * MDX component color palette — derived from DESIGN_SYSTEM.md
 *
 * Each entry has:
 *   ink   — text / icon color (readable on white bg)
 *   bg    — subtle tinted background (~5–8% opacity)
 *   ring  — border / outline color (40–50% opacity)
 */

export interface PaletteEntry {
  ink: string;
  bg: string;
  ring: string;
}

export const PALETTE: PaletteEntry[] = [
  // 0 — Blue (primary)
  { ink: "#0070f3", bg: "rgba(0,112,243,0.07)",   ring: "rgba(0,112,243,0.35)" },
  // 1 — Violet / Indigo
  { ink: "#7928ca", bg: "rgba(121,40,202,0.07)",  ring: "rgba(121,40,202,0.35)" },
  // 2 — Green
  { ink: "#16a34a", bg: "rgba(22,163,74,0.07)",   ring: "rgba(22,163,74,0.35)"  },
  // 3 — Amber
  { ink: "#d97706", bg: "rgba(217,119,6,0.07)",   ring: "rgba(217,119,6,0.35)"  },
  // 4 — Red
  { ink: "#dc2626", bg: "rgba(220,38,38,0.07)",   ring: "rgba(220,38,38,0.35)"  },
  // 5 — Cyan / Teal
  { ink: "#0891b2", bg: "rgba(8,145,178,0.07)",   ring: "rgba(8,145,178,0.35)"  },
];

/** Cycle through palette by index */
export function paletteAt(i: number): PaletteEntry {
  return PALETTE[i % PALETTE.length];
}
