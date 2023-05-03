import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getThreads } from "../../store/threads";

export default function MessageReply({ message, threadId, expanded }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  const handleReply = (e) => {
    e.preventDefault();
    const payload = {
      content: reply,
      threadId: threadId,
      receiverId: message.sender.id,
    };
    dispatch(createMessage(payload));
    dispatch(getThreads());
    setReply("");
    setShowReplyBox(false);
  };
  return (
    <div>
      {expanded && (
        <div className="messages-content-message-button-bar">
          {message.sender.username !== currentUser?.username && (
            <button
              className="messages-content-message-button"
              onClick={() => setShowReplyBox(true)}
            >
              Reply
            </button>
          )}
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
