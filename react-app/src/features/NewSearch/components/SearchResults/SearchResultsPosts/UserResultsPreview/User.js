import React from "react";
import { NavLink } from "react-router-dom";
import { UserFollowBtn } from "./UserFollowBtn";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const User = ({ user }) => {
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

const UserSkeleton = () => {
  return (
    <div className="search-results-page-community">
      <div className="post-results-communities-skeleton">
        <div className="post-results-communities-skeleton-left">
          <Skeleton
            variant="circular"
            height={36}
            width={36}
            animation="wave"
          />
          <div className="post-results-communities-skeleton-mid">
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem" }}
              width={100}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem" }}
              width={67}
              animation="wave"
            />
          </div>
        </div>
        <Skeleton
          variant="rounded"
          sx={{ borderRadius: "1000px" }}
          height={32}
          width={86}
          animation="wave"
        />
      </div>
    </div>
  );
};

User.UserSkeleton = UserSkeleton;

export { User };
