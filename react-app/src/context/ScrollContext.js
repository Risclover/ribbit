// ScrollContext.js
import React, { createContext, useRef } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ targetRef, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;
