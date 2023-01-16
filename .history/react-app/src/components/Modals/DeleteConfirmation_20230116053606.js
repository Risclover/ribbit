import React from "react";
import "./Modals.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
  item,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    history.push(`/posts`);
  };
  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            Are you sure you want to delete your {item}? You can't undo this.
          </div>
          <div className="modal-buttons">
            <button
              className="modal-buttons-left"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="modal-buttons-right" onClick={handleDelete}>
              Delete {item}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
