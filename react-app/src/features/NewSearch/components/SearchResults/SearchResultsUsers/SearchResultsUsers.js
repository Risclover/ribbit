import React from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";

export const SearchResultsUsers = () => {
  const query = getSearchQuery();
  return (
    <SearchResults query={query} searchPage="Users">
      Users
    </SearchResults>
  );
};
