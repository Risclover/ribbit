import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { searchCommunities } from "@/store";
import { NoResults } from "../NoResults";
import { CommunityResult } from "./CommunityResult";
import CommunityResultType from "./CommunityResultType";

export const SearchResultsCommunities = ({ searchbarRef }) => {
  const dispatch = useDispatch();
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );
  const query = getSearchQuery();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (communities.length === 0) {
      setIsLoading(true);
      dispatch(searchCommunities(query)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Communities">
      <div className="search-results">
        <div className="search-results-page-communities">
          <CommunityResultType
            isLoading={isLoading}
            communities={communities}
            query={query}
            focusSearchBox={focusSearchBox}
          />
        </div>
      </div>
    </SearchResults>
  );
};
