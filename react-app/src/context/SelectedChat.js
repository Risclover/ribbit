import React, { useContext, useState } from "react";

export const SelectedChatContext = React.createContext();

export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({
    id: null,
    content: null,
    read: null,
    sender: null,
    receiver: null,
    reactions: null,
    threadId: null,
    createdAt: null,
  });
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
