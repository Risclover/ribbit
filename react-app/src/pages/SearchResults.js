import React from "react";
import { SearchResultsNav } from "../features";

export const SearchResults = ({ children, query, searchPage }) => {
  return (
    <div className="search-results-page">
      <SearchResultsNav query={query} searchPage={searchPage} />
      {children}
    </div>
  );
};
