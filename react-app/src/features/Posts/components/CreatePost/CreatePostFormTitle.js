import React, { useRef } from "react";
import { useAutosizeTextArea } from "@/hooks";

export function CreatePostFormTitle({ title, setTitle }) {
  const { textareaRef } = useRef();

  useAutosizeTextArea(textareaRef);

  return (
    <div className="create-post-form-input">
      <textarea
        ref={textareaRef}
        placeholder="Title"
        className="create-post-input title-input"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        maxLength={300}
      ></textarea>
      <div className="create-post-form-title-length">
        <span className="create-post-title-length">
          {title === "" || title === null || title.length === 0
            ? 0
            : title.length}
          /300
        </span>
      </div>
    </div>
  );
}
