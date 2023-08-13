import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import DateSeparator from "./DateSeparator";
import formatDate from "./formatDate";
import moment from "moment";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

export default function ChatMessages({
  messages,
  setDeleteOverlay,
  setMsgId,
  selectedChat,
}) {
  const containerRef = useRef(null);
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);
  const chatThreads = useSelector((state) => state.chatThreads);
  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerElement = containerRef.current;
      const isScrolledToBottom =
        containerElement.scrollHeight - containerElement.scrollTop ===
        containerElement.clientHeight;
      containerElement.scrollTop = containerElement.scrollHeight;

      // Delay scrolling to the bottom if not already at the bottom (fixes problem where doesn't scroll to bottom when sending multiple messages or when sending emoji stickers)
      if (!isScrolledToBottom) {
        setTimeout(() => {
          containerElement.scrollTop = containerElement.scrollHeight;
        }, 100);
      }
    }
  }, [messages]);

  useEffect(() => {
    // ...

    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser.id)
    );
  }, [selectedChat?.users, currentUser.id, chatThreads]);

  return (
    <div className="chat-thread-messages" ref={containerRef}>
      {/* User info space */}
      <div className="chat-thread-messages-user-info">
        <div
          className="chat-thread-messages-user-info-link"
          onClick={() =>
            window.open(
              `/users/${receiver?.id}/profile`,
              "_blank",
              "noreferrer"
            )
          }
        >
          <div className="chat-thread-user-img">
            <img src={receiver?.profile_img} alt="User" />
          </div>
          <div className="chat-thread-title-bar">{receiver?.username}</div>
        </div>
        <div className="chat-thread-user-info">
          <div className="chat-thread-username"></div>
          <div className="chat-thread-user-stats">
            <span className="chat-thread-user-stat">
              Ribbitor for{" "}
              {moment(new Date(receiver?.createdAt))
                .locale("en-cust")
                .fromNow()}
            </span>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <span className="chat-thread-user-stat">
              {receiver?.karma} karma
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length > 0 &&
          messages.map((message, idx) => {
            const previousMessage = messages[idx - 1];
            const currentDate = new Date(message.createdAt).setHours(
              0,
              0,
              0,
              0
            );
            const previousDate =
              previousMessage &&
              new Date(previousMessage.createdAt).setHours(0, 0, 0, 0);

            const showDateBar =
              !previousMessage || currentDate !== previousDate;
            const formattedDate = formatDate(message.createdAt);

            return (
              <ChatMessage
                formattedDate={formattedDate}
                showDateBar={showDateBar}
                previousMessage={previousMessage}
                message={message}
                key={idx}
                setDeleteOverlay={setDeleteOverlay}
                setMsgId={setMsgId}
                selectedChat={selectedChat}
              />
            );
          })}
      </div>
    </div>
  );
}
