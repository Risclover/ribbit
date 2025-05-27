import { useEffect } from "react";

export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    let focusable = getFocusable(container);
    if (focusable.length === 0) {
      container.tabIndex = 0;
      focusable = [container];
    }

    // Focus the first
    focusable[0].focus();

    // Keydown handler for Tab
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      focusable = getFocusable(container);
      if (!focusable.length) return;

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
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, containerRef]);
}

function getFocusable(container) {
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
  return Array.from(container.querySelectorAll(selectors.join(",")));
}
