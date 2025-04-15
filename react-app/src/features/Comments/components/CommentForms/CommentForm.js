import React from "react";
import { NavLink } from "react-router-dom";
import { useCommentForm } from "../../hooks/useCommentForm";
import "../../styles/Comments.css";

/**
 * Form to write and submit a comment to a post. Also serves as the comment reply form.
 * - replyForm (boolean): Whether or not this usage of the form is the comment reply or not.
 * - postId: id of the post user is replying to
 * - parentId: id of the parent comment, if any (null on default)
 * - onCancel: what to do when 'Cancel' is pressed
 */
export function CommentForm({
  replyForm = false,
  postId,
  parentId = null,
  onCancel,
  onNewComment,
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
  } = useCommentForm({ onCancel, parentId, postId, onNewComment });

  if (!postId) return null;
  return (
    <div className="comment-form-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="comment-box">
          {!user ? (
            <>
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
            </>
          ) : (
            !replyForm && (
              <>
                Comment as{" "}
                <NavLink to={`/users/${user?.id}/profile`}>
                  {user?.username}
                </NavLink>
              </>
            )
          )}
        </label>
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
