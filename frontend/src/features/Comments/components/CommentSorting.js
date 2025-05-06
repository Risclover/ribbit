import React from "react";
import { useFocusTrap, useOutsideClick } from "@/hooks";
import { useCommentSorting } from "../hooks/useCommentSorting";
import { ChevronDownFilled } from "@/assets/icons/ChevronDownFilled";
import "../styles/Comments.css";

/**
 * A dropdown that lets the user pick how to sort comments.
 * - sortType: which sorting option is selected ("Top" by default)
 * - setSortType: set the sorting option
 */
export function CommentSorting({ sortType, setSortType }) {
  const {
    SORT_OPTIONS,
    onOptionClick,
    showDropdown,
    setShowDropdown,
    toggleDropdown,
    wrapperRef,
  } = useCommentSorting({ setSortType });
  useFocusTrap(showDropdown, wrapperRef);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

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
