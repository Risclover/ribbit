import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CommunityImgModal from "../../components/Modals/CommunityImgModal";
import Camera from "../../images/user-profile-icons/camera.png";

export default function CommunityImage({ user, community }) {
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);

  return (
    <>
      <div className="community-img-box">
        {user?.id === community.userId && (
          <div
            className="community-img-upload-btn"
            onClick={() => setShowCommunityImgModal(true)}
          >
            <img src={Camera} alt="Camera" />
          </div>
        )}

        <div className="community-header-info-img">
          <img src={community.communityImg} alt="Community" />
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
