import { useEffect, ReactNode, FC } from "react";
import { SearchResultsNav } from "../features";
import { usePageSettings } from "../hooks";
import { MagnifyingGlass } from "@/assets/icons/MagnifyingGlass";
import "../features/NewSearch/Search.css";
import { SearchTabs } from "features/NewSearch/components/MobileSearchbar/SearchTabs";
import { useIsMobile } from "hooks/useIsMobile";

/* ───────────────────────── Types ───────────────────────── */

interface SearchResultsProps {
  children: ReactNode;
  query: string;
  /** the active tab / route – extend as needed */
  searchPage: string;
}

/* ───────────────────────── Component ───────────────────── */

export const SearchResults: FC<SearchResultsProps> = ({
  children,
  query,
  searchPage,
}) => {
  const isMobile = useIsMobile();

  /* <head> metadata */
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

  /* highlight colour reset */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--community-highlight",
      "var(--highlight-color)"
    );
  }, []);

  /* render */
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
