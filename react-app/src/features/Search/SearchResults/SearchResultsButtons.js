import React from "react";

export default function SearchResultsButtons({ searchPage, setSearchPage }) {
  return (
    <div className="search-results-btns">
      <button
        className={
          searchPage === "Posts"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => setSearchPage("Posts")}
      >
        Posts
      </button>
      <button
        className={
          searchPage === "Comments"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => setSearchPage("Comments")}
      >
        Comments
      </button>
      <button
        className={
          searchPage === "Communities"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => setSearchPage("Communities")}
      >
        Communities
      </button>
      <button
        className={
          searchPage === "People"
            ? "search-results-btn results-active"
            : "search-results-btn"
        }
        onClick={() => setSearchPage("People")}
      >
        People
      </button>
    </div>
  );
}
