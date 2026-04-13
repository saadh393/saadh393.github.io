"use client";

import React, { useState } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
  defaultTab?: number;
}

// Individual tab panel — used as children of <Tabs>
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

// Tab container
export function Tabs({ children, defaultTab = 0 }: TabsProps) {
  const [active, setActive] = useState(defaultTab);

  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      React.isValidElement(child) && typeof (child.props as TabProps).label === "string"
  );

  if (tabs.length === 0) return null;

  const safeActive = Math.min(active, tabs.length - 1);

  return (
    <div
      style={{
        margin: "28px 0",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "#fafafa",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = i === safeActive;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "var(--font-geist-mono), monospace",
                color: isActive ? "#0070f3" : "#888",
                background: "transparent",
                border: "none",
                borderBottom: isActive
                  ? "2px solid #0070f3"
                  : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.15s, border-color 0.15s",
                letterSpacing: "-0.01em",
                flexShrink: 0,
              }}
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        style={{
          padding: "20px 24px",
          background: "#fff",
        }}
      >
        {tabs[safeActive]}
      </div>
    </div>
  );
}
