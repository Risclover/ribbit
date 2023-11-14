import React, { useState } from "react";
import UploadBannerImageModal from "../../features/Users/components/UploadImageModal/UploadBannerImageModal";
import { Modal } from "../../context/Modal";
import Camera from "../../assets/images/user-profile-icons/camera.png";

export default function UploadUserBanner({ user, currentUser }) {
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
          <UploadBannerImageModal
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
