import React, { useEffect } from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  searchCommunities,
  searchPosts,
  searchUsers,
} from "../../../../../store";

export const SearchResultsPosts = () => {
  const dispatch = useDispatch();
  const query = getSearchQuery();

  const posts = useSelector((state) => state.search.posts);
  const users = useSelector((state) => state.search.users);
  const communities = useSelector((state) => state.search.communities);

  console.log("posts:", posts);
  console.log("users:", users);
  console.log("communities:", communities);

  useEffect(() => {
    dispatch(searchPosts(query));
    dispatch(searchCommunities(query));
    dispatch(searchUsers(query));
  }, [dispatch]);

  return (
    <SearchResults query={query} searchPage="Posts">
      Posts
    </SearchResults>
  );
};
