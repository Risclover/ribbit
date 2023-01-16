import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment } from "../../store/comments";
// import "./CommentForm.css";

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length < 5)
      errors.push("Comment length should be 4 characters or longer.");
    if (errors.length > 0) {
      setErrors(errors);
      return;
    } else {
      await dispatch(postComment(content, postId));
      setErrors([]);
      setContent("");
    }
  };

  useEffect(() => {
    if (content === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [content]);

  if (!postId) return null;
  return (
    <div className="comment-form-container">
      {user && (
        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
          <label for="comment-box">
            Comment as{" "}
            <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
          </label>
          <textarea
            className="post-comment-textarea"
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <div className="comment-form-button-container">
            {disabled === true ? (
              <button type="submit" className="comment-submit" disabled>
                Comment
              </button>
            ) : (
              <button type="submit" className="comment-submit">
                Comment
              </button>
            )}
          </div>
        </form>
      )}
      {!user && (
        <form className="comment-form">
          <label for="comment-box">
            <NavLink to="/login">Log in</NavLink> to comment
          </label>
          <textarea
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
