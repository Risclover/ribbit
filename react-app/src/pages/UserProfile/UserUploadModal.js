import React, { useState } from "react";
import { Modal } from "@/context";
import Camera from "@/assets/images/user-profile-icons/camera.png";
import { UploadImageModal } from "@/features/Users/components/UploadImageModal";

export function UserUploadModal({
  children,
  title,
  showModal,
  setShowModal,
  imgUrl,
  userId,
  uploadType,
}) {
  return (
    <>
      <div
        className={
          uploadType === "banner"
            ? "user-profile-banner-upload-btn"
            : "user-profile-upload-btn"
        }
        onClick={() => setShowModal(true)}
      >
        <img src={Camera} alt="Camera" />
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title={title}
          open={() => setShowModal(true)}
        >
          <UploadImageModal
            setShowModal={setShowModal}
            imgUrl={imgUrl}
            userId={userId}
            uploadType={uploadType}
          />
          {children}
        </Modal>
      )}
    </>
  );
}
