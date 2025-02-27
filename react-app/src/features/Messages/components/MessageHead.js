import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "@/context";
import { MessageModal } from "..";

export function MessageHead({ active }) {
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
          className={
            active !== "Sent"
              ? "messages-main-menu-item messages-main-menu-selected"
              : "messages-main-menu-item"
          }
          onClick={() => history.push("/message/inbox")}
        >
          Inbox
        </li>
        <li
          className={
            active === "Sent"
              ? "messages-main-menu-item messages-main-menu-selected"
              : "messages-main-menu-item"
          }
          onClick={() => history.push("/message/sent")}
        >
          Sent
        </li>
      </ul>
      {showMessageModal && (
        <Modal
          close={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          title="Send Message"
          open={() => setShowMessageModal(true)}
        >
          <MessageModal setShowMessageModal={setShowMessageModal} username="" />
        </Modal>
      )}
    </div>
  );
}
