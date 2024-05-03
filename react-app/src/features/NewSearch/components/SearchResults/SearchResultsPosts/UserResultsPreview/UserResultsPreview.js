import React from "react";
import { User } from "./User";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const UserResultsPreview = ({ query }) => {
  const history = useHistory();
  const users = useSelector((state) => Object.values(state.search.users));

  return (
    <div className="search-results-right-box">
      <h4>People</h4>
      {query.trim().length > 0 &&
        users.map((user) => <User user={user} />).slice(0, 5)}

      {query.trim().length > 0 && users.length > 5 && (
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
