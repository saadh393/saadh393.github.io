import { sendGAEvent } from "@next/third-parties/google";

export function slugFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function trackReadProgress(slug: string, percent: number): void {
  sendGAEvent("event", "read_progress", { slug, percent });
}

export function trackReadTime(slug: string, seconds: number, percent: number): void {
  sendGAEvent("event", "read_time", { slug, seconds, percent });
}

export function trackArtifactView(slug: string, component: string): void {
  sendGAEvent("event", "artifact_view", { slug, component });
}

export function trackArtifactInteract(slug: string, component: string): void {
  sendGAEvent("event", "artifact_interact", { slug, component });
}
