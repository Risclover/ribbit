import { CommunityImg } from "components/CommunityImg";
import React from "react";
import { NavLink } from "react-router-dom";

export function UserOwnedCommunity({ community }) {
  return (
    <div className="profile-owned-community">
      <div className="profile-owned-community-left">
        <div className="owned-community-icon">
          <CommunityImg
            imgStyle={{
              backgroundColor: `${
                community.communitySettings[community.id].baseColor
              }`,
            }}
            imgSrc={community.communitySettings[community.id].communityIcon}
            imgAlt="Community"
          />
        </div>
        <div className="owned-community-info">
          <span className="owned-community-title">
            <NavLink to={`/c/${community.name}`}>c/{community.name}</NavLink>
          </span>
          <span className="owned-community-members">
            {community.members} {community.members === 1 ? "member" : "members"}
          </span>
        </div>
      </div>
    </div>
  );
}
