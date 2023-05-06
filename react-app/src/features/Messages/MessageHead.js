import React, { useState } from "react";
import MessageModal from "../../components/Modals/MessageModal";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

export default function MessageHead() {
  const history = useHistory();

  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <div className="messages-header">
      <ul className="messages-main-menu">
        <li
          className="messages-main-menu-item"
          onClick={() => setShowMessageModal(true)}
        >
          Send A Private Message
        </li>
        <li
          className="messages-main-menu-item messages-main-menu-selected"
          onClick={() => history.push("/message/inbox")}
        >
          Inbox
        </li>
        <li
          className="messages-main-menu-item"
          onClick={() => history.push("/message/sent")}
        >
          Sent
        </li>
      </ul>
      {showMessageModal && (
        <Modal onClose={() => setShowMessageModal(false)} title="Send Message">
          <MessageModal setShowMessageModal={setShowMessageModal} username="" />
        </Modal>
      )}
    </div>
  );
}
