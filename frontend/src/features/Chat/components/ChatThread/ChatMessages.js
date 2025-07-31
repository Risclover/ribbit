import React from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatMessages } from "../../hooks/useChatMessages";

export const ChatMessages = ({
  messages,
  socket,
  setActiveOverlay,
  setMsgIdToDelete,
  OVERLAYS,
  lastMsgRef,
}) => {
  const decorated = useChatMessages({ messages });

  return (
    <div className="chat-messages">
      {decorated.map((message, i) => (
        <ChatMessage
          key={message.id}
          ref={i === decorated.length - 1 ? lastMsgRef : undefined}
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
