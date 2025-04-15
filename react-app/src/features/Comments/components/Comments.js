import React from "react";
import { CommentSorting, CommentForm, Comment, NoResults } from "@/features";
import { CommentSearch } from "./CommentSearch";
import { NoCommentsMsg } from "./NoCommentsMsg";
import { useComments } from "../hooks/useComments";
import "../styles/Comments.css";
import { NavLink } from "react-router-dom";

export function Comments({ post, triggerScroll, setTriggerScroll }) {
  const {
    specificCommentActive,
    setSpecificCommentActive,
    specificComment,
    sortedComments,
    focusSearchBox,
    dismissSearch,
    sortType,
    setSortType,
    searchValue,
    setSearchValue,
    searchActive,
    setSearchActive,
    searchQuery,
    setSearchQuery,
    nestedComments,
    targetRef,
    inputRef,
    handleNewComment,
  } = useComments({ post, triggerScroll, setTriggerScroll });

  return (
    <div className="comments-container">
      {/* Not viewing a single specific comment: Show the top-level CommentForm */}
      {!specificCommentActive && (
        <CommentForm postId={post.id} onNewComment={handleNewComment} />
      )}

      {/* Sorting menu */}
      <div className="sort-search" ref={targetRef}>
        {!searchActive && !specificCommentActive && (
          <CommentSorting sortType={sortType} setSortType={setSortType} />
        )}

        {/* small separator */}
        {!searchActive && !specificCommentActive && (
          <span className="comment-sort-search-separator">|</span>
        )}

        {/* Comment search only if not in "view specific comment" mode */}
        {!specificCommentActive && (
          <CommentSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            post={post}
            setSearchActive={setSearchActive}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            inputRef={inputRef}
          />
        )}
      </div>

      {/* Searching */}
      {searchActive && (
        <div className="all-comments-btn">
          <span className="comments-with">Comments with "{searchQuery}"</span>
          <span className="comment-sort-search-separator">|</span>
          <button onClick={dismissSearch} className="view-all-comments-btn">
            All Comments
          </button>
        </div>
      )}

      <div className="all-comments">
        {/* Normal list of sorted comments */}
        {sortedComments.length > 0 &&
          !specificCommentActive &&
          sortedComments.map((c) => (
            <Comment key={c.id} comment={c} level={1} />
          ))}

        {/* Focusing on a specific comment */}
        {specificCommentActive && specificComment && (
          <div className="specific-comment">
            <NavLink
              to={`/posts/${post.id}`}
              className="view-all-comments-btn"
              onClick={() => {
                setSpecificCommentActive(false);
              }}
            >
              View all comments
            </NavLink>
            <Comment comment={specificComment} level={1} />
          </div>
        )}

        {/* Searching but no nested comments found */}
        {searchActive && nestedComments.length === 0 && (
          <div className="comments-search-no-results">
            <NoResults query={searchQuery} focusSearchBox={focusSearchBox} />
          </div>
        )}

        {/* No comments exist at all (and not searching) */}
        {!searchActive && nestedComments.length === 0 && <NoCommentsMsg />}
      </div>
    </div>
  );
}
