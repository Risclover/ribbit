import React, { useRef, useState } from "react";
import { SearchResultsSortDropdown } from "./SearchResultsSortDropdown";
import { useOutsideClick } from "@/hooks";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import "./SearchResultsSort.css";

export const SearchResultsSortBtn = ({ searchPage, sort, setSort }) => {
  const wrapperRef = useRef();
  const [open, setOpen] = useState(false);

  useOutsideClick(wrapperRef, () => setOpen(false));

  const choose = (mode) => {
    setSort(mode); // lift up
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="search-results-sort-bar">
      <button
        className={`search-results-sort${open ? " sort-open" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {sort} {open ? <VscChevronUp /> : <VscChevronDown />}
      </button>

      {open && (
        <SearchResultsSortDropdown
          current={sort}
          choose={choose} // ↓ new prop
          searchPage={searchPage}
        />
      )}
    </div>
  );
};
