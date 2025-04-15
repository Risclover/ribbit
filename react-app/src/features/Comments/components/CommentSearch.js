import React from "react";
import { SlClose } from "react-icons/sl";
import { useCommentSearch } from "../hooks/useCommentSearch";
import { MagnifyingGlass } from "@/assets/icons/MagnifyingGlass";

/**
 * A mini search feature for the comments section
 * - searchValue, setSearchValue: search query and its setter
 * - post: post that this comments section is under
 * - setSearchActive: set whether this search feature is currently active or not
 * - setSearchQuery: set the search query (differs from searchValue in that searchValue is the text currently in the input box, while searchQuery is the already searched-for item)
 * - inputRef: ref for the input box for .focus() purposes
 */
export const CommentSearch = ({
  searchValue,
  setSearchValue,
  post,
  setSearchActive,
  setSearchQuery,
  inputRef,
}) => {
  const { handleDismiss, handleEnter } = useCommentSearch({
    post,
    setSearchActive,
    setSearchQuery,
    searchValue,
    setSearchValue,
    inputRef,
  });

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
