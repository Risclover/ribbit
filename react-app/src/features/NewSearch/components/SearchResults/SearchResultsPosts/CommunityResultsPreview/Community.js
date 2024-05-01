import React from "react";
import { NavLink } from "react-router-dom";
import { CommunityJoinBtn } from "./CommunityJoinBtn";
import { useHistory } from "react-router-dom";

export const Community = ({ community }) => {
  const history = useHistory();
  return (
    <div onClick={() => history.push(`/c/${community.name}`)}>
      <div className="search-results-page-community">
        <div className="search-results-page-community-left">
          <img
            className="search-results-page-community-img"
            style={{
              backgroundColor: `${
                community?.communitySettings[community?.id].baseColor
              }`,
            }}
            src={community?.communitySettings[community?.id].communityIcon}
            alt="Community"
          />
          &nbsp;
          <div className="search-results-community-details">
            <div className="search-results-page-community-name">
              c/{community.name}
            </div>
            <div className="search-results-page-community-members">
              {community.members}{" "}
              {community.members === 1 ? "Member" : "Members"}
            </div>
          </div>
        </div>
        <div className="search-results-page-community-right">
          <CommunityJoinBtn community={community} />
        </div>
      </div>
    </div>
  );
};
