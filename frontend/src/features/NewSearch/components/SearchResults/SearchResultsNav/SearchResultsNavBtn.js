import React from "react";
import { useHistory } from "react-router-dom";

export const SearchResultsNavBtn = ({ searchPage, btn, query }) => {
  const history = useHistory();
  return (
    <button
      className={
        searchPage === btn
          ? "search-results-btn results-active"
          : "search-results-btn"
      }
      onClick={() =>
        history.push(
          `/search/${btn === "People" ? "users" : btn.toLowerCase()}?q=${query}`
        )
      }
    >
      {btn}
    </button>
  );
};
