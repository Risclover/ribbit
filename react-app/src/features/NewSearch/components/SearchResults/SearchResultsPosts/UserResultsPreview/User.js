import React from "react";
import { NavLink } from "react-router-dom";

export const User = ({ user }) => {
  return (
    <NavLink to={`/users/${user.id}/profile`}>
      <div className="search-result-page-community">
        <div className="search-result-page-community-left">
          <div className="search-result-page-community-img">
            <img src={user?.profile_img} alt="User" />
          </div>
          <div className="search-result-page-community-details">
            <div className="search-result-page-community-name">
              u/{user.username}
            </div>
            <div className="search-result-page-community-members">
              {user.karma} karma
            </div>
          </div>
        </div>
        <div className="search-result-page-community-right">
          {/* <button
    className="search-results-page-person-join"
    onClick={(e) => e.preventDefault()}
  >
    Follow
  </button> */}
        </div>
      </div>
    </NavLink>
  );
};
