import React from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";

export const SearchResultsCommunities = () => {
  const query = getSearchQuery();
  return (
    <SearchResults query={query} searchPage="Communities">
      Communities
    </SearchResults>
  );
};
