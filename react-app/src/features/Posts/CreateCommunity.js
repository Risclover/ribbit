import React, { useState } from "react";
import CreateCommunityModal from "../../components/Modals/CreateCommunityModal";
import { Modal } from "../../context/Modal";

export default function CreateCommunity() {
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);

  return (
    <div>
      <button
        className="blue-btn-unfilled btn-long"
        onClick={() => setShowCreateCommunityModal(true)}
      >
        Create Community
      </button>
      {showCreateCommunityModal && (
        <Modal
          onClose={() => setShowCreateCommunityModal(false)}
          title="Create a community"
        >
          <CreateCommunityModal
            showCreateCommunityModal={showCreateCommunityModal}
            setShowCreateCommunityModal={setShowCreateCommunityModal}
          />
        </Modal>
      )}
    </div>
  );
}
