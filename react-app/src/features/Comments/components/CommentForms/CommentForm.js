import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  createComment,
  getCommentsForPost,
  getPosts,
  addCommentVote,
} from "@/store";
import { LoginSignupModal } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import { useAuthFlow } from "@/context/AuthFlowContext";
import "../../styles/Comments.css";
import useCommentForm from "features/Comments/hooks/useCommentForm";

export function CommentForm({
  replyForm = false,
  postId,
  parentId = null,
  onCancel,
}) {
  const {
    content,
    setContent,
    openLogin,
    user,
    errors,
    disabled,
    handleSubmit,
    textareaRef,
  } = useCommentForm({ onCancel, parentId, postId });
  if (!postId) return null;

  return (
    <div className="comment-form-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        {!user && (
          <label htmlFor="comment-box">
            <button
              className="log-in-to-comment"
              onClick={(e) => {
                e.preventDefault();
                openLogin();
              }}
            >
              Log in
            </button>
            to comment
          </label>
        )}
        {!replyForm && user && (
          <label htmlFor="comment-box">
            Comment as{" "}
            <NavLink to={`/users/${user?.id}/profile`}>
              {user?.username}
            </NavLink>
          </label>
        )}
        <div className="post-comment-box">
          <textarea
            ref={textareaRef}
            className="post-comment-textarea"
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            disabled={!user}
            maxLength={10000}
            id="comment-box"
          />

          <div className="comment-form-button-container">
            <div className="comment-form-errors">
              {errors.map((error, idx) => (
                <p key={idx} style={{ color: "red" }}>
                  {error}
                </p>
              ))}
            </div>

            <button
              type="submit"
              className="comment-submit"
              disabled={disabled}
            >
              {replyForm ? "Reply" : "Comment"}
            </button>

            {replyForm && (
              <button
                type="button"
                className="comment-reply-form-cancel"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
