import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment, getComments, addCommentVote } from "@/store";
import { LoginSignupModal } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import "../../styles/Comments.css";
import { getPosts } from "store";
import { getCommentsForPost } from "store";

export function CommentForm({
  replyForm = false,
  postId,
  parentId = null,
  onCancel,
}) {
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => Object.values(state.comments));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = {
      content,
      parentId, // Include parentId if replying
    };

    dispatch(createComment(payload, postId));
    const commentId = comments[comments?.length - 1]?.id + 1;

    setContent("");
    dispatch(getPosts());
    dispatch(getCommentsForPost());
    dispatch(addCommentVote(commentId, "upvote"));
    if (onCancel) onCancel(); // Close the form after submission
  };

  useEffect(() => {
    if (content === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [content]);

  useAutosizeTextArea(textareaRef.current, content);

  if (!postId) return null;

  return (
    <div className="comment-form-container">
      {user && (
        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
          {!replyForm && (
            <label htmlFor="comment-box">
              Comment as{" "}
              <NavLink to={`/users/${user.id}/profile`}>
                {" "}
                {user.username}
              </NavLink>
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
            ></textarea>
            <div className="comment-form-button-container">
              <div className="comment-form-errors">
                {errors.length > 0 && errors.map((error) => error)}
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
                  className="comment-reply-form-cancel"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      )}
      {!user && (
        <form className="comment-form">
          <label htmlFor="comment-box">
            <LoginSignupModal
              btnText="Log in"
              className="log-in-to-comment"
              formType="login"
            />
            to comment
          </label>
          <textarea
            ref={textareaRef}
            className="post-comment-textarea"
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            disabled
          ></textarea>
        </form>
      )}
    </div>
  );
}
