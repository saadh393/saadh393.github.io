"use client";

import { useState } from "react";
import { iso, isoBox, isoPoints, lerp3, type Vec3 } from "@/lib/isometric";
import { paletteAt } from "./palette";

const FONT_SANS = "var(--font-geist-sans), system-ui, sans-serif";
const FONT_MONO = "var(--font-geist-mono), monospace";
const BLUE = paletteAt(0);
const VIOLET = paletteAt(1);
const ORIGIN: Vec3 = [370, 0, 0];

const CAPTIONS = [
  { id: "receipt", text: "a receipt", tip: [335, 45, 46] as Vec3, color: paletteAt(3).ink, left: true },
  { id: "selfie", text: "a selfie", tip: [432, 42, 22] as Vec3, color: paletteAt(2).ink, left: false },
  { id: "slide", text: "a presentation slide", tip: [420, -38, 58] as Vec3, color: paletteAt(4).ink, left: false },
];

const IMAGES: Record<string, { tip: Vec3; icon: Vec3[][] }> = {
  slide: {
    tip: [410, -26, 66],
    icon: [
      [[14, -100, 7], [66, -100, 7], [66, -52, 7], [14, -52, 7], [14, -100, 7]],
      [[24, -90, 7], [56, -90, 7]],
      [[24, -80, 7], [50, -80, 7]],
      [[24, -70, 7], [54, -70, 7]],
    ],
  },
  selfie: {
    tip: [424, 30, 32],
    icon: [
      Array.from({ length: 17 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return [34 + Math.cos(a) * 11, -78 + Math.sin(a) * 11, 7] as Vec3;
      }),
      [[60, -98, 7], [52, -90, 7], [52, -66, 7], [60, -58, 7]],
    ],
  },
  receipt: {
    tip: [345, 36, 54],
    icon: [
      [[16, -88, 7], [64, -88, 7], [64, -64, 7], [16, -64, 7], [16, -88, 7]],
      [[26, -88, 7], [26, -64, 7]],
      [[36, -88, 7], [36, -70, 7]],
      [[46, -88, 7], [46, -74, 7]],
    ],
  },
};

const CARD_Z = [0, 14, 28];

function Box({ at, size, color, label, labelAt }: { at: Vec3; size: Vec3; color: string; label: string; labelAt: Vec3 }) {
  const f = isoBox(at, size);
  const [lx, ly] = iso(labelAt);
  return (
    <g>
      <polygon points={f.left} fill={color} opacity={0.55} />
      <polygon points={f.right} fill={color} opacity={0.8} />
      <polygon points={f.top} fill={color} opacity={0.3} />
      <text x={lx} y={ly} fontSize={11} fontFamily={FONT_MONO} fill="#444">
        {label}
      </text>
    </g>
  );
}

function Flow({ from, to, color }: { from: Vec3; to: Vec3; color: string }) {
  const n = 8;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = iso(lerp3(from, to, i / (n - 1)));
        return (
          <circle
            key={i}
            className="clip-iso-dot"
            cx={x}
            cy={y}
            r={2.4}
            fill={color}
            style={{ animationDelay: `${(i / n) * 1.6}s` }}
          />
        );
      })}
    </g>
  );
}

function Arrow({ tip, color, strong }: { tip: Vec3; color: string; strong?: boolean }) {
  const [x1, y1] = iso(ORIGIN);
  const [x2, y2] = iso(tip);
  return (
    <g className={strong ? "clip-iso-match" : undefined}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strong ? 3 : 2} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={strong ? 5 : 3.5} fill={color} />
    </g>
  );
}

export function ClipEncoders() {
  const [image, setImage] = useState<keyof typeof IMAGES>("slide");
  const current = IMAGES[image];
  const plane = isoPoints([[300, -70, 0], [440, -70, 0], [440, 70, 0], [300, 70, 0]]);
  const grid = [-35, 0, 35].flatMap((o) => [
    isoPoints([[370 + o, -70, 0], [370 + o, 70, 0]]),
    isoPoints([[300, o, 0], [440, o, 0]]),
  ]);
  const slab = isoBox([0, -110, 0], [80, 70, 6]);
  const [shx, shy] = iso([440, 70, 0]);

  return (
    <figure
      style={{
        margin: "32px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: "#666", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Two encoders, one space
        </span>
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CAPTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setImage(c.id)}
              aria-pressed={image === c.id}
              style={{
                fontSize: 12,
                fontFamily: FONT_MONO,
                padding: "4px 10px",
                borderRadius: 6,
                border: `1px solid ${image === c.id ? BLUE.ring : "rgba(0,0,0,0.1)"}`,
                background: image === c.id ? BLUE.bg : "#fff",
                color: image === c.id ? BLUE.ink : "#666",
                cursor: "pointer",
              }}
            >
              {c.id} image
            </button>
          ))}
        </span>
      </div>

      <svg viewBox="0 0 680 370" role="img" aria-label="An image and three captions pass through separate encoders into one shared vector space. The image vector lands closest to the caption that describes it." style={{ display: "block", width: "100%", height: "auto" }}>
        <g transform="translate(120 80)">
          <polygon points={slab.left} fill={BLUE.ink} opacity={0.35} />
          <polygon points={slab.right} fill={BLUE.ink} opacity={0.55} />
          <polygon points={slab.top} fill="#fff" stroke={BLUE.ring} />
          {current.icon.map((line, i) => (
            <polyline key={i} points={isoPoints(line)} fill="none" stroke={BLUE.ink} strokeWidth={1.6} strokeLinejoin="round" />
          ))}

          {CARD_Z.map((z, i) => {
            const card = isoBox([0, 50, z], [80, 60, 4]);
            return (
              <g key={z}>
                <polygon points={card.left} fill={VIOLET.ink} opacity={0.35} />
                <polygon points={card.right} fill={VIOLET.ink} opacity={0.55} />
                <polygon points={card.top} fill="#fff" stroke={VIOLET.ring} />
                {i === CARD_Z.length - 1 && (
                  <polyline points={isoPoints([[14, 66, z + 5], [60, 66, z + 5]])} stroke={VIOLET.ink} strokeWidth={1.6} />
                )}
              </g>
            );
          })}

          <Flow from={[80, -75, 3]} to={[150, -75, 30]} color={BLUE.ink} />
          <Flow from={[80, 80, 20]} to={[150, 75, 30]} color={VIOLET.ink} />
          <Box at={[150, -110, 0]} size={[70, 70, 60]} color={BLUE.ink} label="image encoder · ViT-B/32" labelAt={[232, -110, 66]} />
          <Box at={[150, 40, 0]} size={[70, 70, 60]} color={VIOLET.ink} label="text encoder" labelAt={[30, 110, -50]} />
          <Flow from={[220, -75, 30]} to={[300, -40, 10]} color={BLUE.ink} />
          <Flow from={[220, 75, 30]} to={[300, 40, 10]} color={VIOLET.ink} />

          <polygon points={plane} fill="rgba(0,0,0,0.025)" stroke="rgba(0,0,0,0.12)" />
          {grid.map((g, i) => (
            <polyline key={i} points={g} stroke="rgba(0,0,0,0.06)" fill="none" />
          ))}

          {CAPTIONS.map((c) => {
            const [tx, ty] = iso(c.tip);
            const match = c.id === image;
            return (
              <g key={c.id}>
                <Arrow tip={c.tip} color={c.color} strong={match} />
                <text x={c.left ? tx - 10 : tx + 8} y={ty - 6} textAnchor={c.left ? "end" : "start"} fontSize={11} fontFamily={FONT_MONO} fill={c.color} fontWeight={match ? 600 : 400}>
                  {c.text}
                </text>
              </g>
            );
          })}
          <Arrow tip={current.tip} color={BLUE.ink} strong />

          <text x={shx - 150} y={shy + 22} fontSize={11} fontFamily={FONT_MONO} fill="#888">
            shared 512-d space (drawn in 3-d)
          </text>
        </g>
      </svg>

      <figcaption style={{ padding: "12px 20px 16px", fontSize: 13, color: "#555", lineHeight: 1.6, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        The blue arrow is the image. Each colored arrow is a caption. Classification is just picking the caption whose arrow points the most in the same direction.
      </figcaption>
    </figure>
  );
}
