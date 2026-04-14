"use client";

import { useCallback, useRef } from "react";

export function useCursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        const el = glowRef.current;
        if (!el) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        el.style.opacity = "1";
        el.style.transform = `translate(${e.clientX - rect.left - 300}px, ${e.clientY - rect.top - 300}px)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        const el = glowRef.current;
        if (el) el.style.opacity = "0";
    }, []);

    return { glowRef, onMouseMove, onMouseLeave };
}
