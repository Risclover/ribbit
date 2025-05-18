import React from "react";

/**
 * Comment threadlines (the vertical lines that span the height of a comment on its left side)
 * - setIsCollapsed: Setter for whether the comment is collapsed, as controlled by clicking its threadline
 * - level: Comment reply level (topmost = level 1, etc.)
 */
export function CommentThreadlines({ setIsCollapsed, level }) {
  const parentThreadlines = Array.from({ length: level - 1 });

  return (
    <div className="all-threadlines" onClick={() => setIsCollapsed(true)}>
      {/* Parent comment threadlines */}
      {parentThreadlines.map((_, index) => (
        <div className="this-levels-threadline" key={index}>
          <div className="threadline-container">
            <div className="threadline"></div>
          </div>
        </div>
      ))}

      {/* Current comment's threadlines */}
      <div className="this-levels-threadline">
        <div className="threadline-container">
          <div className="threadline"></div>
        </div>
      </div>
    </div>
  );
}
