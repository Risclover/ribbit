import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment, getComments, addCommentVote } from "@/store";
import { LoginSignupModal } from "@/features";
import { useAutosizeTextArea } from "@/hooks";
import "../../styles/Comments.css";

export function CommentForm({ postId }) {
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = await dispatch(
      createComment({ content: content.trim() }, postId)
    );

    setContent("");
    dispatch(getComments(postId));
    dispatch(addCommentVote(commentData.id, "upvote"));
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
          <label htmlFor="comment-box">
            Comment as{" "}
            <NavLink to={`/users/${user.id}/profile`}> {user.username}</NavLink>
          </label>
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
                Comment
              </button>
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
