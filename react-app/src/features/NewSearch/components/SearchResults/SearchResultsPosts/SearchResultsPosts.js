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
import { NoResults } from "../NoResults";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { v4 as uuidv4 } from "uuid";

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
          {(query.trim().length === 0 || Object.values(posts).length === 0) && (
            <NoResults query={query} focusSearchBox={focusSearchBox} />
          )}
          {query.trim().length > 0 &&
            Object.values(posts).map((post) => (
              <PostResult key={uuidv4()} post={post} />
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
