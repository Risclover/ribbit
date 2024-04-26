import React, { useState } from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";

export function SearchResultsComments() {
  const query = getSearchQuery();

  return (
    <SearchResults query={query} searchPage="Comments">
      Hello!!!
    </SearchResults>
  );
}
