import React, { useEffect, useState } from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  createThread,
  getThread,
  getThreads,
} from "../../store/threads";
import { getMessages } from "../../store/messages";

export default function MessageModal({
  setShowMessageModal,
  userId,
  username,
}) {
  const dispatch = useDispatch();

  const [recipient, setRecipient] = useState(username || "");
  const [recipientError, setRecipientError] = useState("");
  const [receiver, setReceiver] = useState();
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const currentUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => Object.values(state.users));
  const threads = useSelector((state) => Object.values(state.threads));

  useEffect(() => {
    dispatch(getThreads());
  }, []);

  useEffect(() => {
    for (let user of allUsers) {
      if (user?.username === recipient) {
        setReceiver(user);
        console.log("receiver:", receiver?.username);
      }
    }
  }, [recipient, receiver]);

  useEffect(() => {
    console.log("sliced:", username?.slice(0, 3));
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setSuccessMsg("Submitting...");
    setRecipientError("");
    setSubjectError("");
    setMessageError("");

    const hello = allUsers.filter((user) => user.username === recipient);

    for (let user of allUsers) {
      if (user.username === recipient) {
        setReceiver(user);
      }
    }

    if (recipient.length === 0) {
      setTimeout(() => {
        setSuccessMsg("");
        setRecipientError("please enter a username");
      }, 500);
    } else if (hello.length === 0) {
      setTimeout(() => {
        setSuccessMsg("");
        setRecipientError("that user does not exist");
      }, 500);
    } else {
      setRecipientError("");
      if (subject.length === 0) {
        setTimeout(() => {
          setSuccessMsg("");
          setSubjectError("please enter a subject");
        }, 500);
      } else if (message.length === 0) {
        setTimeout(() => {
          setSuccessMsg("");
          setMessageError("we need something here");
        }, 500);
      } else {
        const threadPayload = {
          receiverId: receiver.id,
          subject: subject,
        };

        const threadData = await dispatch(createThread(threadPayload));
        console.log("thread data:", threadData);

        const thread = await dispatch(getThread(threadData.thread.id));
        console.log("thread:", thread);

        const payload = {
          content: message,
          threadId: threadData.thread.id,
          receiverId: thread.Thread.users[0].id,
        };
        const msg = await dispatch(createMessage(payload));
        console.log("msg:", msg);
        dispatch(getMessages());
        setTimeout(() => {
          setSuccessMsg("your message has been delivered");
          setMessage("");
          setSubject("");
        }, 500);
      }
    }
  };

  return (
    <div className="message-modal-container">
      <form className="message-modal-form" onSubmit={handleSend}>
        <div className="modal-content">
          <label className="message-modal-label">
            to{" "}
            <span className="message-modal-label-subtext">
              (username, or /u/name for that community's owner)
            </span>
            <input
              type="text"
              className="message-modal-input"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          {recipientError}
          <label className="message-modal-label">
            subject
            <input
              type="text"
              className="message-modal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          {subjectError}
          <label className="message-modal-label">
            message
            <textarea
              className="message-modal-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          {messageError}
        </div>

        <div className="message-modal-buttons">
          <div className="message-success-msg">{successMsg}</div>
          <div className="modal-buttons">
            <button
              className="blue-btn-unfilled-modal btn-short"
              onClick={(e) => {
                e.preventDefault();
                setShowMessageModal(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="blue-btn-filled btn-short">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
