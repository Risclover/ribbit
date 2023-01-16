import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
export default function UpdateComment() {
    const [content, setContent] = useState();
    const [errors, setErrors] = useState([]);

  return (
    <div className="update-comment-container">
      <form className="update-comment-form" onSubmit={handleSubmit}>
        <textarea onChange={(e) => setContent(e.target.value)} value={content}
      </form>
    </div>
  );
}
