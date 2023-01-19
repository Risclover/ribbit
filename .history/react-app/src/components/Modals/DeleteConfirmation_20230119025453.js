import React from "react";
import "./Modals.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router-dom";
import {
  getAllComments,
  getComments,
  removeComment,
} from "../../store/comments";
import { useEffect } from "react";
import { removeCommunity } from "../../store/communities";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
  commentId,
  communityId,
  post,
  item,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeletePost = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId));
    history.push(`/communities/${post.communityId}`);
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}`);
    await dispatch(removeComment(commentId));
    setShowDeleteModal(false);
  };

  const handleDeleteCommunity = async (e) => {
    e.preventDefault();
    history.push(`/posts`);
    await dispatch(removeCommunity(communityId));
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
              onClick={
                item === "post"
                  ? handleDeletePost
                  : item === "community"
                  ? handleDeleteCommunity
                  : handleDeleteComment
              }
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
