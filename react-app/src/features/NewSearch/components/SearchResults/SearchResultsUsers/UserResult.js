import React from "react";
import { useHistory } from "react-router-dom";
import { UserFollowBtn } from "../SearchResultsPosts";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const UserResult = ({ user }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div onClick={() => history.push(`/users/${user.id}/profile`)}>
      <div className="search-results-page-person">
        <div className="search-results-page-community-left">
          <img
            style={{ backgroundColor: "white" }}
            src={user.profileImg}
            className="search-results-page-community-img"
            alt="User"
          />
          <div className="search-results-page-community-details">
            <div className="search-results-page-community-details-top">
              <span className="search-results-page-community-name">
                u/{user.username}
              </span>
              <span className="search-results-page-community-dot">•</span>
              <span className="search-results-page-community-members">
                {user.karma} karma
              </span>
            </div>
            <div className="search-results-page-community-details-bottom">
              {user.about}
            </div>
          </div>
        </div>
        {currentUser && currentUser?.id !== user.id && (
          <div className="search-results-page-community-right">
            <UserFollowBtn user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

const UserSkeleton = () => {
  return (
    <div className="search-results-page-person">
      <div className="communities-results-skeleton">
        <div className="communities-results-skeleton-middle">
          <Skeleton
            variant="circular"
            width={36}
            height={36}
            animation="wave"
          />
          <div className="communities-results-skeleton-text">
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem" }}
              width={170}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.75rem" }}
              width={600}
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

UserResult.Skeleton = UserSkeleton;

export { UserResult };
