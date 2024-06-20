import React from "react";
import { CommunityJoinBtn } from "./CommunityJoinBtn";
import { useHistory } from "react-router-dom";
import { CommunityImg } from "components/CommunityImg";

export const Community = ({ community }) => {
  const history = useHistory();
  return (
    <div onClick={() => history.push(`/c/${community.name}`)}>
      <div className="search-results-page-community">
        <div className="search-results-page-community-left">
          <CommunityImg
            imgSrc={community?.communitySettings[community?.id].communityIcon}
            imgClass="search-results-page-community-img"
            imgStyle={{
              backgroundColor: `${
                community?.communitySettings[community?.id].baseColor
              }`,
            }}
            imgAlt="Community"
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
