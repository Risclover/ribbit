// src/hooks/useFocusTrap.js

import { useEffect } from "react";

export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      '[tabindex="0"]',
      "[contenteditable]",
    ];

    const focusableElements = containerRef.current.querySelectorAll(
      focusableSelectors.join(",")
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element when the trap is activated
    if (firstElement) {
      firstElement.focus();
    }

    function handleKeyDown(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    function handleFocus(e) {
      if (!containerRef.current.contains(e.target)) {
        e.stopPropagation();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focus", handleFocus, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [active, containerRef]);
}
