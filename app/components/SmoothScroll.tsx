"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const SCROLL_KEY = (path: string) => `scroll_pos:${path}`;

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPopState = useRef(false);
  const pathname = usePathname();

  // Create Lenis once on mount
  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    }

    // Mark back/forward navigations so route-change effect can restore position
    function onPopState() {
      isPopState.current = true;
    }

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", onPopState);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Persist scroll position on every scroll tick
  useEffect(() => {
    function savePosition() {
      sessionStorage.setItem(SCROLL_KEY(pathname), String(window.scrollY));
    }
    window.addEventListener("scroll", savePosition, { passive: true });
    return () => window.removeEventListener("scroll", savePosition);
  }, [pathname]);

  // On route change: restore saved position (back/forward) or scroll to top (forward nav)
  useEffect(() => {
    const wasPopState = isPopState.current;
    isPopState.current = false;

    if (wasPopState) {
      const saved = sessionStorage.getItem(SCROLL_KEY(pathname));
      const y = saved ? parseInt(saved, 10) : 0;
      // Double rAF — wait for new page content to paint before restoring
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, y);
          lenisRef.current?.scrollTo(y, { immediate: true });
        });
      });
    } else {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
