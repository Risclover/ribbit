import React, { useState } from "react";
import { Modal } from "../../context";
import { UploadImage } from "../../features";
import Camera from "../../assets/images/user-profile-icons/camera.png";

export function UploadUserImage({ user, currentUser }) {
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
          <UploadImage
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
