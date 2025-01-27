import React from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatMessages } from "../../hooks/useChatMessages";

export const ChatMessages = ({
  setShowDeleteConfirmation,
  setMsgId,
  socket,
  messages,
}) => {
  const decorated = useChatMessages({ messages });

  return (
    <div className="chat-messages">
      {messages.length > 0 &&
        decorated?.map((message) => {
          return (
            <ChatMessage
              key={message.id}
              formattedDate={message.formattedDate}
              showDateBar={message.showDateBar}
              previousMessage={message.previousMessage}
              message={message}
              setShowDeleteConfirmation={setShowDeleteConfirmation}
              setMsgId={setMsgId}
              socket={socket}
            />
          );
        })}
    </div>
  );
};
