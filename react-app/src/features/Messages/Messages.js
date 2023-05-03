import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";
import { getThreads } from "../../store/threads";
import { Modal } from "../../context/Modal";
import MessageModal from "../../components/Modals/MessageModal";
import "./Messages.css";
import { getUsers } from "../../store/users";
import MessageThread from "./MessageThread";

export default function Messages({ setPageTitle }) {
  const dispatch = useDispatch();
  const threads = useSelector((state) => Object.values(state.threads));
  const currentUser = useSelector((state) => state.session.user);

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Messages";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={currentUser?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
          alt="User"
        />
        <span className="nav-left-dropdown-item">Messages</span>
      </div>
    );
  }, [setPageTitle, currentUser?.profile_img]);

  threads.sort((a, b) => {
    let aThread = new Date(a.updatedAt);
    let bThread = new Date(b.updatedAt);

    return bThread - aThread;
  });

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
