import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, getPosts } from "../../store/posts";
import { removeComment } from "../../store/comments";
import { deleteCommunity, getCommunities } from "../../store/communities";

import "./Modals.css";
import { deleteRule, getCommunityRules } from "../../store/rules";
import { getSingleCommunity } from "../../store/one_community";

export default function DeleteConfirmation({
  setShowEditRuleModal,
  setShowDeleteModal,
  showDeleteModal,
  postId,
  commentId,
  communityName,
  communityId,
  rule,
  item,
  isPage,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("PAGE:", isPage);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (isPage == "singlepage") {
      history.push("/c/all");
    }
    await dispatch(deletePost(postId));
    dispatch(getPosts());
    setShowDeleteModal(false);
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
              className="modal-buttons-left"
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(false);
              }}
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
