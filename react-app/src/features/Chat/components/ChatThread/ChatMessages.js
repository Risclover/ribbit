import React from "react";
import { ChatMessage } from "./ChatMessage";
import { formatDate } from "../../utils/formatDate";

export const ChatMessages = ({
  setShowDeleteConfirmation,
  setMsgId,
  socket,
  messages,
}) => {
  return (
    <div className="chat-messages">
      {messages.length > 0 &&
        messages?.map((message, idx) => {
          const previousMessage = messages[idx - 1];
          const currentDate = new Date(message.createdAt).setHours(0, 0, 0, 0);
          const previousDate =
            previousMessage &&
            new Date(previousMessage.createdAt).setHours(0, 0, 0, 0);
          const showDateBar = !previousMessage || currentDate != previousDate;
          const formattedDate = formatDate(message.createdAt);

          return (
            <ChatMessage
              key={message.id}
              formattedDate={formattedDate}
              showDateBar={showDateBar}
              previousMessage={previousMessage}
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
