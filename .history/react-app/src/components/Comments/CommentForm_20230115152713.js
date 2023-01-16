import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";

export default function CommentForm() {
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

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
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
