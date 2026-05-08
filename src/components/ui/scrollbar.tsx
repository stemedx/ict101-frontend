"use client";

import { useEffect, useState, useRef } from "react";

// Global variables to control proportions
const TRACK_HEIGHT_RATIO = 0.2;
const THUMB_HEIGHT_RATIO = 0.2;

type BarStyle = { height: number; top: number };

interface CustomScrollbarProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CustomScrollbar({ containerRef }: CustomScrollbarProps = {}) {
  const [barStyle, setBarStyle] = useState<BarStyle>({ height: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const getScrollInfo = () => {
      if (containerRef?.current) {
        const el = containerRef.current;
        return { scrollY: el.scrollTop, scrollHeight: el.scrollHeight, viewport: el.clientHeight };
      }
      return {
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        viewport: window.innerHeight,
      };
    };

    const updateScrollbar = () => {
      const { scrollY, scrollHeight, viewport } = getScrollInfo();

      const trackHeight = viewport * TRACK_HEIGHT_RATIO;
      const thumbHeight = trackHeight * THUMB_HEIGHT_RATIO;
      const scrollable = Math.max(0, scrollHeight - viewport);
      const scrollPct = scrollable > 0 ? Math.max(0, scrollY) / scrollable : 0;
      const thumbTop = scrollPct * (trackHeight - thumbHeight);

      setBarStyle({ height: thumbHeight, top: thumbTop });
      setIsVisible(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIsVisible(false), 5000);
    };

    const target: EventTarget = containerRef?.current ?? window;
    target.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    return () => {
      target.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [containerRef]);

  const [trackHeight, setTrackHeight] = useState(200);

  useEffect(() => {
    const updateTrackHeight = () => {
      const viewport = containerRef?.current?.clientHeight ?? window.innerHeight;
      setTrackHeight(viewport * TRACK_HEIGHT_RATIO);
    };

    updateTrackHeight();
    window.addEventListener("resize", updateTrackHeight);
    return () => window.removeEventListener("resize", updateTrackHeight);
  }, [containerRef]);

  return (
    <div
      aria-hidden
      className="fixed w-[6px] right-4 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 bg-gray-400/30 rounded-full pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        height: `${trackHeight}px`,
      }}
    >
      <div
        className="w-full rounded-full transition-transform duration-100 ease-out bg-gray-600"
        style={{
          height: `${barStyle.height}px`,
          transform: `translateY(${barStyle.top}px)`,
        }}
      />
    </div>
  );
}
