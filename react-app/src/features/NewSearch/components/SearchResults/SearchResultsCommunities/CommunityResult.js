import React from "react";
import { useHistory } from "react-router-dom";
import { CommunityJoinBtn } from "../SearchResultsPosts";
import { CommunityImg } from "components/CommunityImg";

export const CommunityResult = ({ community }) => {
  const history = useHistory();

  const handleCommunityClick = (e) => {
    e.preventDefault();
    history.push(`/c/${community.name}`);
  };
  return (
    <div onClick={handleCommunityClick}>
      <div className="search-results-community">
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
          <div className="search-results-page-community-details">
            <div className="search-results-page-community-details-top">
              <span className="search-results-page-community-name">
                c/{community.name}
              </span>
              <span className="search-results-page-community-dot">•</span>
              <span className="search-results-page-community-members">
                {community.members} members
              </span>
            </div>
            <div className="search-results-page-community-details-bottom">
              {community.description}
            </div>
          </div>
          <div className="search-results-page-community-right">
            <CommunityJoinBtn community={community} />
          </div>
        </div>
      </div>
    </div>
  );
};
