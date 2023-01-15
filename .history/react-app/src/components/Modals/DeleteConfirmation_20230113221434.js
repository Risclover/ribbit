import React from "react";
import "./Modals.css";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
}) {
  return (
    <div className="modal-container">
      <div className="modal-topbar">
        <div className="modal-title">Delete post?</div>
        <div className="modal-close">
          <i className="modal-close-btn fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="modal-content">
        Are you sure you want to delete your post?
      </div>
      <div className="modal-buttons">
        <button
          className="modal-buttons-left"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
        <button className="modal-buttons-right">Delete post</button>
      </div>
    </div>
  );
}
