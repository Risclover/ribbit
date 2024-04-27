import React from "react";
import { SearchResultsNav } from "../features";
import "../features/NewSearch/components/Search.css";
export const SearchResults = ({ children, query, searchPage }) => {
  return (
    <div className="search-results-page">
      <div className="search-results-wrapper">
        <SearchResultsNav query={query} searchPage={searchPage} />
        {children}
      </div>
    </div>
  );
};
