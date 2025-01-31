import React, { useState, useRef } from "react";
import { useFocusTrap, useOutsideClick } from "@/hooks";
import "../styles/Comments.css";
import { ChevronDownFilled } from "@/assets/icons/ChevronDownFilled";

/**
 * A dropdown that lets the user pick how to sort comments.
 */
export function CommentSorting({ sortType, setSortType }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const SORT_OPTIONS = ["Best", "Top", "New", "Old"];

  useOutsideClick(wrapperRef, () => setShowDropdown(false));
  useFocusTrap(showDropdown, wrapperRef);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const onOptionClick = (e, option) => {
    e.preventDefault();
    setSortType(option);
    setShowDropdown(false);
  };

  return (
    <div className="comment-sorting" ref={wrapperRef}>
      <button
        className="comment-sorting-face"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={showDropdown}
      >
        <span className="comment-sorting-sortby">Sort By: {sortType}</span>
        <ChevronDownFilled />
      </button>

      {showDropdown && (
        <div className="comment-sorting-dropdown" role="menu">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              className={`comment-sorting-dropdown-btn ${
                sortType === option ? "sorting-active-btn" : ""
              }`}
              onClick={(e) => onOptionClick(e, option)}
              role="menuitem"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
