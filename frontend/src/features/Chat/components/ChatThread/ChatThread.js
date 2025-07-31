import React, { useRef, useState, useEffect } from "react";
import { ChatMessages } from "./ChatMessages";
import { useChatThread } from "../../hooks/useChatThread";
import moment from "moment";

export const ChatThread = ({
  messages: initial,
  socket,
  setActiveOverlay,
  setMsgIdToDelete,
  OVERLAYS,
}) => {
  const [messages, setMessages] = useState(initial);

  /* keep local copy in sync when parent replaces the array */
  useEffect(() => setMessages(initial), [initial]);
  const containerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  const { receiver, lastMsgRef } = useChatThread({
    containerRef,
    messages,
    prevScrollHeightRef,
    setMessages,
  });

  return (
    <div className="chat-thread-messages" ref={containerRef}>
      {/* Receiver info */}
      {receiver && (
        <div className="chat-thread-messages-user-info">
          <div
            className="chat-thread-messages-user-info-link"
            onClick={() =>
              window.open(
                `/users/${receiver.id}/profile`,
                "_blank",
                "noreferrer"
              )
            }
          >
            <div className="chat-thread-user-img">
              <img src={receiver.profileImg} alt="User" />
            </div>
            <div className="chat-thread-title-bar">{receiver.username}</div>
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
                {receiver.karma} karma
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <ChatMessages
        messages={messages}
        socket={socket}
        setActiveOverlay={setActiveOverlay}
        setMsgIdToDelete={setMsgIdToDelete}
        OVERLAYS={OVERLAYS}
        lastMsgRef={lastMsgRef}
      />
    </div>
  );
};
