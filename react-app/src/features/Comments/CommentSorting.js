import React, { useState, useRef } from "react";
import "./Comments.css";
import { useOutsideClick } from "hooks";

export function CommentSorting({ sortType, setSortType }) {
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const handleClick = (e, type) => {
    e.preventDefault();
    setSortType(type);
    setShowSortingDropdown(false);
  };

  useOutsideClick(wrapperRef, () => setShowSortingDropdown(false));

  return (
    <div className="comment-sorting">
      <div
        className="comment-sorting-face"
        onClick={() => setShowSortingDropdown(!showSortingDropdown)}
      >
        <span className="comment-sorting-sortby">Sort By: {sortType}</span>{" "}
        <svg
          className="XHbKeEqnW58ib9mTN6jnS u_kypUXmB-k1A5TcC8MI9 _2MGxQvIhmM2I5CzPdSJTtM"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
        </svg>
      </div>
      {showSortingDropdown && (
        <div className="comment-sorting-dropdown" ref={wrapperRef}>
          {sortType === "Best" ? (
            <button className="comment-sorting-dropdown-btn sorting-active-btn">
              Best
            </button>
          ) : (
            <button
              className="comment-sorting-dropdown-btn"
              onClick={(e) => handleClick(e, "Best")}
            >
              Best
            </button>
          )}
          {sortType === "Top" ? (
            <button className="comment-sorting-dropdown-btn sorting-active-btn">
              Top
            </button>
          ) : (
            <button
              className="comment-sorting-dropdown-btn"
              onClick={(e) => handleClick(e, "Top")}
            >
              Top
            </button>
          )}
          {sortType === "New" ? (
            <button className="comment-sorting-dropdown-btn sorting-active-btn">
              New
            </button>
          ) : (
            <button
              className="comment-sorting-dropdown-btn"
              onClick={(e) => handleClick(e, "New")}
            >
              New
            </button>
          )}

          {sortType === "Old" ? (
            <button className="comment-sorting-dropdown-btn sorting-active-btn">
              Old
            </button>
          ) : (
            <button
              className="comment-sorting-dropdown-btn"
              onClick={(e) => handleClick(e, "Old")}
            >
              Old
            </button>
          )}
        </div>
      )}
    </div>
  );
}
