import React, { useEffect } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "@/store";
import { NoResults } from "../NoResults";
import { UserResult } from "./UserResult";

export const SearchResultsUsers = ({ searchbarRef }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.search.users));
  const query = getSearchQuery();

  useEffect(() => {
    dispatch(searchUsers(query));
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="People">
      <div className="search-results">
        <div className="search-results-page-people">
          {(query.trim().length === 0 || users.length === 0) && (
            <NoResults query={query} focusSearchBox={focusSearchBox} />
          )}
          {query.trim().length > 0 &&
            users.map((user) => <UserResult key={user.id} user={user} />)}
        </div>
      </div>
    </SearchResults>
  );
};
