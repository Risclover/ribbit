import React from "react";
import { PostFormatFace } from "../../features/Posts/PostFormatDropdown";
import "./SortingBar.css";

export function SortingBar({
  community,
  sortMode,
  setSortMode,
  format,
  setFormat,
}) {
  return (
    <div className="post-sorting-bar">
      <div className="post-sorting-bar-left">
        <button
          className={`post-sorting-bar-btn ${
            sortMode === "new" && "active-sort-btn"
          } ${community && "community-sorting-bar-btn"}`}
          onClick={() => {
            sortMode !== "new" && setSortMode("new");
          }}
        >
          <i className="fa-solid fa-certificate"></i>
          New
        </button>

        <button
          className={`post-sorting-bar-btn ${
            sortMode === "top" && "active-sort-btn"
          } ${community && "community-sorting-bar-btn"}`}
          onClick={() => {
            sortMode !== "top" && setSortMode("top");
          }}
        >
          <i className="fa-solid fa-ranking-star"></i>
          Top
        </button>
      </div>
      {format !== "none" && (
        <PostFormatFace setFormat={setFormat} format={format} />
      )}
    </div>
  );
}
