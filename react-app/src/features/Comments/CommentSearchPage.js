import React from "react";
import { CommentSearch } from "./CommentSearch";

export const CommentSearchPage = ({ results, searchQuery, setSearchQuery }) => {
  return (
    <div className="comment-search-page">
      <CommentSearch />
      <div className="comment-search-page-bar">
        <div className="comment-search-page-bar-section">
          Comments with "{searchQuery}"
        </div>
        <span className="comment-search-page-bar-section-separator">|</span>
        <div className="comment-search-page-bar-link">All comments</div>
        <span className="comment-search-page-bar-section-separator">|</span>
      </div>
      <div className="comment-search-page-results">
        {results.map((result) => (
          <CommentSearchResult result={result} />
        ))}
      </div>
    </div>
  );
};
