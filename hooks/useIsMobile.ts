"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handle = () => setIsMobile(mql.matches);
    handle();
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  return isMobile;
}
