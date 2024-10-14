"use client";
import React, { useEffect, useRef } from "react";

export default function Cursor() {
  const cursor = useRef(null);
  useEffect(() => {
    if (cursor.current) {
      document.addEventListener("mousemove", (e) => {
        let shouldScale = false;

        const titleRect = document?.getElementById("title")?.getBoundingClientRect() || null;
        if (
          titleRect &&
          e.pageX > titleRect.left &&
          e.pageX < titleRect.right &&
          e.pageY > titleRect.top &&
          e.pageY < titleRect.bottom
        ) {
          shouldScale = true;
        }

        cursor?.current?.setAttribute(
          "style",
          `top: ${e.pageY}px; left: ${e.pageX}px; transform : scale(${shouldScale ? 5 : 1})`
        );
      });
    }

    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, [cursor]);
  return (
    <div
      ref={cursor}
      id="cursor"
      className="bg-primary w-6 h-6 mix-blend-difference rounded-full absolute  transition-transform duration-[150ms]"
    ></div>
  );
}
