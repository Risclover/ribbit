import React from "react";
import { useHistory } from "react-router-dom";
import { CommunityJoinBtn } from "../SearchResultsPosts";
import { CommunityImg } from "@/components/CommunityImg";
import { Skeleton } from "@mui/material";
import { useDarkMode } from "hooks";

const CommunityResult = ({ community }) => {
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

const CommunitySkeleton = () => {
  const { theme } = useDarkMode();

  return (
    <div className="search-results-community">
      <div className="communities-results-skeleton">
        <div className="communities-results-skeleton-middle">
          <Skeleton
            variant="circular"
            width={36}
            height={36}
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
          />
          <div className="communities-results-skeleton-text">
            <Skeleton
              variant="text"
              sx={{
                fontSize: "0.75rem",
                bgcolor: theme === "dark" && "grey.500",
              }}
              width={170}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{
                fontSize: "0.75rem",
                bgcolor: theme === "dark" && "grey.500",
              }}
              width={600}
              animation="wave"
            />
          </div>
        </div>
        <Skeleton
          variant="rounded"
          sx={{
            borderRadius: "1000px",
            bgcolor: theme === "dark" && "grey.500",
          }}
          height={32}
          width={86}
          animation="wave"
        />
      </div>
    </div>
  );
};

CommunityResult.Skeleton = CommunitySkeleton;

export { CommunityResult };
