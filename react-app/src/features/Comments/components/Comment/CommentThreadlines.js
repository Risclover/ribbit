import React from "react";

export default function CommentThreadlines({ setCollapsed }) {
  return (
    <div
      className="comment-threadlines-container"
      onClick={() => setCollapsed(true)}
    >
      <div className="comment-threadline-container">
        <div className="comment-threadline">
          <div className="threadline">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
