import React, { useEffect, useState } from "react";
import { SearchResultsSortDropdownBtn } from "./SearchResultsSortDropdownBtn";

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

  useEffect(() => {
    console.log(`Sort updated to: ${sort}`);
  }, [sort]); // This effect will run whenever `sort` changes.

  return (
    <div className="search-results-sorting">
      <ul className="search-results-sort-dropdown">
        {btns.map((btn) => (
          <SearchResultsSortDropdownBtn
            key={btn}
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
