import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getThreads, unreadMessage } from "../../store/threads";
import { addNotification, unreadNotification } from "../../store/notifications";

export default function MessageReply({ message, threadId, expanded }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const handleReply = async (e) => {
    e.preventDefault();
    const payload = {
      content: reply,
      threadId: threadId,
      receiverId: message.sender.id,
    };
    const msg = await dispatch(createMessage(payload));
    const notificationsPayload = {
      type: "message",
      id: msg.id,
    };
    dispatch(addNotification(notificationsPayload));
    dispatch(getThreads());
    setReply("");
    setShowReplyBox(false);
  };

  const handleUnread = (e, message) => {
    e.preventDefault();
    dispatch(unreadMessage(message.id));
    // dispatch(unreadNotification(notification.id));
  };
  return (
    <div className="messages-content-message-button-bar-spacer">
      {expanded && message.sender.username !== currentUser?.username && (
        <div className="messages-content-message-button-bar">
          <button
            className="messages-content-message-button"
            onClick={(e) => handleUnread(e, message)}
          >
            Mark Unread
          </button>
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
          <div className="messages-reply-btns">
            <button className="messages-reply-save-btn" onClick={handleReply}>
              Save
            </button>
            <button
              className="messages-reply-cancel-btn"
              onClick={() => setShowReplyBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
