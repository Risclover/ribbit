import React, { useEffect } from "react";

export const SearchResultsSortDropdownBtn = ({
  sort,
  btn,
  setSort,
  setSortOpen,
  setSortSet,
}) => {
  return (
    <li
      className={sort === btn && "sort-dropdown-btn-active"}
      onClick={() => {
        setSort(btn);
        setSortOpen(false);
        setSortSet(true);
        console.log(sort, btn);
      }}
    >
      {btn}
    </li>
  );
};
