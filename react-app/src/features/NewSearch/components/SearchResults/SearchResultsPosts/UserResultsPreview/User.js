import React from "react";
import { NavLink } from "react-router-dom";
import { UserFollowBtn } from "./UserFollowBtn";
import { useSelector } from "react-redux";

export const User = ({ user }) => {
  const currentUser = useSelector((state) => state.session.user);
  return (
    <NavLink to={`/users/${user.id}/profile`}>
      <div className="search-results-page-community">
        <div className="search-results-page-community-left">
          <img
            style={{ backgroundColor: "white" }}
            src={user?.profileImg}
            alt="User"
            className="search-results-page-community-img"
          />
          <div className="search-results-page-community-details">
            <div className="search-results-page-community-name">
              u/{user.username}
            </div>
            <div className="search-results-page-community-members">
              {user.karma} Karma
            </div>
          </div>
        </div>
        {currentUser && currentUser?.id !== user.id && (
          <div className="search-results-page-community-right">
            <UserFollowBtn user={user} />
          </div>
        )}
      </div>
    </NavLink>
  );
};
