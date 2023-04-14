import React from "react";
import { NavLink } from "react-router-dom";

export default function UserOwnedCommunities({ communitiesList, userId }) {
  return (
    <div className="user-profile-owned-communities">
      {communitiesList.length > 0 ? (
        <h2>You're the owner of these communities.</h2>
      ) : (
        <h2>You aren't the owner of any communities.</h2>
      )}
      <div className="user-profile-owned-communities-box">
        {communitiesList.map((community) =>
          community.communityOwner.id === userId ? (
            <div className="profile-owned-community">
              <div className="profile-owned-community-left">
                <div className="owned-community-icon">
                  <img src={community.communityImg} alt="Community" />
                </div>
                <div className="owned-community-info">
                  <span className="owned-community-title">
                    <NavLink to={`/c/${community.id}`}>
                      c/{community.name}
                    </NavLink>
                  </span>
                  <span className="owned-community-members">
                    {community.members}{" "}
                    {community.members === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
