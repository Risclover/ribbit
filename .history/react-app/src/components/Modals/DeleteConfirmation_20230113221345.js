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
        <div className="modal-title"></div>
        <div className="modal-close">
          <i className="modal-close-btn fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="modal-content"></div>
      <div className="modal-buttons">
        <button className="modal-buttons-left"></button>
        <button className="modal-buttons-right"></button>
      </div>
    </div>
  );
}
