import React from "react";
import { SearchResultsSort, SearchResultsTime } from "../../SearchResults";

export function SearchResultsSorting({ searchPage }) {
  return (
    <div className="search-results-sorting">
      <SearchResultsSort searchPage={searchPage} />
      <SearchResultsTime searchPage={searchPage} />
    </div>
  );
}
