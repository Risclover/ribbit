import React, { useRef, useState } from "react";
import { SearchResultsSortDropdown } from "./SearchResultsSortDropdown";
import { useOutsideClick } from "../../../../../hooks";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import "./SearchResultsSort.css";

export const SearchResultsSortBtn = ({ searchPage }) => {
  const wrapperRef = useRef();
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Top");
  const [sortSet, setSortSet] = useState(false);

  useOutsideClick(wrapperRef, () => setSortOpen(false));

  return (
    <div ref={wrapperRef}>
      <button
        className={`
          ${
            !sortOpen ? "search-results-sort" : "search-results-sort sort-open"
          } ${sortSet ? "sort-set" : ""}
        `}
        onClick={(e) => {
          e.preventDefault();
          setSortOpen(!sortOpen);
        }}
      >
        {sortSet ? sort : "Sort"} {!sortOpen && <VscChevronDown />}{" "}
        {sortOpen && <VscChevronUp />}
      </button>
      {sortOpen && (
        <SearchResultsSortDropdown
          setSortSet={setSortSet}
          sort={sort}
          setSort={setSort}
          searchPage={searchPage}
          setSortOpen={setSortOpen}
        />
      )}
    </div>
  );
};
