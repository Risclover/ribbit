import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { DateSeparator } from "./DateSeparator";
import { ChatReactions } from "./ChatReactions";
import { useChatMessage } from "features/Chat/hooks/useChatMessage";

export const ChatMessage = ({
  formattedDate,
  previousMessage,
  showDateBar,
  message,
  setShowDeleteConfirmation,
  setMsgId,
  socket,
}) => {
  const currentUser = useSelector((state) => state.session.user);

  const {
    openReactions,
    setOpenReactions,
    msgContent,
    messageReactions,
    extractImgUrl,
    handleReactionClick,
  } = useChatMessage({ socket, message });

  return (
    <div className="chat-message-container" key={message.id}>
      {showDateBar && <DateSeparator date={formattedDate} />}
      {message.sender?.username === previousMessage?.sender?.username &&
      new Date(message.createdAt) - new Date(previousMessage.createdAt) <=
        60000 ? (
        <div className="chat-thread-message-compact">
          {msgContent !== "Message deleted by user" &&
            message.sender?.username === currentUser.username && (
              <div className="chat-message-hover-component">
                {openReactions && (
                  <ChatReactions
                    openReactions={openReactions}
                    setOpenReactions={setOpenReactions}
                    message={message}
                    socket={socket}
                    compact={true}
                  />
                )}
                <button
                  className="chat-message-reaction-btn"
                  onClick={() => setOpenReactions(!openReactions)}
                >
                  <span className="material-symbols-outlined">
                    sentiment_satisfied
                  </span>
                </button>
                <button
                  className="chat-message-delete-btn"
                  onClick={() => {
                    setShowDeleteConfirmation(true);
                    setMsgId(message.id);
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            )}
          <div className="chat-thread-message-compact-time">
            {new Date(message.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
          {msgContent === "Message deleted by user" ? (
            <span className="fake-deleted-msg">{msgContent}</span>
          ) : (
            typeof msgContent === "string" && parse(msgContent)
          )}
          <div className="message-reactions">
            {messageReactions.map((reactionData) => (
              <div key={reactionData.reactionType} className="reaction-item">
                <img
                  src={`/images/frog-reactions/${extractImgUrl(
                    reactionData.reactionType
                  )}`}
                  alt={reactionData.reactionType}
                  className="reaction-image"
                />
                {reactionData.count >= 1 && (
                  <span className="reaction-count">
                    {reactionData.count > 2 ? "2+" : reactionData.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-thread-message">
          {openReactions && (
            <ChatReactions
              openReactions={openReactions}
              setOpenReactions={setOpenReactions}
              message={message}
              socket={socket}
            />
          )}
          {msgContent !== "Message deleted by user" && (
            <div
              className={`${
                openReactions
                  ? "chat-message-hover-component-open"
                  : "chat-message-hover-component"
              }`}
            >
              <button
                className="chat-message-reaction-btn"
                onClick={() => setOpenReactions(true)}
              >
                <span className="material-symbols-outlined">
                  sentiment_satisfied
                </span>
              </button>
              <button
                className="chat-message-delete-btn"
                onClick={() => {
                  setShowDeleteConfirmation(true);
                }}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          )}
          <div className="chat-thread-message-user-img">
            {message.sender?.id !== currentUser?.id ? (
              <img
                className="pointer"
                onClick={() =>
                  window.open(
                    `/users/${message.sender?.id}/profile`,
                    "_blank",
                    "noreferrer"
                  )
                }
                src={message.sender?.profileImg}
                alt="User Avatar"
              />
            ) : (
              <img src={message.sender?.profileImg} alt="User Avatar" />
            )}
          </div>
          <div className="chat-thread-message-main">
            <div className="chat-thread-message-author">
              {message.sender?.id === currentUser?.id ? (
                <span className="chat-thread-author">
                  {message.content === "Message deleted by user"
                    ? "Removed"
                    : message.sender?.username}{" "}
                </span>
              ) : (
                <span
                  onClick={() =>
                    window.open(
                      `/users/${message.sender?.id}/profile`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                  className="chat-thread-author pointer"
                >
                  {message.content === "Message deleted by user"
                    ? "Removed"
                    : message.sender?.username}
                </span>
              )}
              <span className="chat-thread-time">
                {new Date(message.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
            {msgContent === "Message deleted by user" ? (
              <span className="fake-deleted-msg">{msgContent}</span>
            ) : (
              typeof msgContent === "string" && parse(msgContent)
            )}
            <div className="message-reactions">
              {messageReactions.map((reactionData) => (
                <div key={reactionData.reactionType} className="reaction-item">
                  <img
                    onClick={() => handleReactionClick(reactionData)}
                    src={`/images/frog-reactions/${extractImgUrl(
                      reactionData.reactionType
                    )}`}
                    alt={reactionData.reactionType}
                    className="reaction-image"
                  />
                  {reactionData.count >= 1 && (
                    <span className="reaction-count">
                      {reactionData.count > 2 ? "2+" : reactionData.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
