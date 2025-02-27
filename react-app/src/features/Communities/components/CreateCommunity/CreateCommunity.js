import React, { useEffect, useState } from "react";
import { Modal } from "@/context";
import { CreateCommunityModal } from "../..";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { useScrollLock } from "@/hooks";

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
