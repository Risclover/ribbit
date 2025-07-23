import { useEffect, useCallback } from "react";

/**
 * Calls `onEscape()` whenever the **Esc** key is pressed.
 *
 * @param onEscape  callback to run on Esc
 * @param active    set to `false` to disable the listener (default `true`)
 */
export function useEscapeKey(onEscape: () => void, active = true): void {
  // stable reference — recreates only when onEscape changes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    },
    [onEscape]
  );

  useEffect((): (() => void) | void => {
    if (!active) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, active]);
}
