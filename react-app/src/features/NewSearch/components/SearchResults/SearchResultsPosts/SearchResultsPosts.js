import React, { useEffect } from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  searchCommunities,
  searchPosts,
  searchUsers,
} from "../../../../../store";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { PostResult } from "./PostResult";
import { CommunityResultsPreview } from "./CommunityResultsPreview";
import { UserResultsPreview } from "./UserResultsPreview";

export const SearchResultsPosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.search.posts);
  const users = useSelector((state) => state.search.users);

  const query = getSearchQuery();

  useEffect(() => {
    dispatch(searchPosts(query));
    dispatch(searchCommunities(query));
    dispatch(searchUsers(query));
  }, [dispatch]);

  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn searchPage="Posts" />
      <div className="search-results">
        <div className="search-results-left">
          {Object.values(posts).map((post) => (
            <PostResult post={post} />
          ))}
        </div>
        <div className="search-results-right">
          <CommunityResultsPreview query={query} />
          <UserResultsPreview />
        </div>
      </div>
    </SearchResults>
  );
};
