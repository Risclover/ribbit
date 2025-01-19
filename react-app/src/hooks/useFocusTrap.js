import { useEffect } from "react";

export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Define a helper function to query the latest focusable elements.
    const getFocusableElements = () => {
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
        '[tabindex]:not([tabindex="-1"])',
        "[contenteditable]",
      ];
      return Array.from(
        containerRef.current.querySelectorAll(focusableSelectors.join(","))
      );
    };

    // Function to update focusable elements.
    let focusableElements = getFocusableElements();
    // If there are no focusable elements, let the container become focusable.
    if (focusableElements.length === 0) {
      containerRef.current.tabIndex = 0;
      focusableElements = [containerRef.current];
    } else {
      containerRef.current.removeAttribute("tabindex");
    }

    // Get the first and last focusable elements.
    let firstElement = focusableElements[0];
    let lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element upon activation.
    if (firstElement) {
      firstElement.focus();
    }

    // Keydown handler to trap focus inside the container.
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      // Update focusable elements on every Tab key press.
      focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        containerRef.current.focus();
        return;
      }
      firstElement = focusableElements[0];
      lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: if we're at the first element, wrap to the last.
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if we're at the last element, wrap back to the first.
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // When focus moves outside the container, redirect it to the first element.
    const handleFocus = (e) => {
      if (!containerRef.current.contains(e.target)) {
        e.stopPropagation();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focus", handleFocus, true);

    // Use a MutationObserver to update our list when the DOM changes.
    const observer = new MutationObserver(() => {
      focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        containerRef.current.tabIndex = 0;
        focusableElements = [containerRef.current];
      } else {
        containerRef.current.removeAttribute("tabindex");
      }
      firstElement = focusableElements[0];
      lastElement = focusableElements[focusableElements.length - 1];
    });

    observer.observe(containerRef.current, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focus", handleFocus, true);
      observer.disconnect();
    };
  }, [active, containerRef]);
}
