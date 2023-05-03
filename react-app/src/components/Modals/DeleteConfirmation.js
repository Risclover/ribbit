import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, getPosts } from "../../store/posts";
import { removeComment } from "../../store/comments";
import { deleteCommunity } from "../../store/communities";
import { deleteRule, getCommunityRules } from "../../store/rules";
import "./Modals.css";
import { getUsers } from "../../store/users";
import { getSingleCommunity } from "../../store/one_community";

export default function DeleteConfirmation({
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

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (isPage === "singlepage") {
      history.push("/c/all");
    }
    await dispatch(deletePost(postId));
    setShowDeleteModal(false);
    await dispatch(getUsers());
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

  const handleDeleteRule = async (e) => {
    e.preventDefault();
    await dispatch(deleteRule(rule.id));
    setShowDeleteModal(false);
    setShowEditRuleModal(false);
    dispatch(getCommunityRules(communityId));
    dispatch(getSingleCommunity(communityId));
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
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="delete-modal-btn-right"
              onClick={
                item === "post"
                  ? handleDeletePost
                  : item === "community"
                  ? handleDeleteCommunity
                  : item === "comment"
                  ? handleDeleteComment
                  : handleDeleteRule
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
