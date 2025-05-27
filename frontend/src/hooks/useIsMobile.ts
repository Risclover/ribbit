import { useEffect, useState } from "react";

/**
 * Detects a “mobile context”:
 *   • real mobile device  …… (hover:none && pointer:coarse)  OR UA hint
 *   • small viewport size …… max-width ≤ breakpoint
 *
 * @param breakpoint – width in px that counts as “mobile sized”
 */
export function useIsMobile(breakpoint = 768) {
  // ---------- initial guess ----------
  const mobileUA =
    !!navigator.userAgentData?.mobile ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const smallViewport = window.innerWidth <= breakpoint;

  const [isMobile, setIsMobile] = useState(mobileUA || smallViewport);

  useEffect(() => {
    const mqTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    const mqWidth = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = () => setIsMobile(mqTouch.matches || mqWidth.matches);

    // run once & subscribe
    update();
    mqTouch.addEventListener("change", update);
    mqWidth.addEventListener("change", update);

    return () => {
      mqTouch.removeEventListener("change", update);
      mqWidth.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}
