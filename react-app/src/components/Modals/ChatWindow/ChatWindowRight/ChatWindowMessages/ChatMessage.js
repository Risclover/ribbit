import React, { useEffect, useState } from "react";
import DateSeparator from "./DateSeparator";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

export default function ChatMessage({
  formattedDate,
  previousMessage,
  showDateBar,
  message,
  setDeleteOverlay,
  setMsgId,
}) {
  const [msgContent, setMsgContent] = useState();

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
    } else {
      setMsgContent(message.content);
    }
  }, [message]);

  return (
    <div className="chat-message-container" key={message.id}>
      {showDateBar && <DateSeparator date={formattedDate} />}
      {message.sender?.username === previousMessage?.sender?.username &&
      new Date(message.createdAt) - new Date(previousMessage.createdAt) <=
        60000 ? (
        <div className="chat-thread-message-compact">
          {msgContent !== "[Message deleted]" && (
            <div className="chat-message-hover-component">
              {message.sender?.username === currentUser.username && (
                <button
                  className="chat-message-delete-btn"
                  onClick={() => {
                    setDeleteOverlay(true);
                    setMsgId(message.id);
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              )}
              {message.sender?.username !== currentUser.username && (
                <button className="chat-message-delete-btn">
                  <i className="bi bi-flag"></i>
                </button>
              )}
            </div>
          )}
          <div className="chat-thread-message-compact-time">
            {new Date(message.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
          {msgContent === "[Message deleted]" ? (
            <span className="fake-deleted-msg">{msgContent}</span>
          ) : (
            typeof msgContent === "string" && parse(msgContent)
          )}
        </div>
      ) : (
        <div className="chat-thread-message">
          {msgContent !== "[Message deleted]" && (
            <div className="chat-message-hover-component">
              {message.sender?.username === currentUser.username && (
                <button
                  className="chat-message-delete-btn"
                  onClick={() => {
                    setDeleteOverlay(true);
                    setMsgId(message.id);
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              )}
              {message.sender?.username !== currentUser.username && (
                <button className="chat-message-delete-btn">
                  <i className="bi bi-flag"></i>
                </button>
              )}
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
                  {message.sender?.username}{" "}
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
                  {message.sender?.username}{" "}
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
            {msgContent === "[Message deleted]" ? (
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
