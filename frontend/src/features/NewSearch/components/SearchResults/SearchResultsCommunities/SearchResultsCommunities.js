import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { useAppDispatch, useAppSelector } from "@/store";
import { searchCommunities } from "@/store";
import CommunityResultType from "./CommunityResultType";

export const SearchResultsCommunities = ({ searchbarRef }) => {
  const dispatch = useAppDispatch();
  const communities = useAppSelector((state) =>
    Object.values(state.search.communities)
  );
  const query = useSearchQuery();
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
