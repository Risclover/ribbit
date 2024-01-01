import React from "react";

export function SearchResultsSortBtn({ key, sort, setSort, btn, setSortOpen }) {
  return (
    <button
      className={sort === btn && "sort-dropdown-btn-active"}
      onClick={() => {
        setSort(`${btn}`);
        setSortOpen(false);
      }}
    >
      {btn}
    </button>
  );
}
