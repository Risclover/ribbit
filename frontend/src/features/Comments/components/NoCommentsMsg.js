import React from "react";

/**
 * Message that appears when there are no comments in this comments section
 */
export const NoCommentsMsg = () => {
  return (
    <div className="no-comments-msg">
      <i className="fa-solid fa-comments" />
      <h1 className="no-comments-yet">No Comments Yet</h1>
      <p>Be the first to share what you think!</p>
    </div>
  );
};
