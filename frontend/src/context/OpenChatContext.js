import React, { useContext, useState } from "react";

export const OpenChatContext = React.createContext();

export const OpenChatProvider = ({ children }) => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <OpenChatContext.Provider value={{ openChat, setOpenChat }}>
      {children}
    </OpenChatContext.Provider>
  );
};

export const useOpenChat = () => useContext(OpenChatContext);
