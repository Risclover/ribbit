import React from "react";

export const SearchResultsSortDropdownBtn = ({
  sort,
  btn,
  choose,
}) => {
  return (
    <li
      className={sort === btn && "sort-dropdown-btn-active"}
      onClick={() => {
        choose(btn);
      }}
    >
      {btn}
    </li>
  );
};
