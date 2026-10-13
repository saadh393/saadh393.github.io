import { horizontalCurve } from "@/lib/curve";

const ACCENT = "#0070f3";
const MUTED = "#c3d6f7";

const COLUMNS = [
    { x: 12, ys: [20, 45, 70, 95, 120], active: 2 },
    { x: 80, ys: [30, 70, 110], active: 1 },
    { x: 150, ys: [14, 40, 66, 92, 118], active: 2 },
    { x: 220, ys: [24, 56, 88, 120], active: 2 },
    { x: 286, ys: [14, 38, 62, 86, 110, 134], active: 4 },
];

const EDGES = COLUMNS.slice(0, -1).flatMap((col, i) =>
    col.ys.flatMap((y1) =>
        COLUMNS[i + 1].ys.map((y2) =>
            horizontalCurve(col.x, y1, COLUMNS[i + 1].x, y2),
        ),
    ),
);

const ACTIVE_PATH = COLUMNS.slice(0, -1)
    .map((col, i) => {
        const next = COLUMNS[i + 1];
        return horizontalCurve(
            col.x,
            col.ys[col.active],
            next.x,
            next.ys[next.active],
        );
    })
    .join("");

const first = COLUMNS[0];
const last = COLUMNS[COLUMNS.length - 1];

export function GuideCoverArt() {
    return (
        <svg
            viewBox="0 0 300 148"
            className="guide-cover-art"
            aria-hidden="true"
        >
            <g fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.18">
                {EDGES.map((d) => (
                    <path key={d} d={d} />
                ))}
            </g>
            <path d={ACTIVE_PATH} fill="none" stroke={ACCENT} strokeWidth="1.6" />
            <circle
                className="guide-art-pulse"
                cx={first.x}
                cy={first.ys[first.active]}
                r="6"
                fill={ACCENT}
            />
            <circle
                className="guide-art-pulse"
                cx={last.x}
                cy={last.ys[last.active]}
                r="10"
                fill={ACCENT}
            />
            {COLUMNS.map((col, c) =>
                col.ys.map((y, i) => {
                    const on = i === col.active;
                    const fill = on ? ACCENT : "#fff";
                    const stroke = on ? ACCENT : MUTED;
                    if (c === 0) {
                        return (
                            <circle
                                key={`${c}-${i}`}
                                cx={col.x}
                                cy={y}
                                r="5"
                                fill={fill}
                                stroke={stroke}
                            />
                        );
                    }
                    if (c === COLUMNS.length - 1) {
                        return (
                            <g key={`${c}-${i}`} fill={fill} stroke={stroke}>
                                <rect x={col.x - 9} y={y - 5} width="18" height="10" rx="2" />
                                <ellipse cx={col.x} cy={y - 5} rx="9" ry="2.6" />
                            </g>
                        );
                    }
                    return (
                        <g key={`${c}-${i}`}>
                            <rect
                                x={col.x - 13}
                                y={y - 6}
                                width="26"
                                height="12"
                                rx="3"
                                fill={fill}
                                stroke={stroke}
                            />
                            {c === 3 &&
                                [-6, -1.5, 3].map((dx) => (
                                    <rect
                                        key={dx}
                                        x={col.x + dx}
                                        y={y - 3}
                                        width="3"
                                        height="6"
                                        rx="0.6"
                                        fill={on ? "#fff" : MUTED}
                                    />
                                ))}
                        </g>
                    );
                }),
            )}
        </svg>
    );
}
