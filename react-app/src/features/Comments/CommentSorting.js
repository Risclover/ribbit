import React, { useState, useRef, useEffect } from "react";
import "./Comments.css";

export default function CommentSorting({ sortType, setSortType }) {
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const handleClick = (e, type) => {
    e.preventDefault();
    setSortType(type);
    setShowSortingDropdown(false);
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSortingDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div className="comment-sorting">
      <div
        className="comment-sorting-face"
        onClick={() => setShowSortingDropdown(!showSortingDropdown)}
      >
        <span className="comment-sorting-sortby">Sort By: {sortType}</span>{" "}
        <i className="fa-solid fa-caret-down"></i>
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
          {sortType === "Controversial" ? (
            <button className="comment-sorting-dropdown-btn sorting-active-btn">
              Controversial
            </button>
          ) : (
            <button
              className="comment-sorting-dropdown-btn"
              onClick={(e) => handleClick(e, "Controversial")}
            >
              Controversial
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
