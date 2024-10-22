import React, { useContext, useState } from "react";

export const SelectedChatContext = React.createContext();

export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [pendingReceiver, setPendingReceiver] = useState(null);

  return (
    <SelectedChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        pendingReceiver,
        setPendingReceiver,
      }}
    >
      {children}
    </SelectedChatContext.Provider>
  );
};

export const useSelectedChat = () => useContext(SelectedChatContext);
