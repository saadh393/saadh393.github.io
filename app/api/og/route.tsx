import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "Saad Hasan";
  const type = searchParams.get("type") ?? "article"; // "article" | "case-study"
  const tags = searchParams.get("tags") ?? "";

  const typeLabel = type === "case-study" ? "Case Study" : "Article";
  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#0070f3",
          }}
        />

        {/* Type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0070f3",
              border: "1.5px solid #0070f3",
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {typeLabel}
          </div>
          {tagList.map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 12,
                color: "#999",
                background: "#f5f5f5",
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 42 : 52,
            fontWeight: 700,
            color: "#000000",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#0070f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              SH
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                Saad Hasan
              </span>
              <span style={{ fontSize: 12, color: "#999" }}>
                Frontend Engineer
              </span>
            </div>
          </div>
          <span style={{ fontSize: 13, color: "#bbb" }}>saadhasan.dev</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
