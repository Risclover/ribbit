import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  createThread,
  getThread,
  getThreads,
  getMessages,
  addNotification,
  getCommunities,
} from "@/store";
import "./MessageModal.css";
import "@/assets/styles/Modals.css";
import useMessageModal from "features/Messages/hooks/useMessageModal";

export function MessageModal({ setShowMessageModal, username }) {
  const {
    recipient,
    setRecipient,
    subject,
    setSubject,
    message,
    setMessage,
    receiver,
    currentUser,
    recipientError,
    subjectError,
    messageError,
    successMsg,
    handleSend,
  } = useMessageModal({ username });

  return (
    <div
      className="message-modal-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form className="message-modal-form" onSubmit={handleSend}>
        <div className="modal-content">
          <label className="message-modal-label">
            to{" "}
            <span className="message-modal-label-subtext">
              (username, or /c/<em>CommunityName</em> to message that
              community's owner)
            </span>
            <input
              onFocus={(e) => {
                e.stopPropagation();
              }}
              type="text"
              className="message-modal-input"
              value={recipient}
              onChange={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setRecipient(e.target.value);
              }}
            />
          </label>
          <div className="message-modal-error">{recipientError}</div>
          <label className="message-modal-label">
            subject
            <input
              type="text"
              className="message-modal-input"
              value={subject}
              onChange={(e) => {
                e.stopPropagation();
                setSubject(e.target.value);
              }}
            />
          </label>
          <div className="message-modal-error">{subjectError}</div>
          <label className="message-modal-label">
            message
            <textarea
              className="message-modal-textarea"
              value={message}
              onChange={(e) => {
                e.stopPropagation();
                setMessage(e.target.value);
              }}
            ></textarea>
          </label>
          <div className="message-modal-error">{messageError}</div>
        </div>

        <div className="message-modal-buttons">
          <div className="message-success-msg">{successMsg}</div>
          <div className="modal-buttons">
            <button
              className="blue-btn-unfilled-modal btn-short"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowMessageModal(false);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="blue-btn-filled btn-short"
              disabled={
                recipientError !== "" ||
                receiver?.username === currentUser?.username
              }
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
