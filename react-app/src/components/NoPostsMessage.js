import React from "react";

export function NoPostsMessage({ sortedPosts }) {
  if (sortedPosts.length === 0)
    return (
      <div className="no-posts-div-container">
        <div className="no-posts-div"></div>
        <div className="no-posts-div-txt">
          <i className="fa-solid fa-people-group"></i>
          <h1>No Subscriptions Yet</h1>
          <p>
            Explore the All feed or the Communities Directory to discover new
            communities.
          </p>
        </div>
      </div>
    );

  return null;
}
