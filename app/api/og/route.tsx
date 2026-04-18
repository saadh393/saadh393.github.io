import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title") ?? "Saad Hasan";
    const type = searchParams.get("type") ?? "article";
    const description = searchParams.get("description") ?? "";

    const sectionLabel = type === "case-study" ? "~/projects" : "~/blog";

    const chevronRows = Array.from({ length: 18 });
    const chevronCols = Array.from({ length: 9 });

    return new ImageResponse(
        <div
            style={{
                width: 1200,
                height: 630,
                background: "#0a0a0a",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                fontFamily: "monospace",
                overflow: "hidden",
            }}
        >
            {/* Chevron grid — right 45% */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 520,
                    height: 630,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "18px 18px 18px 0",
                    gap: 0,
                }}
            >
                {chevronRows.map((_, row) => (
                    <div
                        key={row}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 6,
                            lineHeight: "1",
                            marginBottom: 14,
                        }}
                    >
                        {chevronCols.map((_, col) => (
                            <span
                                key={col}
                                style={{
                                    fontSize: 22,
                                    color: "rgba(255,255,255,0.13)",
                                    fontFamily: "monospace",
                                    letterSpacing: "-2px",
                                }}
                            >
                                {">>"}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Left content area */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 720,
                    height: 630,
                    display: "flex",
                    flexDirection: "column",
                    padding: "52px 0 48px 64px",
                }}
            >
                {/* Section label */}
                <div
                    style={{
                        fontSize: 20,
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "monospace",
                        letterSpacing: "0.01em",
                        marginBottom: 48,
                    }}
                >
                    {sectionLabel}
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize:
                            title.length > 45
                                ? 44
                                : title.length > 30
                                  ? 52
                                  : 60,
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        fontFamily: "monospace",
                        flex: 1,
                        display: "flex",
                        alignItems: "flex-start",
                        maxWidth: 640,
                    }}
                >
                    {title}
                </div>

                {/* Description */}
                {description ? (
                    <div
                        style={{
                            fontSize: 18,
                            color: "rgba(255,255,255,0.5)",
                            fontFamily: "monospace",
                            lineHeight: 1.5,
                            maxWidth: 600,
                            marginBottom: 24,
                            display: "flex",
                        }}
                    >
                        {description.length > 120
                            ? description.slice(0, 120) + "…"
                            : description}
                    </div>
                ) : null}

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: 640,
                    }}
                >
                    <span
                        style={{
                            fontSize: 18,
                            color: "rgba(255,255,255,0.4)",
                            fontFamily: "monospace",
                        }}
                    >
                        https://saadh393.github.io/ →
                    </span>
                </div>
            </div>

            {/* Brand — bottom right, above chevrons */}
            <div
                style={{
                    position: "absolute",
                    bottom: 44,
                    right: 52,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span
                    style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                    }}
                >
                    {">> "}
                </span>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 2,
                    }}
                >
                    <span
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#ffffff",
                            fontFamily: "monospace",
                            letterSpacing: "0.06em",
                        }}
                    >
                        SAAD HASAN
                    </span>
                    <span
                        style={{
                            fontSize: 20,
                            color: "rgba(255,255,255,0.35)",
                            fontFamily: "monospace",
                            letterSpacing: "0.04em",
                        }}
                    >
                        Jr. Software Engineer
                    </span>
                </div>
                <span
                    style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                    }}
                >
                    {">>"}
                </span>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
