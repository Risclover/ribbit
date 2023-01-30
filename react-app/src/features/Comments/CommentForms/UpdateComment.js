import React, { useState } from "react";

export default function UpdateComment() {
  const [content, setContent] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="update-comment-container">
      <form className="update-comment-form" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button type="submit" className="update-comment-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
