import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deletePost,
  getPosts,
  removeComment,
  deleteCommunity,
  deleteRule,
  getCommunityRules,
  getUsers,
  getSingleCommunity,
} from "../store";
import "../assets/styles/Modals.css";

export function DeleteConfirmationModal({
  setShowEditRuleModal,
  setShowDeleteModal,
  showDeleteModal,
  postId,
  commentId,
  communityId,
  rule,
  item,
  isPage,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    setShowDeleteModal(false);
    await dispatch(getUsers());
    if (isPage === "singlepage") {
      history.push("/c/all");
    }
  };

  const handleDeleteComment = async () => {
    setShowDeleteModal(false);
    await dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleDeleteCommunity = async () => {
    await dispatch(deleteCommunity(communityId));
    history.push(`/`);
  };

  const handleDeleteRule = async () => {
    await dispatch(deleteRule(rule.id));
    setShowDeleteModal(false);
    setShowEditRuleModal(false);
    dispatch(getCommunityRules(communityId));
    dispatch(getSingleCommunity(communityId));
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (item === "post") {
      handleDeletePost();
    } else if (item === "community") {
      handleDeleteCommunity();
    } else if (item === "comment") {
      handleDeleteComment();
      handleDeleteRule();
    }
  };
  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            Are you sure you want to delete this {item}? This action can't be
            undone.
          </div>
          <div className="modal-buttons">
            <button
              className="delete-modal-btn-left"
              onClick={(e) => handleCancelClick(e)}
            >
              Cancel
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
