import React from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatMessages } from "../../hooks/useChatMessages";

export const ChatMessages = ({
  messages,
  socket,
  setActiveOverlay,
  setMsgIdToDelete,
  OVERLAYS,
}) => {
  const decorated = useChatMessages({ messages });

  return (
    <div className="chat-messages">
      {decorated.map((message) => (
        <ChatMessage
          key={message.id}
          {...message}
          socket={socket}
          setActiveOverlay={setActiveOverlay}
          setMsgIdToDelete={setMsgIdToDelete}
          OVERLAYS={OVERLAYS}
        />
      ))}
    </div>
  );
};
