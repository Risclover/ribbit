import React from "react";
import { useDispatch } from "react-redux";
import { getPosts, removeComment } from "@/store";

export function DeleteCommentConfirmation({
  showDeleteModal,
  setShowDeleteModal,
  commentId,
}) {
  const dispatch = useDispatch();

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    await dispatch(removeComment(commentId));
    dispatch(getPosts()); // If you need to refresh entire posts list
  };

  const handleKeepClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };

  if (!showDeleteModal) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        Are you sure you want to delete your comment?
      </div>
      <div className="modal-buttons">
        <button className="delete-modal-btn-left" onClick={handleKeepClick}>
          Keep
        </button>
        <button className="delete-modal-btn-right" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
