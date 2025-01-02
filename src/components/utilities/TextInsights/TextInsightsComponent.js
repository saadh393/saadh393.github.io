"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import TextStats from "./TextStats";
import SelectionPopup from "./SelectionPopup";
import { calculateTextStats } from "./textUtils";

export default function TextInsightsComponent() {
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    length: 0,
    lines: 0,
    numbers: 0,
    capitalLetters: 0,
    bytes: 0,
  });
  const [selection, setSelection] = useState({
    length: 0,
    show: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setStats(calculateTextStats(text));
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.innerText);
  };

  const handleTextSelection = useCallback((e) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    // Only show popup if selection is within the editor
    if (selectedText && editorRef.current?.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      setSelection({
        length: selectedText.length,
        show: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 40,
      });
    } else {
      setSelection((prev) => ({ ...prev, show: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleTextSelection);
    return () => {
      document.removeEventListener("selectionchange", handleTextSelection);
    };
  }, [handleTextSelection]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          id="editable-content"
          onInput={handleTextChange}
          className="text-insights-area min-h-[16rem] w-full bg-[#171919] border border-trinary rounded-lg p-4 text-white font-mono focus:border-primary focus:ring-1 focus:ring-primary/10 focus:outline-none transition-colors whitespace-pre-wrap"
          placeholder="Enter or paste your text here..."
        />

        <SelectionPopup selection={selection} />
      </div>

      <TextStats stats={stats} />
    </div>
  );
}
