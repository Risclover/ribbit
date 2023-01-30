import React from "react";
import "./SortingBar.css";

export default function SortingBar() {
  return (
    <div className="post-sorting-bar">
      <button className="post-sorting-bar-btn active-sort-btn">
        <i className="fa-solid fa-certificate"></i>
        New
      </button>
      <button className="post-sorting-bar-btn">
        <i className="fa-solid fa-fire-flame-simple"></i>
        Hot
      </button>
      <button className="post-sorting-bar-btn">
        <i className="fa-solid fa-ranking-star"></i>
        Top
      </button>
    </div>
  );
}
