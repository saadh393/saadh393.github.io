import { iso, isoBox } from "@/lib/isometric";

const FONT_MONO = "var(--font-geist-mono), monospace";
const SIZE = 46;
const GAP = 44;
const HEIGHT = 150;
const PAD = 16;

export interface IsoBar {
  label: string;
  value: number;
  text: string;
  color: string;
}

interface IsoBarGroupProps {
  bars: IsoBar[];
  max: number;
  ariaLabel: string;
  active: string | null;
  onActive: (label: string | null) => void;
}

export function IsoBarGroup({ bars, max, ariaLabel, active, onActive }: IsoBarGroupProps) {
  const width = bars.length * SIZE + (bars.length - 1) * GAP + PAD * 2;
  const floor = isoBox([-PAD, -PAD, -6], [width, SIZE + PAD * 2, 6]);
  const heights = bars.map((b) => Math.max(4, (b.value / Math.max(max, 1)) * HEIGHT));
  const minX = iso([-PAD, SIZE + PAD, 0])[0] - 36;
  const maxX = iso([width - PAD, -PAD, 0])[0] + 36;
  const minY = Math.min(...heights.map((h, i) => iso([i * (SIZE + GAP), 0, h])[1])) - 28;
  const maxY = iso([width - PAD, SIZE + PAD, -6])[1] + 40;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      role="group"
      aria-label={ariaLabel}
      style={{ display: "block", width: "100%", height: "auto" }}
      onMouseLeave={() => onActive(null)}
    >
      <polygon points={floor.left} fill="#ececec" />
      <polygon points={floor.right} fill="#e0e0e0" />
      <polygon points={floor.top} fill="#f7f7f7" />
      {bars.map((b, i) => {
        const x = i * (SIZE + GAP);
        const f = isoBox([x, 0, 0], [SIZE, SIZE, heights[i]]);
        const [vx, vy] = iso([x + SIZE / 2, SIZE / 2, heights[i]]);
        const [nx, ny] = iso([x + SIZE, SIZE + PAD, -6]);
        const dim = active !== null && active !== b.label;
        return (
          <g
            key={b.label}
            className="iso-bar"
            tabIndex={0}
            role="button"
            aria-label={`${b.label}: ${b.text}`}
            aria-pressed={active === b.label}
            opacity={dim ? 0.25 : 1}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onActive(b.label)}
            onFocus={() => onActive(b.label)}
            onBlur={() => onActive(null)}
            onClick={() => onActive(b.label)}
          >
            <polygon points={f.left} fill="#fff" />
            <polygon points={f.right} fill="#fff" />
            <polygon points={f.top} fill="#fff" />
            <polygon points={f.left} fill={b.color} opacity={0.6} />
            <polygon points={f.right} fill={b.color} opacity={0.85} />
            <polygon points={f.top} fill={b.color} opacity={0.3} />
            <text
              x={vx}
              y={vy - 12}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fontFamily={FONT_MONO}
              fill={b.color}
              stroke="#fff"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {b.text}
            </text>
            <text x={nx} y={ny + 18} textAnchor="middle" fontSize={11} fontFamily={FONT_MONO} fill="#555">
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
