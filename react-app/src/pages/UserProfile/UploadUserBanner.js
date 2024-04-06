import React, { useState } from "react";
import { Modal } from "../../context";
import { UploadBannerImageModal } from "../../features";
import Camera from "../../assets/images/user-profile-icons/camera.png";

export function UploadUserBanner({ user, currentUser }) {
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
          open={() => setShowBannerModal(true)}
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
