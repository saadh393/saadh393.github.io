"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ProjektRevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export function ProjektReveal({ children, delay = 0, className = "" }: ProjektRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`proj-reveal ${visible ? "proj-revealed" : ""} ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
}
