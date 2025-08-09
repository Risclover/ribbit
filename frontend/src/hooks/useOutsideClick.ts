// hooks/useOutsideClick.js
import { useEffect, useRef } from "react";

export function useOutsideClick(ref, handler, active = true, ignore = []) {
  const savedHandler = useRef(handler);

  // Keep latest handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;

    // Normalize ignore items (accept refs or raw elements)
    const getEl = (x) => (x && (x.current || x)) || null;
    const ignoredEls = (Array.isArray(ignore) ? ignore : [ignore])
      .map(getEl)
      .filter(Boolean);

    const isIn = (el, e) => {
      if (!el) return false;
      const path = e.composedPath ? e.composedPath() : undefined;
      return path ? path.includes(el) : el.contains(e.target);
    };

    const listener = (e) => {
      const root = ref.current;
      if (!root) return;

      // 1) Ignore clicks on any element marked with data-outside-ignore
      const ignoredByAttr =
        e.target &&
        typeof e.target.closest === "function" &&
        e.target.closest("[data-outside-ignore]");
      if (ignoredByAttr) return;

      // 2) Ignore clicks inside any explicitly ignored element/ref
      const hitIgnored = ignoredEls.some((el) => isIn(el, e));
      if (hitIgnored) return;

      // 3) Fire handler only if the click is outside the target
      if (!isIn(root, e)) {
        savedHandler.current(e);
      }
    };

    // pointerdown covers mouse + touch and fires before click
    document.addEventListener("pointerdown", listener, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", listener, { capture: true });
    };
  }, [ref, active, ignore]);
}
