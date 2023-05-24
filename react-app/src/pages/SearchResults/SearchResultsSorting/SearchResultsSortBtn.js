import React from "react";

export default function SearchResultsSortBtn({
  key,
  sort,
  setSort,
  btn,
  setSortOpen,
}) {
  return (
    <button
      key={key}
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
