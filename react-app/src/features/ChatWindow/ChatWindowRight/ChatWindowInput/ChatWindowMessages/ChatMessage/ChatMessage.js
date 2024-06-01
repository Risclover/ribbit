import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { DateSeparator, ReactionsMenuSmall } from "../../ChatWindowMessages";
import "./ChatMessage.css";

export function ChatMessage({
  formattedDate,
  previousMessage,
  showDateBar,
  message,
  setDeleteOverlay,
  setMsgId,
  selectedReaction,
  setSelectedReaction,
}) {
  const [msgContent, setMsgContent] = useState();
  const [openReactions, setOpenReactions] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (
      typeof message.content === "string" &&
      message.content.slice(-4) === ".png"
    ) {
      setMsgContent(
        `<div className="emoji-container">
          <img src=${message.content} className="emoji" />
        </div>`
      );
    } else if (
      typeof message.content === "string" &&
      message.content.includes("giphy")
    ) {
      setMsgContent(
        `<div className="msg-gif">
          <img src=${message.content} />
        </div>`
      );
    } else {
      setMsgContent(message.content);
    }
  }, []);

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
                  <ReactionsMenuSmall
                    message={message}
                    selectedReaction={selectedReaction}
                    setSelectedReaction={setSelectedReaction}
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
                    setDeleteOverlay(true);
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
        </div>
      ) : (
        <div className="chat-thread-message">
          {msgContent !== "Message deleted by user" &&
            message.sender?.username === currentUser.username && (
              <div
                className={`${
                  openReactions
                    ? "chat-message-hover-component-open"
                    : "chat-message-hover-component"
                }`}
              >
                {openReactions && <ReactionsMenu />}
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
                    setDeleteOverlay(true);
                    setMsgId(message.id);
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            )}
          <div className="chat-thread-message-user-img">
            {message.sender?.id !== currentUser.id ? (
              <img
                className="pointer"
                onClick={() =>
                  window.open(
                    `/users/${message.sender?.id}/profile`,
                    "_blank",
                    "noreferrer"
                  )
                }
                src={message.sender?.profile_img}
                alt="User Avatar"
              />
            ) : (
              <img src={message.sender?.profile_img} alt="User Avatar" />
            )}
          </div>
          <div className="chat-thread-message-main">
            <div className="chat-thread-message-author">
              {message.sender?.id === currentUser.id ? (
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
          </div>
        </div>
      )}
    </div>
  );
}
