import React from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
}) {
  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-topbar">
            <div className="modal-title">Delete post?</div>
            <div className="modal-close">
              <button className="modal-close-btn">
                <i className="fa-solid fa-xmark"></i>
              </button>
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
      )}
    </>
  );
}
