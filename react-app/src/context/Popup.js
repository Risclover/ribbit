import React, { createContext, useContext, useState } from "react";

// Create a context
const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the Popup context
export const usePopup = () => useContext(PopupContext);
