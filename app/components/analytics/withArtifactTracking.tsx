import { createElement, type ComponentType } from "react";
import { ArtifactTracker } from "./ArtifactTracker";

export function withArtifactTracking<P>(
  name: string,
  Component: ComponentType<P>
): ComponentType<P> {
  const Inner = Component as ComponentType<Record<string, unknown>>;
  function Tracked(props: P) {
    return (
      <ArtifactTracker name={name}>
        {createElement(Inner, props as Record<string, unknown>)}
      </ArtifactTracker>
    );
  }
  Tracked.displayName = `Tracked(${name})`;
  return Tracked;
}
