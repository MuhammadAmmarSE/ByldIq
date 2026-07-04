"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  /** Past a small threshold — used to switch the navbar from transparent to a solid/glass background. */
  scrolled: boolean;
  direction: "up" | "down";
}

const SCROLL_THRESHOLD = 8;

/**
 * Drives the scroll-aware navbar behavior in CLAUDE.md Part 6: "Scrolling
 * down -> reduce visual weight. Scrolling up -> become more prominent."
 */
export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, direction: "up" });
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      setState({
        scrolled: currentScrollY > SCROLL_THRESHOLD,
        direction: currentScrollY > lastScrollY.current ? "down" : "up",
      });
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}
