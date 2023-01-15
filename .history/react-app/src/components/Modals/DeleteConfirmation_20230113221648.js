import React from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
  };
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
