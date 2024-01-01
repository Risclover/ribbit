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
} from "../../../store";
import "./MessageModal.css";
import "../../../assets/styles/Modals.css";

export function MessageModal({ setShowMessageModal, username }) {
  const dispatch = useDispatch();

  const [recipient, setRecipient] = useState(username);
  const [recipientError, setRecipientError] = useState("");
  const [receiver, setReceiver] = useState();
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const allUsers = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    for (let user of allUsers) {
      if (username === user.username) {
        break;
      } else {
        if (recipient) {
          if (recipient?.length > 0) {
            const split = recipient.split("");
            let communityName = split.slice(3).join("");
            if (split.slice(0, 3).join("") === "/c/") {
              for (let community of communities) {
                if (community.name === communityName) {
                  setReceiver(community.communityOwner);
                }
              }
            }
          }
        }
      }
    }
  }, [recipient]);

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    for (let user of allUsers) {
      if (user?.username === recipient) {
        setReceiver(user);
      }
    }
  }, [recipient, receiver, allUsers]);

  useEffect(() => {
    if (
      currentUser.username === recipient ||
      receiver?.username === currentUser.username
    ) {
      setRecipientError("WARNING: Sorry, you can't message yourself.");
    } else {
      setRecipientError("");
    }
  }, [recipient, receiver, currentUser]);

  const handleSend = async (e) => {
    e.preventDefault();
    setSuccessMsg("Submitting...");
    setRecipientError("");
    setSubjectError("");
    setMessageError("");

    let recipientName;
    if (recipient.slice(0, 3) === "/c/") {
      recipientName = recipient.username;
    } else {
      recipientName = allUsers.filter((user) => user.username === recipient);
    }

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
    } else if (recipientName?.length === 0) {
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

        const thread = await dispatch(getThread(threadData.thread.id));

        const payload = {
          content: message,
          threadId: threadData.thread.id,
          receiverId: thread.users[0].id,
        };
        const msg = await dispatch(createMessage(payload));

        dispatch(getMessages());

        const notificationPayload = {
          type: "message",
          id: msg.id,
        };
        dispatch(addNotification(notificationPayload));
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
              (username, or /c/<em>CommunityName</em> to message that
              community's owner)
            </span>
            <input
              type="text"
              className="message-modal-input"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <div className="message-modal-error">{recipientError}</div>
          <label className="message-modal-label">
            subject
            <input
              type="text"
              className="message-modal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <div className="message-modal-error">{subjectError}</div>
          <label className="message-modal-label">
            message
            <textarea
              className="message-modal-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
                e.preventDefault();
                setShowMessageModal(false);
              }}
            >
              Cancel
            </button>
            {recipientError !== "" ||
            receiver?.username === currentUser?.username ? (
              <button className="blue-btn-filled btn-short" disabled>
                Send
              </button>
            ) : (
              <button type="submit" className="blue-btn-filled btn-short">
                Send
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
