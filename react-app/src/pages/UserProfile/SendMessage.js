import React, { useState } from "react";
import { Modal } from "../../context";
import { MessageModal } from "../../features";

export function SendMessage({ userId, user, username }) {
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <div>
      <button
        className="blue-btn-filled btn-long"
        onClick={() => setShowMessageModal(true)}
      >
        Send Message
      </button>
      {showMessageModal && (
        <Modal
          title="Send Message"
          onClose={() => setShowMessageModal(false)}
          open={() => setShowMessageModal(true)}
        >
          <MessageModal
            userId={userId}
            setShowMessageModal={setShowMessageModal}
            username={username}
          />
        </Modal>
      )}
    </div>
  );
}
