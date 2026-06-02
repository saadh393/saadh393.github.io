"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { slugFromPath, trackArtifactInteract, trackArtifactView } from "@/lib/analytics/track";

interface ArtifactTrackerProps {
  name: string;
  children: ReactNode;
}

export function ArtifactTracker({ name, children }: ArtifactTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewed = useRef(false);
  const interacted = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const slug = slugFromPath(window.location.pathname);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewed.current) {
            viewed.current = true;
            trackArtifactView(slug, name);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    const onInteract = () => {
      if (interacted.current) return;
      interacted.current = true;
      trackArtifactInteract(slug, name);
    };
    node.addEventListener("pointerdown", onInteract);
    node.addEventListener("change", onInteract);

    return () => {
      observer.disconnect();
      node.removeEventListener("pointerdown", onInteract);
      node.removeEventListener("change", onInteract);
    };
  }, [name]);

  return <div ref={ref}>{children}</div>;
}
