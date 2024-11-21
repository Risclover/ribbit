import React from "react";
import { SearchResultsNav } from "../features";
import "../features/NewSearch/Search.css";
import { usePageSettings } from "../hooks";
import { MagnifyingGlass } from "assets/icons/MagnifyingGlass";

export const SearchResults = ({ children, query, searchPage }) => {
  usePageSettings({
    documentTitle: `ribbit: search results - ${query}`,
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <MagnifyingGlass color="#1c1c1c" height="20px" width="20px" />
      </div>
    ),
    pageTitle: "Search Results",
  });

  return (
    <div className="search-results-page">
      <div className="search-results-wrapper">
        <SearchResultsNav query={query} searchPage={searchPage} />
        {children}
      </div>
    </div>
  );
};
