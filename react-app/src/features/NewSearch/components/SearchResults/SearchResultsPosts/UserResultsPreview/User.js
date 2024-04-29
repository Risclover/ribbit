import React from "react";
import { NavLink } from "react-router-dom";
import { UserFollowBtn } from "./UserFollowBtn";
import { useSelector } from "react-redux";

export const User = ({ user }) => {
  const currentUser = useSelector((state) => state.session.user);
  if (!user) return null;
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
              {user.karma} Karma
            </div>
          </div>
        </div>
        {currentUser.id !== user.id && (
          <div className="search-result-page-community-right">
            <UserFollowBtn user={user} />
          </div>
        )}
      </div>
    </NavLink>
  );
};
