"use client";

import { useEffect, useRef } from "react";
import { crossedMilestones, scrollPercent } from "@/lib/analytics/milestones";
import { trackReadProgress, trackReadTime } from "@/lib/analytics/track";

interface ReadTrackerProps {
  slug: string;
}

export function ReadTracker({ slug }: ReadTrackerProps) {
  const prevPercent = useRef(0);
  const maxPercent = useRef(0);
  const activeSeconds = useRef(0);
  const lastTick = useRef<number | null>(null);

  useEffect(() => {
    const startTimer = () => {
      if (lastTick.current === null) lastTick.current = Date.now();
    };

    const stopTimer = () => {
      if (lastTick.current !== null) {
        activeSeconds.current += (Date.now() - lastTick.current) / 1000;
        lastTick.current = null;
      }
    };

    const onScroll = () => {
      const percent = scrollPercent(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      maxPercent.current = Math.max(maxPercent.current, percent);
      for (const milestone of crossedMilestones(prevPercent.current, percent)) {
        trackReadProgress(slug, milestone);
      }
      prevPercent.current = Math.max(prevPercent.current, percent);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stopTimer();
      else startTimer();
    };

    const flush = () => {
      stopTimer();
      trackReadTime(slug, Math.round(activeSeconds.current), maxPercent.current);
    };

    startTimer();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [slug]);

  return null;
}
