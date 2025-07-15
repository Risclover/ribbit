import React, { useEffect, useState } from "react";
import { Modal } from "@/context";
import { CreateCommunityModal } from "..";
import { useEscapeKey } from "@/hooks";

export function CreateCommunity() {
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  useEscapeKey(
    () => setShowCreateCommunityModal(false),
    showCreateCommunityModal
  );

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
          close={showCreateCommunityModal}
          onClose={() => setShowCreateCommunityModal(false)}
          title="Create a community"
          open={() => setShowCreateCommunityModal(true)}
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
