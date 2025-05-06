import React from "react";
import { SearchResultsSortDropdownBtn } from "./SearchResultsSortDropdownBtn";
import { v4 as uuidv4 } from 'uuid';

export const SearchResultsSortDropdown = ({
  setSortSet,
  sort,
  setSort,
  searchPage,
  setSortOpen,
}) => {
  const btns = ["Top", "Worst", "New", "Controversial"];

  if (searchPage === "Posts") {
    btns.push("Most Comments");
  }

  return (
    <div className="search-results-sorting">
      <ul className="search-results-sort-dropdown">
        {btns.map((btn) => (
          <SearchResultsSortDropdownBtn
            key={uuidv4()}
            btn={btn}
            setSortSet={setSortSet}
            sort={sort}
            setSort={setSort}
            setSortOpen={setSortOpen}
          />
        ))}
      </ul>
    </div>
  );
};
