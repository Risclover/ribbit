import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./PostSkeleton.css";
import { UpvoteIcon } from "assets/icons/UpvoteIcon";
import { DownvoteIcon } from "assets/icons/DownvoteIcon";

export default function PostSkeleton() {
  return (
    <div className="post-skeleton-container">
      <div className="post-skeleton-voting">
        <UpvoteIcon />
        <div className="post-skeleton-voting-num"></div>
        <DownvoteIcon />
      </div>
      <div className="post-skeleton-content">
        <Skeleton
          sx={{ bgcolor: "grey.100", fontsize: "16px" }}
          variant="text"
          animation="wave"
          width="232px"
        />
        <Skeleton
          sx={{ bgcolor: "grey.100" }}
          variant="text"
          animation="wave"
          width="328px"
          height={36}
        />
        <Skeleton
          sx={{ bgcolor: "grey.100" }}
          variant="rectangular"
          animation="wave"
          height="343px"
        />
        <div className="post-skeleton-buttons">
          <Skeleton
            sx={{ bgcolor: "grey.100" }}
            variant="text"
            animation="wave"
            width="110px"
            height={26}
          />
          <Skeleton
            sx={{ bgcolor: "grey.100" }}
            variant="text"
            animation="wave"
            width="20px"
            height={26}
          />
        </div>
      </div>
    </div>
  );
}
