import React from "react";
import { SearchResultsNavBtn } from "./SearchResultsNavBtn";
import "./SearchResultsNav.css";

export const SearchResultsNav = ({ query, searchPage }) => {
  const btns = ["Posts", "Comments", "Communities", "People"];

  return (
    <div className="search-results-btns">
      {btns.map((btn, idx) => (
        <SearchResultsNavBtn
          key={idx}
          searchPage={searchPage}
          btn={btn}
          query={query}
        />
      ))}
    </div>
  );
};
