import React from "react";
import { SearchResultsSortDropdownBtn } from "./SearchResultsSortDropdownBtn";
import { v4 as uuidv4 } from "uuid";

export const SearchResultsSortDropdown = ({ sort, choose, searchPage }) => {
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
            sort={sort}
            choose={choose}
          />
        ))}
      </ul>
    </div>
  );
};
