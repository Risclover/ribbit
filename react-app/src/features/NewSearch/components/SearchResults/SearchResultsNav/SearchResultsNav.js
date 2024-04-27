import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchResultsNav.css";
import { SearchResultsNavBtn } from "./SearchResultsNavBtn";

export const SearchResultsNav = ({ query, searchPage }) => {
  const btns = ["Posts", "Comments", "Communities", "People"];

  return (
    <div className="search-results-btns">
      {btns.map((btn) => (
        <SearchResultsNavBtn searchPage={searchPage} btn={btn} query={query} />
      ))}
    </div>
  );
};
