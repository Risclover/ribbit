import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getPosts, searchComments } from "@/store";
import { CommentResult } from "./CommentResult";
import { NoResults } from "../NoResults";
import { focusSearchbar } from "../../../utils/focusSearchbar";

export function SearchResultsComments({ searchbarRef }) {
  const dispatch = useDispatch();
  const query = getSearchQuery();

  const comments = useSelector((state) => Object.values(state.search.comments));

  useEffect(() => {
    dispatch(getPosts());
    dispatch(searchComments(query));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Comments">
      <SearchResultsSortBtn searchPage="Comments" />
      <div className="search-results">
        <div className="search-results-page-comments">
          {(query.trim().length === 0 || comments.length === 0) && (
            <NoResults query={query} focusSearchBox={focusSearchBox} />
          )}
          {query.trim().length > 0 &&
            comments.map((comment) => <CommentResult comment={comment} />)}
        </div>
      </div>
    </SearchResults>
  );
}
