import React, { useEffect } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { searchCommunities } from "@/store";
import { NoResults } from "../NoResults";
import { CommunityResult } from "./CommunityResult";

export const SearchResultsCommunities = ({ searchbarRef }) => {
  const dispatch = useDispatch();
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );
  const query = getSearchQuery();

  useEffect(() => {
    dispatch(searchCommunities(query));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Communities">
      <div className="search-results">
        <div className="search-results-page-communities">
          {(query.trim().length === 0 || communities.length === 0) && (
            <NoResults query={query} focusSearchBox={focusSearchBox} />
          )}
          {query.trim().length > 0 &&
            communities.map((community) => (
              <CommunityResult community={community} />
            ))}
        </div>
      </div>
    </SearchResults>
  );
};
