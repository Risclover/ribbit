import React, { useRef, useState } from "react";
import { useAutosizeTextArea } from "../../ChatWindow";

export function UpdateComment() {
  const textareaRef = useRef();
  const [content, setContent] = useState();

  useAutosizeTextArea(textareaRef.current, content);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="update-comment-container">
      <form className="update-comment-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          maxLength={10000}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What are your thoughts?"
        ></textarea>
        <button type="submit" className="update-comment-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
