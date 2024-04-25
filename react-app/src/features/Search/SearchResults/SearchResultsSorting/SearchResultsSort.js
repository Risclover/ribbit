import React, { useEffect, useRef, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { SearchResultsSortBtn } from "./SearchResultsSortBtn";
import { HandleClickOutside } from "../../../../utils";
import { useOutsideClick } from "../../../../hooks";

export function SearchResultsSort({ searchPage }) {
  const wrapperRef = useRef(null);

  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Relevance");

  useOutsideClick(wrapperRef, () => setSortOpen(false));

  return (
    <div ref={wrapperRef}>
      {(searchPage === "Posts" || searchPage === "Comments") && (
        <button
          className={
            !sortOpen ? "search-results-sort" : "search-results-sort sort-open"
          }
          onClick={(e) => {
            e.preventDefault();
            setSortOpen(!sortOpen);
          }}
        >
          Sort {!sortOpen && <VscChevronDown />} {sortOpen && <VscChevronUp />}
        </button>
      )}
      {sortOpen && (
        <div className="search-results-sort-dropdown">
          {["Relevance", "Hot", "Top", "New", "Most Comments"].map(
            (btn, idx) => (
              <SearchResultsSortBtn
                key={idx}
                btn={btn}
                sort={sort}
                setSort={setSort}
                setSortOpen={setSortOpen}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
