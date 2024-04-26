import React from "react";
import { SearchResultsSort, SearchResultsTime } from "../../..";

export function SearchResultsSorting({ searchPage }) {
  return (
    <div className="search-results-sorting">
      <SearchResultsSort searchPage={searchPage} />
      <SearchResultsTime searchPage={searchPage} />
    </div>
  );
}
