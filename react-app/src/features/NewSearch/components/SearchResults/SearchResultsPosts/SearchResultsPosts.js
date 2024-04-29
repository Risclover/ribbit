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
import { NewCommunity } from "./NewCommunity";
import { BackToTop } from "../../../../../components";
import parse from "html-react-parser";
import { stripHtml } from "../../../../../utils/stripHtml";
import { NoResults } from "../NoResults";

export const SearchResultsPosts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.search.posts);

  const query = getSearchQuery();

  console.log("query:", query);
  console.log("posts:", posts);

  useEffect(() => {
    let cleanQuery = stripHtml(query);
    dispatch(searchPosts(stripHtml(cleanQuery)));
    dispatch(searchCommunities(cleanQuery));
    dispatch(searchUsers(cleanQuery));
  }, [dispatch]);

  console.log(query);

  console.log(stripHtml(query));

  console.log("no results:", Object.values(posts).length);
  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn searchPage="Posts" />
      <div className="search-results">
        <div className="search-results-left">
          {Object.values(posts).length === 0 && <NoResults query={query} />}
          {Object.values(posts).map((post) => (
            <PostResult post={post} />
          ))}
        </div>
        <div className="search-results-right">
          <CommunityResultsPreview query={query} />
          <UserResultsPreview query={query} />
          <NewCommunity />
        </div>
      </div>
    </SearchResults>
  );
};
