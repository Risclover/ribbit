import React, { createContext, useContext, useState } from "react";

export const SkipLocationContext = createContext();

export const SkipLocationProvider = ({ children }) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <SkipLocationContext.Provider value={{ showLinks, setShowLinks }}>
      {children}
    </SkipLocationContext.Provider>
  );
};

export const useSkipLocation = () => useContext(SkipLocationContext);
