import React from "react";
import { useDeleteCommentConfirmation } from "../hooks/useDeleteCommentConfirmation";

/**
 * A modal that has the user confirm that they want to delete this comment.
 * - showDeleteModal, setShowDeleteModal: whether this modal is shown
 * - commentId: id of the comment in question
 */
export function DeleteCommentConfirmation({
  showDeleteModal,
  setShowDeleteModal,
  commentId,
}) {
  const { handleDeleteClick, handleKeepClick } = useDeleteCommentConfirmation({
    commentId,
    setShowDeleteModal,
  });

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
