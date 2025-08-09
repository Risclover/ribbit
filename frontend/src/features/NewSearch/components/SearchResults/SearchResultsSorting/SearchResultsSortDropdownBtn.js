import React from "react";

export const SearchResultsSortDropdownBtn = ({ sort, btn, choose }) => {
  return (
    <li
      className={sort === btn && "sort-dropdown-btn-active"}
      tabIndex={0}
      onClick={() => {
        choose(btn);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          choose(btn);
        }
      }}
    >
      {btn}
    </li>
  );
};
