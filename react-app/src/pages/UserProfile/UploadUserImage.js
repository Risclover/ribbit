import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadUserImage from "../../components/Modals/UploadUserImageModal";
import Camera from "../../images/user-profile-icons/camera.png";

export default function UserImageModal({ user, currentUser }) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      <div
        className="user-profile-upload-btn"
        onClick={() => setShowUploadModal(true)}
      >
        <img src={Camera} alt="Camera" />
      </div>
      {showUploadModal && (
        <Modal
          onClose={() => setShowUploadModal(false)}
          title="Change User Image"
        >
          <UploadUserImage
            setShowUploadModal={setShowUploadModal}
            showUploadModal={showUploadModal}
            img_url={user?.profile_img}
            userId={currentUser.id}
          />
        </Modal>
      )}
    </>
  );
}
