import React from "react";
import { NavLink } from "react-router-dom";
import { JoinBtn } from "./JoinBtn";

export const Community = ({ community }) => {
  return (
    <NavLink to={`/c/${community.name}`}>
      <div className="search-result-page-community">
        <div className="search-result-page-community-left">
          <div className="search-result-page-community-img">
            <img
              style={{
                backgroundColor: `${
                  community?.communitySettings[community?.id].baseColor
                }`,
              }}
              src={community?.communitySettings[community?.id].communityIcon}
              alt="Community"
            />
            &nbsp;
          </div>
          <div className="search-result-community-details">
            <div className="search-result-page-community-name">
              c/{community.name}
            </div>
            <div className="search-result-page-community-members">
              {community.members}{" "}
              {community.members === 1 ? "Member" : "Members"}
            </div>
          </div>
        </div>
        <div className="search-result-page-community-right">
          <JoinBtn community={community} />
        </div>
      </div>
    </NavLink>
  );
};
