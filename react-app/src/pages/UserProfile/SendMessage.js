import React, { useState } from "react";
import { Modal } from "@/context";
import { MessageModal } from "@/features";
import { useHistory } from "react-router-dom";

export function SendMessage({ userId, username, currentUser }) {
  const history = useHistory();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleClick = () => {
    if (!currentUser) {
      history.push("/login");
      return;
    } else {
      setShowMessageModal(true);
    }
  };

  return (
    <div>
      <button className="blue-btn-filled btn-long" onClick={handleClick}>
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
