import React, { useRef } from "react";
import moment from "moment";
import { ChatMessages } from "./ChatMessages";
import { useChatThread } from "../../hooks/useChatThread";

export const ChatThread = ({
  setShowDeleteConfirmation,
  setMsgId,
  socket,
  messages,
  setMessages,
}) => {
  const containerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  const { receiver } = useChatThread({
    containerRef,
    messages,
    setMessages,
    prevScrollHeightRef,
  });
  return (
    <div className="chat-thread-messages" ref={containerRef}>
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
            <img src={receiver?.profileImg} alt="User" />
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
      <ChatMessages
        setShowDeleteConfirmation={setShowDeleteConfirmation}
        messages={messages}
        setMsgId={setMsgId}
        socket={socket}
      />
      <div ref={containerRef}></div>
    </div>
  );
};
