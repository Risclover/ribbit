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

export const SearchResultsPosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.search.posts);
  const users = useSelector((state) => state.search.users);
  const communities = useSelector((state) => state.search.communities);

  const query = getSearchQuery();

  useEffect(() => {
    dispatch(searchPosts(query));
    dispatch(searchCommunities(query));
    dispatch(searchUsers(query));
  }, [dispatch]);

  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn searchPage="Posts" />
      {Object.values(posts).map((post) => (
        <div>{post.title}</div>
      ))}
      {Object.values(communities).map((community) => (
        <div>{community.name}</div>
      ))}
      {Object.values(users).map((user) => (
        <div>{user.username}</div>
      ))}
    </SearchResults>
  );
};
