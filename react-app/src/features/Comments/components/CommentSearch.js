import React from "react";
import { SlClose } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { searchPostComments } from "@/store";
import { MagnifyingGlass } from "@/assets/icons/MagnifyingGlass";

export const CommentSearch = ({
  searchValue,
  setSearchValue,
  post,
  setSearchActive,
  setSearchQuery,
  inputRef,
}) => {
  const dispatch = useDispatch();

  const handleDismiss = (e) => {
    e.preventDefault();
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleEnter = async (e) => {
    e.preventDefault();

    const trimmed = searchValue.trim();
    if (trimmed.length > 0) {
      await dispatch(searchPostComments(post.id, trimmed));
      setSearchValue(trimmed);
      setSearchActive(true);
      setSearchQuery(trimmed);
    }
  };

  return (
    <div>
      <label htmlFor="comment-search" className="comment-search-label">
        <div onClick={handleEnter}>
          <MagnifyingGlass height="20px" width="16px" color="#898989" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search comments"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          id="comment-search"
          className="comment-search-input"
          onKeyPress={(e) => e.key === "Enter" && handleEnter(e)}
        />
        {searchValue.length > 0 && (
          <button
            aria-label="Close"
            className="comment-search-dismiss"
            onClick={handleDismiss}
          >
            <SlClose />
          </button>
        )}
      </label>
    </div>
  );
};
