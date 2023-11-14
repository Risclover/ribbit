import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, getPosts } from "../store/posts";
import { removeComment } from "../store/comments";
import { deleteCommunity } from "../store/communities";
import { deleteRule, getCommunityRules } from "../store/rules";
import { getUsers } from "../store/users";
import { getSingleCommunity } from "../store/one_community";
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
  storeFunction,
  payload,
  getFunction,
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

  const handleDeleteItem = async (e) => {
    e.preventDefault();

    console.log("Let's delete this bitch");
    if (isPage === "singlepage") {
      history.push("/c/all");
    }

    if (item === "rule") {
      setShowEditRuleModal(false);
    }

    setShowDeleteModal(false);

    const data = await dispatch(storeFunction(payload));
    const data2 = await dispatch(getFunction());

    console.log("data:", data);
    console.log("data2:", data2);
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