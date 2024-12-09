import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./PostSkeleton.css";
import { UpvoteIcon } from "assets/icons/UpvoteIcon";
import { DownvoteIcon } from "assets/icons/DownvoteIcon";

export function ClassicPostSkeleton() {
  return (
    <div className="classic-post-skeleton-container">
      <div className="post-skeleton-voting">
        <UpvoteIcon />
        <div className="post-skeleton-voting-num"></div>
        <DownvoteIcon />
      </div>
      <div className="classic-post-skeleton-content">
        <div className="classic-post-skeleton-img">
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ bgcolor: "grey.100" }}
            height={72}
            width={96}
          />
        </div>
        <div className="classic-post-skeleton-right">
          <div className="classic-post-skeleton-title">
            <Skeleton
              animation="wave"
              variant="text"
              width="328px"
              height={36}
              sx={{ bgcolor: "grey.100" }}
            />
          </div>
          <div className="classic-post-skeleton-author">
            <Skeleton
              animation="wave"
              variant="text"
              width="88px"
              sx={{ bgcolor: "grey.100" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
