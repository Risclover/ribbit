import { useEffect, useState, useCallback } from "react";

export const useIsClickOut = (setter) => {
  const [ele, setEle] = useState(null);
  const eleCallback = useCallback((node) => {
    setEle(node);
  }, []);

  useEffect(() => {
    if (ele === null) return;

    const handleClick = (e) => {
      if (ele.contains(e.target)) return;
      setter(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ele]);

  return [eleCallback];
};
