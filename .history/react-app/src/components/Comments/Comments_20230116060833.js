import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment } from "../../store/comments";
// import "./CommentForm.css";
import Comment from "./Comment";

export default function Comments({ postId }) {
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
      await dispatch(createComment(content, postId));
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
    <div className="comments-container">
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment commentId={comment.id} postId={+postId} />
        ))}
    </div>
  );
}
