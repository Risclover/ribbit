import React from "react";
import { useHistory } from "react-router-dom";
import { UserFollowBtn } from "../SearchResultsPosts";
import { useSelector } from "react-redux";

export const UserResult = ({ user }) => {
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
