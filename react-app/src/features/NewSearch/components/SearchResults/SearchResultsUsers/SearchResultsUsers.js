import React from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";

export const SearchResultsUsers = ({ searchbarRef }) => {
  const query = getSearchQuery();

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="People">
      Users
    </SearchResults>
  );
};
