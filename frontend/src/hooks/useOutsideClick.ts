// hooks/useOutsideClick.js
import { useEffect, useRef } from "react";

export function useOutsideClick(ref, handler, active = true) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return; // don’t attach on large screens

    function listener(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        savedHandler.current(e);
      }
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, active]);
}
