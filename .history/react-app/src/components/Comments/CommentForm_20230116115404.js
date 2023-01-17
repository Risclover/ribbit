import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment } from "../../store/comments";
// import "./CommentForm.css";
import "./Comments.css";

export default function CommentForm({ postId, setShowLoginForm }) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];

    if (content.trim().length === 0)
      errors.push("Please add some content to your comment.");
    if (errors.length > 0) {
      setErrors(errors);
      return;
    } else {
      await dispatch(createComment({ content: content.trim(), postId }));
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
          <label htmlFor="comment-box">
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
            {errors.length > 0 &&
              errors.map((error) => (
                <div className="comment-form-errors">{error}</div>
              ))}
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
            <NavLink
              to="/login"
              exact={true}
              activeClassName="active"
              onClick={() => setShowLoginForm(true)}
            >
              Log in
            </NavLink>{" "}
            to comment
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
