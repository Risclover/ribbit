import React, { useContext } from "react";
import { PostFormatFace } from "../../features";
import { PostFormatContext } from "../../context/PostFormat";
import "./SortingBar.css";

export function SortingBar({ community, sortMode, setSortMode }) {
  const { format } = useContext(PostFormatContext);

  const handleNewClick = () => {
    setSortMode("new");
  };

  const handleTopClick = () => {
    setSortMode("top");
  };

  return (
    <div className="post-sorting-bar">
      <div className="post-sorting-bar-left">
        <button
          className={`post-sorting-bar-btn ${
            sortMode === "new" && "active-sort-btn"
          } ${community && "community-sorting-bar-btn"}`}
          onClick={handleNewClick}
        >
          <i className="fa-solid fa-certificate"></i>
          New
        </button>

        <button
          className={`post-sorting-bar-btn ${
            sortMode === "top" && "active-sort-btn"
          } ${community && "community-sorting-bar-btn"}`}
          onClick={handleTopClick}
        >
          <i className="fa-solid fa-ranking-star"></i>
          Top
        </button>
      </div>
      {format !== "none" && <PostFormatFace />}
    </div>
  );
}
