import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useLeaveLogin(onLeave) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const oldPath = prevPathRef.current;
    const newPath = location.pathname;

    // If we were previously on /login, and now we're on something else,
    // call the callback
    if (oldPath === "/login" && newPath !== "/login") {
      onLeave?.();
    }

    // Update the ref to the new path for next time
    prevPathRef.current = newPath;
  }, [location, onLeave]);
}
