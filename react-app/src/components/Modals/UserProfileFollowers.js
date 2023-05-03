import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getFollowers } from "../../store/followers";
import FollowingBtn from "../../pages/UserProfile/FollowingBtn";

import "../../pages/UserProfile/UserProfile.css";

export default function UserProfileFollowers({ setShowFollowersModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const followers = useSelector((state) => state.followers.followers);
  const follows = useSelector((state) => state.followers.follows);

  useEffect(() => {
    dispatch(getFollowers());
  }, [dispatch]);

  return (
    <div className="user-profile-followers-page">
      <div className="user-profile-followers-head">
        <div className="user-profile-followers-head-left">
          <div className="user-profile-followers-head-title">Followers</div>
          <div className="user-profile-followers-head-desc">
            This list is only visible to you. The most recent follows are shown
            first.
          </div>
        </div>
        <div className="user-profile-followers-head-right">
          {/* <input
            type="text"
            placeholder="Search for a user"
            className="user-profile-followers-search-input"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="user-profile-followers-search-btn">
            <BiSearch />
          </button> */}
        </div>
      </div>
      <div className="user-profile-followers-list">
        {Object.values(followers).length === 0 && (
          <div className="no-followers-msg">
            You don't currently have any followers.
          </div>
        )}
        {Object.values(followers).map((follower) => (
          <div className="user-profile-follower">
            <div
              className="user-profile-follower-left"
              onClick={() => {
                history.push(`/users/${follower.id}/profile`);
                setShowFollowersModal(false);
              }}
            >
              <img
                className="user-profile-follower-img"
                src={follower.profile_img}
                alt="Follower"
              />
              {follower.username}
            </div>
            <FollowingBtn user={follower} follows={follows} />
          </div>
        ))}
      </div>
    </div>
  );
}
