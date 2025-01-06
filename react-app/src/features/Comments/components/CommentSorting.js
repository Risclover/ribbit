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
          <button
            className={`comment-sorting-dropdown-btn${
              sortType === "Best" && " sorting-active-btn"
            }`}
          >
            Best
          </button>

          <button
            className={`comment-sorting-dropdown-btn${
              sortType === "Top" && " sorting-active-btn"
            }`}
          >
            Top
          </button>
          <button
            className={`comment-sorting-dropdown-btn${
              sortType === "New" && " sorting-active-btn"
            }`}
          >
            New
          </button>
          <button
            className={`comment-sorting-dropdown-btn${
              sortType === "Old" && " sorting-active-btn"
            }`}
          >
            Old
          </button>
        </div>
      )}
    </div>
  );
}
