import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment } from "../../../store/comments";
import {
  addNotification,
  getAllNotifications,
} from "../../../store/notifications";
import LoginSignupModal from "../../auth/LoginSignupModal";
import "../Comments.css";

export default function CommentForm({ postId }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

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
      const commentData = await dispatch(
        createComment({ content: content.trim() }, postId)
      );
      const notificationPayload = {
        type: "post-reply",
        id: commentData.id,
      };
      dispatch(addNotification(notificationPayload));
      dispatch(getAllNotifications());
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
            <NavLink to={`/users/${user.id}/profile`}> {user.username}</NavLink>
          </label>
          <div className="post-comment-box">
            <textarea
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
          </div>
        </form>
      )}
      {!user && (
        <form className="comment-form">
          <label htmlFor="comment-box">
            <LoginSignupModal btnText="Log in" className="log-in-to-comment" />
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
