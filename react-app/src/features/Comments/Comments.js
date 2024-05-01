import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, searchPostComments } from "../../store";
import { CommentSorting, CommentForm, Comment } from "..";
import "./Comments.css";
import { useHistory } from "react-router-dom";
import { CommentSearch } from "./CommentSearch";
import { CommentSearchPage } from "./CommentSearchPage";
import { NoResults } from "../NewSearch/components/SearchResults/NoResults";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

export function Comments({ post }) {
  const url = window.location.href;
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const inputRef = useRef();

  const comments = useSelector((state) => Object.values(state.comments));
  const [sortType, setSortType] = useState("Best");
  const [showLoader, setShowLoader] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;
  const specificComment = match
    ? comments?.find((comment) => comment.id === +match[1])
    : null;
  const [specificCommentActive, setSpecificCommentActive] = useState(false);

  useEffect(() => {
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (match && match[1]) setSpecificCommentActive(true);
  }, [specificComment]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (sortType === "New") {
    comments.sort((a, b) => {
      let commentA = new Date(a.createdAt);
      let commentB = new Date(b.createdAt);

      return commentB - commentA;
    });
  }

  if (sortType === "Old") {
    comments.sort((a, b) => {
      let commentA = new Date(a.createdAt);
      let commentB = new Date(b.createdAt);

      return commentA - commentB;
    });
  }

  if (sortType === "Best") {
    comments.sort((a, b) => {
      return b.upvotes - a.upvotes;
    });
  }

  if (sortType === "Top") {
    comments.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  const dismissSearch = () => {
    dispatch(getComments(postId));
    setSearchValue("");
    setSearchActive(false);
  };

  const focusSearchBox = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
    <div className="comments-container">
      {!specificCommentActive && <CommentForm postId={postId} />}
      <div className="sort-search">
        {!searchActive && (
          <CommentSorting sortType={sortType} setSortType={setSortType} />
        )}
        {!searchActive && !specificCommentActive && (
          <span className="comment-sort-search-separator">|</span>
        )}
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
      {searchActive && (
        <div className="all-comments-btn">
          Comments with "{searchQuery}"{" "}
          <span className="comment-sort-search-separator">|</span>
          <button onClick={dismissSearch} className="view-all-comments-btn">
            All Comments
          </button>
        </div>
      )}
      {showLoader && (
        <div className="comments-loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!showLoader && (
        <div className="all-comments">
          {comments.length > 0 &&
            !specificCommentActive &&
            comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                commentId={comment.id}
                postId={+postId}
              />
            ))}
          {specificCommentActive && (
            <div className="specific-comment">
              <button
                className="view-all-comments-btn"
                onClick={() => {
                  setSpecificCommentActive(false);
                  history.push(`/posts/${+postId}`);
                }}
              >
                View all comments
              </button>
              <Comment
                key={+commentUrl}
                commentId={+commentUrl}
                postId={+postId}
                specificCommentActive={specificCommentActive}
                comment={specificComment}
              />
            </div>
          )}

          {searchActive && comments.length === 0 && (
            <div className="comments-search-no-results">
              <NoResults query={searchQuery} focusSearchBox={focusSearchBox} />
            </div>
          )}
          {!searchActive && comments.length === 0 && (
            <div className="no-comments-msg">
              <i className="fa-solid fa-comments"></i>
              <h1 className="no-comments-yet">No Comments Yet</h1>
              <p>Be the first to share what you think!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
