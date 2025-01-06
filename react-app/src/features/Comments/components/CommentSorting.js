// src/components/CommentSorting.js

import React, { useState, useRef } from "react";
import { useFocusTrap, useOutsideClick } from "hooks";
import "../styles/Comments.css";
import { ChevronDownFilled } from "assets/icons/ChevronDownFilled";

export function CommentSorting({ sortType, setSortType }) {
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const SORT_OPTIONS = ["Best", "Top", "New", "Old"];

  const handleClick = (e, type) => {
    e.preventDefault();
    setSortType(type);
    setShowSortingDropdown(false);
  };

  useOutsideClick(wrapperRef, () => setShowSortingDropdown(false));

  useFocusTrap(showSortingDropdown, wrapperRef);

  return (
    <div className="comment-sorting">
      <div
        className="comment-sorting-face"
        onClick={() => setShowSortingDropdown(!showSortingDropdown)}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setShowSortingDropdown(!showSortingDropdown);
          }
        }}
        aria-haspopup="true"
        aria-expanded={showSortingDropdown}
      >
        <span className="comment-sorting-sortby">Sort By: {sortType}</span>{" "}
        <ChevronDownFilled />
      </div>
      {showSortingDropdown && (
        <div className="comment-sorting-dropdown" ref={wrapperRef} role="menu">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              className={`comment-sorting-dropdown-btn${
                sortType === option ? " sorting-active-btn" : ""
              }`}
              onClick={(e) => handleClick(e, option)}
              role="menuitem"
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(e, option);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
