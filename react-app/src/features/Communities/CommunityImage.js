import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CommunityImgModal from "../../components/Modals/CommunityImgModal";
import Camera from "../../images/user-profile-icons/camera.png";
import { PiCameraPlusLight } from "react-icons/pi";
export default function CommunityImage({ user, community }) {
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);

  return (
    <>
      <div className="community-img-box">
        <div className="community-header-info-img">
          <img src={community.communityImg} alt="Community" />
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
