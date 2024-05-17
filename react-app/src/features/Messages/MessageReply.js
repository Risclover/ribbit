import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createMessage,
  deleteMessage,
  removeThread,
  getThreads,
  unreadMessage,
  addNotification,
  getMessages,
} from "@/store";

export function MessageReply({
  pageType,
  message,
  threadId,
  expanded,
  markedUnread,
  setMarkedUnread,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [reply, setReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [areYouSure, setAreYouSure] = useState(false);
  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.session.user);

  const handleReply = async (e) => {
    e.preventDefault();
    if (reply.trim() === "") {
      setError("we need something here");
    } else {
      const payload = {
        content: reply,
        threadId: threadId,
        receiverId: message.sender.id,
      };
      const msg = await dispatch(createMessage(payload));
      const notificationsPayload = {
        notificationType: "message",
        id: msg.id,
      };
      dispatch(addNotification(notificationsPayload));
      dispatch(getThreads());
      setReply("");
      setShowReplyBox(false);
    }
  };

  const handleUnread = async (e, message) => {
    e.preventDefault();
    await dispatch(unreadMessage(message.id));
    dispatch(getMessages());
    setMarkedUnread(true);
  };

  const handleDelete = async (e, message) => {
    e.preventDefault();
    const data = await dispatch(deleteMessage(message.id));

    if (data.thread.messages.length === 0) {
      dispatch(removeThread(data.thread.id));
    }
    dispatch(getThreads());
    dispatch(getMessages());
    setAreYouSure(false);
  };

  return (
    <div className="messages-content-message-button-bar-spacer">
      {expanded && message.sender.username !== currentUser?.username && (
        <div
          className={
            pageType === "Inbox" || pageType === "Inbox-Unread"
              ? "messages-content-message-button-bar-inbox"
              : "messages-content-message-button-bar"
          }
        >
          <button
            className="messages-content-message-button"
            onClick={() => history.push(`/message/messages/${threadId}`)}
          >
            Permalink
          </button>
          {!areYouSure && (
            <button
              className="messages-content-message-button"
              onClick={() => setAreYouSure(true)}
            >
              Delete
            </button>
          )}
          {areYouSure && (
            <span className="messages-are-you-sure">
              Are you sure?{" "}
              <button
                className="messages-content-message-button are-you-sure"
                onClick={(e) => handleDelete(e, message)}
              >
                Yes
              </button>{" "}
              /{" "}
              <button
                className="messages-content-message-button are-you-sure"
                onClick={() => setAreYouSure(false)}
              >
                No
              </button>
            </span>
          )}
          {pageType !== "Inbox-Unread" && !markedUnread && (
            <button
              className="messages-content-message-button"
              onClick={(e) => handleUnread(e, message)}
            >
              Mark Unread
            </button>
          )}
          <button
            className="messages-content-message-button"
            onClick={() => setShowReplyBox(true)}
          >
            Reply
          </button>
        </div>
      )}
      {showReplyBox && (
        <div className="messages-reply-box">
          <textarea
            className="messages-reply-input"
            onChange={(e) => setReply(e.target.value)}
            value={reply}
          ></textarea>
          <div className="messages-reply-error">{error}</div>
          <div className="messages-reply-btns">
            <button className="messages-reply-save-btn" onClick={handleReply}>
              Save
            </button>
            <button
              className="messages-reply-cancel-btn"
              onClick={() => {
                setShowReplyBox(false);
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
