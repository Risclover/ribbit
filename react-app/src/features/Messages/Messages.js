import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMessages } from "../../store/messages";
import { createMessage, getThreads, readMessage } from "../../store/threads";
import moment from "moment";
import { Modal } from "../../context/Modal";
import MessageModal from "../../components/Modals/MessageModal";
import MessageReply from "./MessageReply";
import "./Messages.css";
import { getUsers } from "../../store/users";
import Message from "./Message";
import MessageThread from "./MessageThread";
export default function Messages({ setPageTitle }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => Object.values(state.messages));
  const threads = useSelector((state) => Object.values(state.threads));
  const currentUser = useSelector((state) => state.session.user);

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    document.title = "Messages";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={currentUser?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
        />
        <span className="nav-left-dropdown-item">Messages</span>
      </div>
    );
  }, []);

  const handleReply = (e) => {
    e.preventDefault();
  };

  console.log(threads);
  threads.sort((a, b) => {
    let aThread = new Date(a.updatedAt);
    let bThread = new Date(b.updatedAt);

    return bThread - aThread;
  });

  console.log(threads);
  return (
    <div className="messages-page">
      <div className="messages-header">
        <ul className="messages-main-menu">
          <li
            className="messages-main-menu-item"
            onClick={() => setShowMessageModal(true)}
          >
            Send A Private Message
          </li>
          <li className="messages-main-menu-item messages-main-menu-selected">
            Inbox
          </li>
          <li className="messages-main-menu-item">Sent</li>
        </ul>
      </div>
      {showMessageModal && (
        <Modal onClose={() => setShowMessageModal(false)} title="Send Message">
          <MessageModal setShowMessageModal={setShowMessageModal} username="" />
        </Modal>
      )}
      <div className="messages-content">
        <div className="messages-content-menu">
          <ul className="messages-content-menu-list">
            <li className="messages-content-menu-list-item">All</li>
            <li className="messages-content-menu-list-item">Unread</li>
            <li className="messages-content-menu-list-item messages-menu-item-active">
              Messages
            </li>
            <li className="messages-content-menu-list-item">Post Replies</li>
          </ul>
        </div>
        <div className="messages-content-main">
          {threads.map((item) => (
            <MessageThread item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
