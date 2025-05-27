import { useEffect } from "react";

export const useScrollLock = (show) => {
  useEffect(() => {
    if (show) {
      // Save current overflow setting
      const originalOverflow = document.body.style.overflow;

      // Lock scroll
      document.body.style.overflow = "hidden";

      // Re-enable scroll on cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    // If shouldLock is false, do nothing special
    // (the effect still cleans up if previously locked)
  }, [show]);
};
//
