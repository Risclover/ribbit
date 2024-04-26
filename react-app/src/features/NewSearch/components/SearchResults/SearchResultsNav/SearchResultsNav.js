import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchResultsNav.css";

export const SearchResultsNav = ({ query, searchPage }) => {
  const history = useHistory();
  return (
    <div className="search-results-btns">
      {query}
      <button
        className={
          searchPage === "Posts"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => history.push(`/search/posts?q=${query}`)}
      >
        Posts
      </button>
      <button
        className={
          searchPage === "Comments"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => history.push(`/search/comments?q=${query}`)}
      >
        Comments
      </button>
      <button
        className={
          searchPage === "Communities"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => history.push(`/search/communities?q=${query}`)}
      >
        Communities
      </button>
      <button
        className={
          searchPage === "People"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => history.push(`/search/users?q=${query}`)}
      >
        People
      </button>
    </div>
  );
};
