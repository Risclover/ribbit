import React, { useEffect, useState } from "react";
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
import { focusSearchbar } from "../../../utils/focusSearchbar";

export const SearchResultsPosts = ({ searchbarRef }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.search.posts);

  let query = getSearchQuery();

  useEffect(() => {
    let cleanQuery = stripHtml(query);
    dispatch(searchPosts(stripHtml(cleanQuery)));
    dispatch(searchCommunities(cleanQuery));
    dispatch(searchUsers(cleanQuery));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Posts">
      <SearchResultsSortBtn searchPage="Posts" />
      <div className="search-results">
        <div className="search-results-left">
          {Object.values(posts).length === 0 && (
            <NoResults query={query} focusSearchBox={focusSearchBox} />
          )}
          {Object.values(posts).map((post, index) => (
            <PostResult key={index} post={post} />
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
