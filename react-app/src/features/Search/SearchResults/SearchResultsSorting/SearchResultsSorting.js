import React from "react";
import SearchResultsSort from "./SearchResultsSort";
import SearchResultsTime from "./SearchResultsTime";

export default function SearchResultsSorting({ searchPage }) {
  return (
    <div className="search-results-sorting">
      <SearchResultsSort searchPage={searchPage} />
      <SearchResultsTime searchPage={searchPage} />
    </div>
  );
}
