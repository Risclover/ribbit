import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { useDarkMode } from "@/hooks";
import "../styles/NewPosts.css";

export function SinglePostSkeleton() {
  const { theme } = useDarkMode();
  return (
    <div className="post-skeleton-container classic-post-container">
      <div className="single-post-karmabar">
        <div className="post-skeleton-voting-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height={24}
            width={24}
            viewBox="0 0 256 256"
            id="Flat"
            stroke="currentColor"
            strokeWidth="3.5840000000000005"
          >
            <path d="M226.82812,117.17187l-96-96a3.99854,3.99854,0,0,0-5.65625,0l-96,96A3.99989,3.99989,0,0,0,32,124H76v84a12.01312,12.01312,0,0,0,12,12h80a12.01312,12.01312,0,0,0,12-12V124h44a3.99988,3.99988,0,0,0,2.82812-6.82813ZM176,116a4.0002,4.0002,0,0,0-4,4v88a4.004,4.004,0,0,1-4,4H88a4.004,4.004,0,0,1-4-4V120a4.0002,4.0002,0,0,0-4-4H41.65723L128,29.65723,214.34277,116Z" />
          </svg>
        </div>
        <div className="post-skeleton-voting-btn">
          <svg
            fill="currentColor"
            height={24}
            width={24}
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="3.5840000000000005"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M227.69531,134.46973A3.99919,3.99919,0,0,0,224,132H180V48a12.01312,12.01312,0,0,0-12-12H88A12.01312,12.01312,0,0,0,76,48v84H32a3.99988,3.99988,0,0,0-2.82813,6.82812l96,96a3.99853,3.99853,0,0,0,5.65625,0l96-96A3.9978,3.9978,0,0,0,227.69531,134.46973ZM128,226.34277,41.65723,140H80a4.0002,4.0002,0,0,0,4-4V48a4.004,4.004,0,0,1,4-4h80a4.004,4.004,0,0,1,4,4v88a4.0002,4.0002,0,0,0,4,4h38.34277Z"></path>{" "}
            </g>
          </svg>
        </div>
      </div>
      <div className="post-skeleton-main classic-post-main">
        <div className="classic-post-content-box">
          <Skeleton
            className="classic-post-content-img"
            variant="rounded"
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
            width={96}
            height={72}
          />
          <div className="classic-post-content-body">
            <div className="post-skeleton-main-top">
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  bgcolor: theme === "dark" && "grey.500",
                  maxWidth: "300px",
                }}
                width="100%"
                height={35}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  bgcolor: theme === "dark" && "grey.500",
                  marginTop: "-4px",
                  marginBottom: "4px",
                }}
                width={100}
                height={20}
              />
            </div>
            <div className="single-post-button-bar">
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ bgcolor: theme === "dark" && "grey.500" }}
                width={15}
                height={23}
              />
              <div className="post-btn-separator"></div>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  bgcolor: theme === "dark" && "grey.500",
                  marginRight: "8px",
                  maxWidth: "150px",
                }}
                width="100%"
                height={23}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ bgcolor: theme === "dark" && "grey.500" }}
                width={18}
                height={23}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
