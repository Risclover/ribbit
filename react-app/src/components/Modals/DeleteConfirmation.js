import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, getPosts } from "../../store/posts";
import { removeComment } from "../../store/comments";
import { deleteCommunity, getCommunities } from "../../store/communities";

import "./Modals.css";

export default function DeleteConfirmation({
  setShowDeleteModal,
  showDeleteModal,
  postId,
  commentId,
  communityName,
  communityId,
  post,
  item,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeletePost = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId));
    history.push(`/c/${communityId}`);
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    await dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleDeleteCommunity = async (e) => {
    e.preventDefault();
    await dispatch(deleteCommunity(communityId));
    history.push(`/`);
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
