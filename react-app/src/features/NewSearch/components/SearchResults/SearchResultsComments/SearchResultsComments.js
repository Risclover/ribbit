import React, { useEffect, useState } from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";

export function SearchResultsComments() {
  const [result, setResult] = useState();
  const query = getSearchQuery();
  return (
    <SearchResults query={query} searchPage="Comments">
      <SearchResultsSortBtn searchPage="Comments" />
      <img src={result?.image} />
    </SearchResults>
  );
}
