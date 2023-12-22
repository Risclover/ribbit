import React, { useState } from "react";
import { Modal } from "../../context";
import { CommunityImgModal } from "../../features";

export function CommunityImage({ user, community }) {
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);

  return (
    <>
      <div className="community-img-box">
        <div className="community-header-info-img">
          <img
            src={
              community.communitySettings[community.id].hideCommunityIcon
                ? "https://i.imgur.com/9CI9hiO.png"
                : community.communitySettings[community.id].communityIcon
            }
            alt="Community"
          />
          {user?.id === community.userId && (
            <span
              className="community-update-icon"
              onClick={() => setShowCommunityImgModal(true)}
            >
              Update icon
            </span>
          )}
        </div>
      </div>

      {showCommunityImgModal && (
        <Modal
          onClose={() => setShowCommunityImgModal(false)}
          title="Change community image"
        >
          <CommunityImgModal
            setShowCommunityImgModal={setShowCommunityImgModal}
            communityId={community.id}
          />
        </Modal>
      )}
    </>
  );
}
