"use client";

import { useEffect, useRef, useState } from "react";

import { useCursorGlow } from "../hooks/useCursorGlow";
import { useRoleCycle } from "../hooks/useRoleCycle";
import { HeroAvatar } from "./HeroAvatar";
import { HeroBadge } from "./HeroBadge";
import { HeroBio } from "./HeroBio";
import { HeroCTAs } from "./HeroCTAs";
import { HeroHandle } from "./HeroHandle";
import { HeroRoleCycler } from "./HeroRoleCycler";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { HeroStatStrip } from "./HeroStatStrip";
import { HeroTechTicker } from "./HeroTechTicker";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [entered, setEntered] = useState(false);
    const { glowRef, onMouseMove, onMouseLeave } = useCursorGlow();
    const { roleIdx, phase, roles } = useRoleCycle();

    useEffect(() => {
        const t = setTimeout(() => setEntered(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="hero-section h-full"
            style={{
                position: "relative",
                background: "#fff",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Cursor glow */}
            <div
                ref={glowRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(0,112,243,0.045) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    willChange: "transform",
                }}
            />

            {/* Subtle dot grid */}
            <div className="hero-grid-bg" aria-hidden="true" />

            {/* Main centered content */}
            <div className="hero-centered-content">
                <HeroAvatar entered={entered} />
                <HeroBadge entered={entered} />
                <HeroHandle entered={entered} />

                <h1
                    className={`hero-reveal hero-name-centered ${entered ? "hero-revealed" : ""}`}
                    style={{ transitionDelay: "0.12s" }}
                >
                    Saad Hasan
                </h1>

                <HeroRoleCycler
                    roleIdx={roleIdx}
                    phase={phase}
                    roles={roles}
                    entered={entered}
                />

                <HeroBio entered={entered} />
                <HeroCTAs entered={entered} />
                <HeroSocialLinks entered={entered} />
                <HeroStatStrip entered={entered} />
            </div>

            <HeroTechTicker entered={entered} />
        </section>
    );
}
