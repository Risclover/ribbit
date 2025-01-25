import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { useDispatch, useSelector } from "react-redux";
import { searchCommunities, searchPosts, searchUsers } from "@/store";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";
import { PostResult } from "./PostResult";
import { CommunityResultsPreview } from "./CommunityResultsPreview";
import { UserResultsPreview } from "./UserResultsPreview";
import { NewCommunity } from "./NewCommunity";
import { stripHtml } from "@/utils/stripHtml";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { PostResultType } from "./PostResultType";
import { getPosts } from "store";

export const SearchResultsPosts = ({ searchbarRef }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => Object.values(state.search.posts));
  const communities = useSelector((state) =>
    Object.values(state.search.communities)
  );
  const users = useSelector((state) => Object.values(state.search.users));

  const [isLoading, setIsLoading] = useState(false);

  let query = getSearchQuery();

  useEffect(() => {
    setIsLoading(true);

    let cleanQuery = stripHtml(query);

    Promise.all([
      dispatch(searchPosts(stripHtml(cleanQuery))),
      dispatch(searchCommunities(cleanQuery)),
      dispatch(searchUsers(cleanQuery)),
    ]).finally(() => setIsLoading(false));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn searchPage="Posts" />
      <div className="search-results">
        <div className="search-results-left">
          <PostResultType
            isLoading={isLoading}
            posts={posts}
            query={query}
            focusSearchBox={focusSearchBox}
          />
        </div>
        <div className="search-results-right">
          <CommunityResultsPreview query={query} isLoading={isLoading} />
          <UserResultsPreview query={query} isLoading={isLoading} />
          <NewCommunity />
        </div>
      </div>
    </SearchResults>
  );
};
