"use client";

import { useEffect, useState } from "react";

const ROLES = [
    "Frontend Engineer",
    "React Specialist",
    "Next.js Developer",
    "JavaScript Engineer",
];

export function useRoleCycle() {
    const [roleIdx, setRoleIdx] = useState(0);
    const [phase, setPhase] = useState<"in" | "out">("in");

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase("out");
            setTimeout(() => {
                setRoleIdx((i) => (i + 1) % ROLES.length);
                setPhase("in");
            }, 300);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return { roleIdx, phase, roles: ROLES };
}
