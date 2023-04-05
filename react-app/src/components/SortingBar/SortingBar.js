import React from "react";

import "./SortingBar.css";
import PostFormatFace from "../../features/Posts/PostFormatDropdown/PostFormatFace";

export default function SortingBar({
  sortMode,
  setSortMode,
  format,
  setFormat,
}) {
  return (
    <div className="post-sorting-bar">
      <div className="post-sorting-bar-left">
        {sortMode === "new" ? (
          <button className="post-sorting-bar-btn active-sort-btn">
            <i className="fa-solid fa-certificate"></i>
            New
          </button>
        ) : (
          <button
            className="post-sorting-bar-btn"
            onClick={() => setSortMode("new")}
          >
            <i className="fa-solid fa-certificate"></i>
            New
          </button>
        )}
        {sortMode === "top" ? (
          <button className="post-sorting-bar-btn active-sort-btn">
            <i className="fa-solid fa-ranking-star"></i>
            Top
          </button>
        ) : (
          <button
            className="post-sorting-bar-btn"
            onClick={() => {
              setSortMode("top");
            }}
          >
            <i className="fa-solid fa-ranking-star"></i>
            Top
          </button>
        )}
      </div>
      {format === "none" ? (
        ""
      ) : (
        <PostFormatFace setFormat={setFormat} format={format} />
      )}
    </div>
  );
}
