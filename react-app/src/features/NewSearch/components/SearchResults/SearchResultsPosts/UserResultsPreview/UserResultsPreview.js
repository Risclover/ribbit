import React, { useEffect } from "react";
import { User } from "./User";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "store";
import { UserResultType } from "./UserResultType";

export const UserResultsPreview = ({ query, isLoading }) => {
  const history = useHistory();
  const users = useSelector((state) => Object.values(state.search.users));

  return (
    <div className="search-results-right-box">
      <h4>People</h4>
      <UserResultType isLoading={isLoading} users={users} />

      {query.trim().length > 0 && users.length > 5 && !isLoading && (
        <div
          className="see-more-btn"
          onClick={() => history.push(`/search/users?q=${query}`)}
        >
          See more people
        </div>
      )}
      {(query.trim().length === 0 || users.length === 0) && (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};
