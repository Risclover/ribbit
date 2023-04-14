import React, { useState } from "react";
import UploadBannerImage from "../../pages/UserProfile/UploadBannerImage";
import { Modal } from "../../context/Modal";
import Camera from "../../images/user-profile-icons/camera.png";

export default function UserBannerModal({ user, currentUser }) {
  const [showBannerModal, setShowBannerModal] = useState(false);

  return (
    <>
      <div
        className="user-profile-banner-upload-btn"
        onClick={() => setShowBannerModal(true)}
      >
        <img src={Camera} alt="Camera" />
      </div>
      {showBannerModal && (
        <Modal
          onClose={() => setShowBannerModal(false)}
          title="Change Profile Banner"
        >
          <UploadBannerImage
            setShowBannerModal={setShowBannerModal}
            showBannerModal={showBannerModal}
            img_url={user?.bannerImg}
            userId={currentUser.id}
          />
        </Modal>
      )}
    </>
  );
}
