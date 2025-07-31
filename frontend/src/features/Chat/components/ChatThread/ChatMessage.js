import React, { useRef } from "react";
import { useAppSelector } from "@/store";
import parse from "html-react-parser";
import { DateSeparator } from "./DateSeparator";
import { ChatReactions } from "./ChatReactions";
import { useChatMessage } from "../../hooks/useChatMessage";

export const ChatMessage = React.forwardRef(
  (
    {
      id,
      sender,
      showDateBar,
      formattedDate,
      socket,
      content,
      message,
      createdAt,
      previousMessage,
      setActiveOverlay,
      setMsgIdToDelete,
      OVERLAYS,
    },
    ref
  ) => {
    const wrapperRef = useRef(null);
    const currentUser = useAppSelector((state) => state.session.user);
    const {
      openReactions,
      setOpenReactions,
      msgContent,
      messageReactions,
      extractImgUrl,
      handleReactionClick,
    } = useChatMessage({ socket, messageId: id, content });

    const handleDelete = () => {
      if (sender?.id !== currentUser?.id) return;
      setMsgIdToDelete(id);
      setActiveOverlay(OVERLAYS.DELETE);
    };

    // Quick check if user repeated + short time window => “compact”
    const isCompact =
      sender?.username === previousMessage?.sender?.username &&
      new Date(createdAt) - new Date(previousMessage?.createdAt) <= 60000;

    return (
      <div ref={ref} className="chat-message-container" key={id}>
        {showDateBar && <DateSeparator date={formattedDate} />}

        {isCompact ? (
          <div className="chat-thread-message-compact">
            {/* Reaction / Delete for message owner */}
            {sender?.id === currentUser?.id &&
              msgContent !== "Message deleted by user" && (
                <div className="chat-message-hover-component">
                  {openReactions && (
                    <ChatReactions
                      wrapperRef={wrapperRef}
                      openReactions={openReactions}
                      setOpenReactions={setOpenReactions}
                      messageId={id}
                      socket={socket}
                      message={message}
                      compact
                    />
                  )}
                  <button
                    className="chat-message-reaction-btn"
                    onClick={() => setOpenReactions((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined">
                      sentiment_satisfied
                    </span>
                  </button>
                  <button
                    className="chat-message-delete-btn"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              )}

            <div className="chat-thread-message-compact-time">
              {new Date(createdAt).toLocaleString("en-US", {
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

            {/* Reactions */}
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
        ) : (
          <div className="chat-thread-message">
            {/* Reaction overlay */}

            {/* Hover actions */}
            {msgContent !== "Message deleted by user" && (
              <div
                className={
                  openReactions
                    ? "chat-message-hover-component-open"
                    : "chat-message-hover-component"
                }
              >
                {openReactions && (
                  <ChatReactions
                    openReactions={openReactions}
                    setOpenReactions={setOpenReactions}
                    messageId={id}
                    socket={socket}
                    message={message}
                    wrapperRef={wrapperRef}
                  />
                )}
                <button
                  className="chat-message-reaction-btn"
                  onClick={() => setOpenReactions((prev) => !prev)}
                >
                  <span className="material-symbols-outlined">
                    sentiment_satisfied
                  </span>
                </button>
                {sender?.id === currentUser?.id && (
                  <button
                    className="chat-message-delete-btn"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                )}
              </div>
            )}

            {/* User avatar */}
            <div className="chat-thread-message-user-img">
              {sender?.id !== currentUser?.id ? (
                <img
                  className="pointer"
                  onClick={() =>
                    window.open(
                      `/users/${sender?.id}/profile`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                  src={sender?.profileImg}
                  alt="User Avatar"
                />
              ) : (
                <img src={sender?.profileImg} alt="User Avatar" />
              )}
            </div>

            <div className="chat-thread-message-main">
              <div className="chat-thread-message-author">
                {sender?.id === currentUser?.id ? (
                  <span className="chat-thread-author">
                    {msgContent === "Message deleted by user"
                      ? "Removed"
                      : sender?.username}
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      window.open(
                        `/users/${sender?.id}/profile`,
                        "_blank",
                        "noreferrer"
                      )
                    }
                    className="chat-thread-author pointer"
                  >
                    {msgContent === "Message deleted by user"
                      ? "Removed"
                      : sender?.username}
                  </span>
                )}
                <span className="chat-thread-time">
                  {new Date(createdAt).toLocaleString("en-US", {
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

              {/* Reactions */}
              <div className="message-reactions">
                {messageReactions.map((reactionData) => (
                  <div
                    key={reactionData.reactionType}
                    className="reaction-item"
                  >
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
  }
);
