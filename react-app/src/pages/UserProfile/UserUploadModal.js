import React, { useState } from "react";
import { Modal } from "@/context";
import Camera from "@/assets/images/user-profile-icons/camera.png";
import { UploadImageModal } from "@/features/Users/components/UploadImageModal";
import { UploadImgIcon } from "@/assets";

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
            ? "user-profile-upload-btn banner-upload-btn"
            : "user-profile-upload-btn"
        }
        onClick={() => setShowModal(true)}
        tabIndex={0}
      >
        <UploadImgIcon />
      </div>
      {showModal && (
        <Modal
          close={showModal}
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
