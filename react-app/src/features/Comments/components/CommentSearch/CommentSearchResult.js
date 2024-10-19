import React from "react";

export const CommentSearchResult = () => {
  return <div className="comment-search-result">
    <div className="comment-search-result-author-bar">
        <div className="comment-search-result-author-img"></div>
        <div className="comment-search-result-author-name"></div>
        <div className="comment-search-result-timestamp"></div>
    </div>
    <div className="comment-search-result-content">
        <div className="comment-search-result-upvotes"></div>
    </div>
  </div>;
};
