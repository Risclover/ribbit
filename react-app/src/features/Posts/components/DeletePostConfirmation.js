import React from "react";
import { deletePost, getUsers } from "../../../store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export function DeletePostConfirmation({
  postId,
  setShowDeleteModal,
  showDeleteModal,
  isPage,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    setShowDeleteModal(false);
    dispatch(getUsers());

    if (isPage === "singlepage") {
      history.push("/c/all");
    }
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
            Are you sure you want to delete your post? You can't undo this.
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
