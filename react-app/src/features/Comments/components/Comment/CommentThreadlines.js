import React from "react";

export function CommentThreadlines({ numberOfParents, onClick }) {
  const lines = Array.from({ length: numberOfParents });

  return (
    <div className="comment-threadlines-container" onClick={onClick}>
      {lines.map((_, idx) => (
        <div key={idx} className="comment-threadline-container">
          <div className="comment-threadline">
            <div className="threadline">&nbsp;</div>
          </div>
        </div>
      ))}
    </div>
  );
}
