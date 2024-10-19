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
    dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleKeepClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };

  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            Are you sure you want to delete your comment?
          </div>
          <div className="modal-buttons">
            <button
              className="delete-modal-btn-left"
              onClick={(e) => handleKeepClick(e)}
            >
              Keep
            </button>
            <button
              className="delete-modal-btn-right"
              onClick={(e) => handleDeleteClick(e)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
