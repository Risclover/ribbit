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

export function CommentForm({
  replyForm = false,
  postId,
  parentId = null,
  onCancel,
}) {
  const dispatch = useDispatch();
  const textareaRef = useRef();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const { openLogin } = useAuthFlow();
  const user = useSelector((state) => state.session.user);

  useAutosizeTextArea(textareaRef.current, content);

  useEffect(() => {
    setDisabled(content.trim().length === 0);
  }, [content]);

  if (!postId) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = {
      content,
      parentId,
    };

    try {
      // createComment might return newly-created comment data
      dispatch(createComment(payload, postId));
      // Optionally upvote the new comment automatically:

      // Refresh or fetch updated comment data
      dispatch(getPosts());

      setContent("");

      if (onCancel) onCancel(); // If it's a reply form, close after submission
    } catch (err) {
      setErrors(["There was an error creating your comment"]);
    }
  };

  if (!user) {
    return (
      <div className="comment-form-container">
        <form className="comment-form">
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
          <textarea
            ref={textareaRef}
            className="post-comment-textarea"
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            disabled
          />
        </form>
      </div>
    );
  }

  return (
    <div className="comment-form-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        {!replyForm && (
          <label htmlFor="comment-box">
            Comment as{" "}
            <NavLink to={`/users/${user.id}/profile`}>{user.username}</NavLink>
          </label>
        )}
        <div className="post-comment-box">
          <textarea
            ref={textareaRef}
            className="post-comment-textarea"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            maxLength={10000}
            placeholder="What are your thoughts?"
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
