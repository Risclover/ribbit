import React, { useEffect } from "react";
import { SearchResults } from "../../../../../pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../../../../store";

export const SearchResultsPosts = () => {
  const dispatch = useDispatch();
  const query = getSearchQuery();

  const posts = useSelector((state) => state.search);

  console.log("posts:", posts);

  useEffect(() => {
    dispatch(searchPosts(query));
  }, [dispatch]);

  return (
    <SearchResults query={query} searchPage="Posts">
      Posts
    </SearchResults>
  );
};
