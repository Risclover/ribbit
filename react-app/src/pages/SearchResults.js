import React from "react";
import { SearchResultsNav } from "../features";

export const SearchResults = ({ children }) => {
  return (
    <div className="search-results-page">
      <SearchResultsNav />
      {children}
    </div>
  );
};
