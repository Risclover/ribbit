import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MessageModal from "../../components/Modals/MessageModal";

export default function SendMessage({ userId, user }) {
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
        <Modal title="Send Message" onClose={() => setShowMessageModal(false)}>
          <MessageModal
            userId={userId}
            setShowMessageModal={setShowMessageModal}
            username={user?.username}
          />
        </Modal>
      )}
    </div>
  );
}
