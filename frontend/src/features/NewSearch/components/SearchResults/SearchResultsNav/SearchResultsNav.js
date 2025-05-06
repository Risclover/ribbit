import React from "react";
import { SearchResultsNavBtn } from "./SearchResultsNavBtn";
import "./SearchResultsNav.css";
import { v4 as uuidv4 } from "uuid";

export const SearchResultsNav = ({ query, searchPage }) => {
  const btns = ["Posts", "Comments", "Communities", "People"];

  return (
    <div className="search-results-btns">
      {btns.map((btn, idx) => (
        <SearchResultsNavBtn
          key={uuidv4()}
          searchPage={searchPage}
          btn={btn}
          query={query}
        />
      ))}
    </div>
  );
};
