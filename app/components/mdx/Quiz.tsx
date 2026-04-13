"use client";

import { useState } from "react";

interface QuizProps {
  question: string;
  options: string[] | string; // JSON string or array
  correct: number; // 0-based index
  explanation?: string;
}

export function Quiz({ question, options: optionsRaw, correct, explanation }: QuizProps) {
  const options: string[] =
    typeof optionsRaw === "string" ? JSON.parse(optionsRaw) : optionsRaw ?? [];

  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const answered = revealed && selected !== null;
  const isCorrect = selected === correct;

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
  }

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
  }

  function handleReset() {
    setSelected(null);
    setRevealed(false);
  }

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        margin: "28px 0",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#0070f3",
            border: "1px solid #0070f3",
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          QUIZ
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#aaa",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Knowledge check
        </span>
      </div>

      {/* Question */}
      <div style={{ padding: "20px 20px 0" }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#111",
            lineHeight: 1.5,
            margin: "0 0 16px",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          {question}
        </p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {options.map((opt, i) => {
            let borderColor = "rgba(0,0,0,0.1)";
            let bg = "#fff";
            let color = "#333";
            let icon: string | null = null;

            if (answered) {
              if (i === correct) {
                borderColor = "#16a34a";
                bg = "#f0fdf4";
                color = "#16a34a";
                icon = "✓";
              } else if (i === selected) {
                borderColor = "#dc2626";
                bg = "#fef2f2";
                color = "#dc2626";
                icon = "✗";
              }
            } else if (selected === i) {
              borderColor = "#0070f3";
              bg = "#f0f7ff";
              color = "#0070f3";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 16px",
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 8,
                  background: bg,
                  cursor: revealed ? "default" : "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `1.5px solid ${borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color,
                    fontFamily: "var(--font-geist-mono), monospace",
                    flexShrink: 0,
                    background: answered && i === correct ? "#16a34a" : answered && i === selected ? "#dc2626" : "transparent",
                  }}
                >
                  {icon ?? String.fromCharCode(65 + i)}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color,
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    lineHeight: 1.4,
                    transition: "color 0.15s",
                    fontWeight: answered && i === correct ? 600 : 400,
                  }}
                >
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {answered && explanation && (
        <div
          style={{
            margin: "16px 20px 0",
            padding: "12px 16px",
            background: isCorrect ? "#f0fdf4" : "#fef2f2",
            borderRadius: 8,
            borderLeft: `3px solid ${isCorrect ? "#16a34a" : "#dc2626"}`,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#444",
              lineHeight: 1.6,
              margin: 0,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            <strong style={{ color: isCorrect ? "#16a34a" : "#dc2626" }}>
              {isCorrect ? "Correct. " : "Not quite. "}
            </strong>
            {explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
        }}
      >
        {!revealed ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            style={{
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-geist-mono), monospace",
              color: selected !== null ? "#fff" : "#ccc",
              background: selected !== null ? "#0070f3" : "rgba(0,0,0,0.05)",
              border: "none",
              borderRadius: 6,
              cursor: selected !== null ? "pointer" : "not-allowed",
              transition: "all 0.15s",
            }}
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-geist-mono), monospace",
              color: "#666",
              background: "rgba(0,0,0,0.05)",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
