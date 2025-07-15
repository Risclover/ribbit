import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { useAppDispatch, useAppSelector } from "@/store";
import { searchCommunities, searchPosts, searchUsers } from "@/store";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";
import { PostResult } from "./PostResult";
import { CommunityResultsPreview } from "./CommunityResultsPreview";
import { UserResultsPreview } from "./UserResultsPreview";
import { NewCommunity } from "./NewCommunity";
import { stripHtml } from "@/utils/stripHtml";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { PostResultType } from "./PostResultType";
import { getPosts } from "@/store";
import { sortPosts } from "utils";
import { sortPostResults } from "features/NewSearch/utils/sortPostResults";

export const SearchResultsPosts = ({ searchbarRef }) => {
  const dispatch = useAppDispatch();

  const rawPosts = useAppSelector((s) => Object.values(s.search.posts));
  const communities = useAppSelector((state) =>
    Object.values(state.search.communities)
  );
  const users = useAppSelector((state) => Object.values(state.search.users));

  const [sortMode, setSortMode] = useState("Top");
  const [isLoading, setIsLoading] = useState(true);

  let query = useSearchQuery();

  useEffect(() => {
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

  const posts = sortPostResults(rawPosts, sortMode);

  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn
        searchPage="Posts"
        sort={sortMode}
        setSort={setSortMode}
      />
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
