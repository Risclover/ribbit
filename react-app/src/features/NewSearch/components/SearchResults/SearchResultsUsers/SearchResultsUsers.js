import React, { useEffect, useState } from "react";
import { SearchResults } from "@/pages";
import { getSearchQuery } from "../../../utils/getSearchQuery";
import { focusSearchbar } from "../../../utils/focusSearchbar";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "@/store";
import { NoResults } from "../NoResults";
import { UserResult } from "./UserResult";
import { UserResultType } from "./UserResultType";

export const SearchResultsUsers = ({ searchbarRef }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.search.users));
  const query = getSearchQuery();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      setIsLoading(true);
      dispatch(searchUsers(query)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [query, dispatch]);

  const focusSearchBox = () => {
    focusSearchbar(searchbarRef);
  };

  return (
    <SearchResults query={query} searchPage="People">
      <div className="search-results">
        <div className="search-results-page-people">
          <UserResultType
            isLoading={isLoading}
            query={query}
            users={users}
            focusSearchBox={focusSearchBox}
          />
        </div>
      </div>
    </SearchResults>
  );
};
