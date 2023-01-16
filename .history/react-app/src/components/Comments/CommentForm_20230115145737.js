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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];

    if (content.length === 0) {
      errors.push("You must give your comment some content before posting!");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = dispatch(createComment(postId));
      if (data) {
        setErrors(data.errors);
      } else {
        history.push(`/posts/${postId}`);
      }
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
