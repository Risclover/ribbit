import React, { useContext } from "react";
import { ChatNavBtn } from "./ChatNavBtn";
import { useSortedChatThreads } from "../../hooks";
import { SelectedChatContext } from "@/context";

export function ChatNavMenu({ setActiveOverlay, OVERLAYS }) {
  const sortedChatThreads = useSortedChatThreads();
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  return (
    <div className="chat-window-chatnav-container">
      {sortedChatThreads.map((chatThread) => (
        <ChatNavBtn
          key={chatThread.id}
          chatThread={chatThread}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setActiveOverlay={setActiveOverlay}
          OVERLAYS={OVERLAYS}
        />
      ))}
    </div>
  );
}
