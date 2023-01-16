import React from "react";
import "./Modals.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";
import { removeComment } from "../../store/comments";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
  commentId,
  item,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeletePost = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    history.push(`/posts`);
  };

  const handleDeleteComment = (e) => {
    e.preventDefault();
    dispatch(removeComment(commentId));
    history.push(`/posts/${postId}`);
    setShowDeleteModal(false);
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
            <button
              className="modal-buttons-right"
              onClick={item === "post" ? handleDeletePost : handleDeleteComment}
            >
              Delete {item}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
