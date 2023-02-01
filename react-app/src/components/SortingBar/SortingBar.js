import React from "react";

import "./SortingBar.css";

export default function SortingBar({ sortMode, setSortMode }) {
  return (
    <div className="post-sorting-bar">
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
      {/* <button className="post-sorting-bar-btn">
        <i className="fa-solid fa-fire-flame-simple"></i>
        Hot
      </button> */}
      {sortMode === "top" ? (
        <button className="post-sorting-bar-btn active-sort-btn">
          <i className="fa-solid fa-ranking-star"></i>
          Top
        </button>
      ) : (
        <button
          className="post-sorting-bar-btn"
          onClick={() => setSortMode("top")}
        >
          <i className="fa-solid fa-ranking-star"></i>
          Top
        </button>
      )}
    </div>
  );
}
