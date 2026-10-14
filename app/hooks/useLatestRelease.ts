"use client";

import { useEffect, useState } from "react";

import { loadLatestRelease, type ProjektRelease } from "@/lib/projektRelease";

export function useLatestRelease() {
    const [release, setRelease] = useState<ProjektRelease | null>(null);

    useEffect(() => {
        let active = true;
        loadLatestRelease()
            .then((value) => active && setRelease(value))
            .catch(() => undefined);
        return () => {
            active = false;
        };
    }, []);

    return release;
}
