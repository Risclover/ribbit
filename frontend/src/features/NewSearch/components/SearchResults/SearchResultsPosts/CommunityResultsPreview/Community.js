import React from "react";
import { CommunityJoinBtn } from "./CommunityJoinBtn";
import { useHistory } from "react-router-dom";
import { CommunityImg } from "@/components/CommunityImg";
import { Skeleton } from "@mui/material";
import { useDarkMode } from "@/hooks";

const Community = ({ community }) => {
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

const CommunitySkeleton = () => {
  const { theme } = useDarkMode();

  return (
    <div className="search-results-page-community">
      <div className="post-results-communities-skeleton">
        <div className="post-results-communities-skeleton-left">
          <Skeleton
            variant="circular"
            height={36}
            width={36}
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
          />
          <div className="post-results-communities-skeleton-mid">
            <Skeleton
              variant="text"
              sx={{
                fontSize: "0.75rem",
                bgcolor: theme === "dark" && "grey.500",
              }}
              width={100}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{
                fontSize: "0.75rem",
                bgcolor: theme === "dark" && "grey.500",
              }}
              width={67}
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

Community.CommunitySkeleton = CommunitySkeleton;

export { Community };
