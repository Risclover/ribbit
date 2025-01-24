import React, { useContext, useEffect, useState } from "react";
import { DateSeparator } from "./DateSeparator";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import ChatReactions, {
  ChatReactionsSmall,
  ChatReactionsFull,
} from "./ChatReactions";
import {
  createReaction,
  deleteReaction,
  fetchReactionsForMessage,
} from "store/reactions";
import { SelectedChatContext } from "context";

export const ChatMessage = ({
  formattedDate,
  previousMessage,
  showDateBar,
  message,
  setShowDeleteConfirmation,
  setMsgId,
  socket,
}) => {
  const dispatch = useDispatch();
  const [openReactions, setOpenReactions] = useState(false);
  const [msgContent, setMsgContent] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const msgReactions = useSelector((state) => state.reactions);
  const { selectedChat } = useContext(SelectedChatContext);

  // Ensure message and message.id are defined
  if (!message || !message.id) {
    return null;
  }

  useEffect(() => {
    dispatch(fetchReactionsForMessage(message.id));
  }, [dispatch, message.id]);

  const messageReactions = msgReactions[message.id] || [];

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
  }, [message.content]);

  const extractImgUrl = (url) => {
    const parts = url.split("/");
    const filenameWithHash = parts[parts.length - 1];

    const firstChar = filenameWithHash.charAt(0);

    const newFilename = firstChar + ".gif";

    console.log("newFilename:", newFilename);

    return newFilename;
  };

  const handleReactionClick = (reactionData) => {
    const hasReacted = reactionData.users.includes(currentUser?.id);
    const payload = {
      messageId: message.id,
      reactionType: reactionData.reactionType,
      room: selectedChat.id,
    };

    if (hasReacted) {
      socket.emit("remove_reaction", payload);
    } else {
      socket.emit("add_reaction", payload);
    }
  };

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
