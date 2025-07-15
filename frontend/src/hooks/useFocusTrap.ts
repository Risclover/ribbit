import { useEffect, RefObject } from "react";

/** Trap Tab focus inside `containerRef` while `active` is true. */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement>,
  enabled = true
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container || !enabled) return;

    /* ---------- helpers ---------- */

    const getFocusable = (root: HTMLElement): HTMLElement[] => {
      const selectors = [
        "a[href]",
        "area[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "button:not([disabled])",
        "iframe, object, embed",
        '[tabindex]:not([tabindex="-1"])',
        "[contenteditable]",
      ];
      return Array.from(
        root.querySelectorAll<HTMLElement>(selectors.join(","))
      ).filter((el) => el.offsetParent !== null); // exclude hidden
    };

    /* ---------- setup ---------- */

    let focusable = getFocusable(container);
    if (focusable.length === 0) {
      container.tabIndex = 0;
      focusable = [container];
    }

    // focus the first element immediately
    focusable[0].focus();

    /* ---------- key-trap ---------- */

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      focusable = getFocusable(container);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, containerRef]);
}
