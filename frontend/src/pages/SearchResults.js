import React, { useEffect } from "react";
import { SearchResultsNav } from "../features";
import { usePageSettings } from "../hooks";
import { MagnifyingGlass } from "@/assets/icons/MagnifyingGlass";
import "../features/NewSearch/Search.css";

export const SearchResults = ({ children, query, searchPage }) => {
  usePageSettings({
    documentTitle: `ribbit: search results - ${query}`,
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <MagnifyingGlass
          color="var(--main-text-color)"
          height="20px"
          width="20px"
        />
      </div>
    ),
    pageTitle: "Search Results",
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--community-highlight",
      "var(--highlight-color)"
    );
  }, []);

  return (
    <div className="search-results-page">
      <div className="search-results-wrapper">
        <SearchResultsNav query={query} searchPage={searchPage} />
        {children}
      </div>
    </div>
  );
};
