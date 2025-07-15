import { useEffect, useState } from "react";

/** Narrow navigator when UA-CH is present */
type NavigatorWithUAData = Navigator & {
  userAgentData?: { mobile?: boolean };
};

/**
 * Detects a “mobile context”:
 *   • real mobile device  …… (hover:none && pointer:coarse) **or** UA-CH hint
 *   • small viewport size …… `max-width ≤ breakpoint`
 *
 * @param breakpoint – width in px that counts as “mobile sized” (default 768)
 */
export function useIsMobile(breakpoint = 768): boolean {
  /* ---------- initial guess ---------- */

  const nav = navigator as NavigatorWithUAData;

  const mobileUA =
    !!nav.userAgentData?.mobile ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(nav.userAgent);

  const smallViewport = window.innerWidth <= breakpoint;

  const [isMobile, setIsMobile] = useState(mobileUA || smallViewport);

  /* ---------- responsive updates ---------- */

  useEffect(() => {
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    const mqWidth = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = () => setIsMobile(mqTouch.matches || mqWidth.matches);

    update(); // run immediately
    mqTouch.addEventListener("change", update);
    mqWidth.addEventListener("change", update);

    return () => {
      mqTouch.removeEventListener("change", update);
      mqWidth.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}
