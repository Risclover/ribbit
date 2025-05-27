import React, { useEffect } from "react";
import { SearchResultsNav } from "../features";
import { usePageSettings } from "../hooks";
import { MagnifyingGlass } from "@/assets/icons/MagnifyingGlass";
import "../features/NewSearch/Search.css";
import { SearchTabs } from "features/NewSearch/components/MobileSearchbar/SearchTabs";
import { useSelector } from "react-redux";
import { useIsMobile } from "hooks/useIsMobile";

export const SearchResults = ({ children, query, searchPage }) => {
  const isMobile = useIsMobile();
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
        {isMobile ? (
          <SearchTabs query={query} searchPage={searchPage} />
        ) : (
          <SearchResultsNav query={query} searchPage={searchPage} />
        )}
        {children}
      </div>
    </div>
  );
};
