import React from "react";

export function SearchResultsTimeBtn({
  time,
  setTime,
  btn,
  setTimeOpen,
}) {
  return (
    <button
      className={time === btn && "sort-dropdown-btn-active"}
      onClick={() => {
        setTime(`${btn}`);
        setTimeOpen(false);
      }}
    >
      {btn}
    </button>
  );
}
