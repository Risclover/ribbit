import React, { useEffect, useRef, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import HandleClickOutside from "../../../utils/HandleClickOutside";
import SearchResultsSortBtn from "./SearchResultsSortBtn";

export default function SearchResultsSort({ searchPage }) {
  const wrapperRef = useRef(null);

  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Relevance");

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, sortOpen, setSortOpen);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, sortOpen, setSortOpen);
      });
    };
  }, [wrapperRef, sortOpen]);

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
