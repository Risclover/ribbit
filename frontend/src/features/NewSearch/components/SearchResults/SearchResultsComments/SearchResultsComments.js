import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { SearchResultsSortBtn } from "../SearchResultsSorting/SearchResultsSort";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, searchComments } from "@/store";
import { CommentResult } from "./CommentResult";
import { NoResults } from "../NoResults";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import CommentResultType from "./CommentResultType";

export function SearchResultsComments({ searchbarRef }) {
  const dispatch = useDispatch();
  const query = getSearchQuery();

  const comments = useSelector((state) => Object.values(state.search.comments));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPosts());
    dispatch(searchComments(query)).finally(() => setIsLoading(false));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="Comments">
      <SearchResultsSortBtn searchPage="Comments" />
      <div className="search-results">
        <div className="search-results-page-comments">
          <CommentResultType
            isLoading={isLoading}
            comments={comments}
            query={query}
            focusSearchBox={focusSearchBox}
          />
        </div>
      </div>
    </SearchResults>
  );
}
