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
  console.log("decorated:", decorated);
  return (
    <div className="chat-messages">
      {decorated.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
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
