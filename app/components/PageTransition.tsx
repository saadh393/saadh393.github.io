"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setVisible(false);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      prevPath.current = pathname;
      return () => cancelAnimationFrame(t);
    }
  }, [pathname]);

  // On first mount
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    prevPath.current = pathname;
    return () => cancelAnimationFrame(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}
    >
      {children}
    </div>
  );
}
