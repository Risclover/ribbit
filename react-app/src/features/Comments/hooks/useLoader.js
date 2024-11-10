import { useEffect, useState } from "react";

export const useLoader = (delay = 1000) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    }; 
  }, [delay]);

  return showLoader;
};
