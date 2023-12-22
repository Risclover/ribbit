import React, { useState } from "react";
import { Modal } from "../../../context";
import { CreateCommunityModal } from "../../../features";

export function CreateCommunity() {
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
