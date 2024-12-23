import React, { useState, useRef } from "react";
import { useOutsideClick } from "hooks";
import "../styles/Comments.css";
import { ChevronDownFilled } from "assets/icons/ChevronDownFilled";

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
        <ChevronDownFilled />
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
