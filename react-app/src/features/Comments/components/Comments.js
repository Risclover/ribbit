import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments } from "@/store";
import { CommentSorting, CommentForm, Comment } from "../..";
import { useHistory } from "react-router-dom";
import { CommentSearch } from "./CommentSearch/CommentSearch";
import { NoResults } from "../../NewSearch/components/SearchResults/NoResults";
import { LoadingEllipsis } from "components";
import { useLoader } from "./CommentForms/hooks/useLoader";
import { NoCommentsMsg } from "./NoCommentsMsg";
import { sortComments } from "../utils/sortComments";
import "../styles/Comments.css";

export function Comments({ post }) {
  const history = useHistory();
  const url = window.location.href;
  const dispatch = useDispatch();
  const { postId } = useParams();
  const inputRef = useRef();

  const comments = useSelector((state) => Object.values(state.comments));

  const [sortedComments, setSortedComments] = useState(comments || []);
  const [sortType, setSortType] = useState("Best");
  const showLoader = useLoader();
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;
  const specificComment = match
    ? comments?.find((comment) => comment.id === +commentUrl)
    : null;
  const [specificCommentActive, setSpecificCommentActive] = useState(!!match);

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, post]);

  useEffect(() => {
    if (specificComment) setSpecificCommentActive(true);
  }, [specificComment]);

  useEffect(() => {
    setSortedComments(sortComments(comments, sortType));
  }, [sortType]);

  const dismissSearch = () => {
    dispatch(getComments(post.id));
    setSearchValue("");
    setSearchActive(false);
  };

  const focusSearchBox = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  const commentsList = sortComments(comments, sortType);

  if (!comments || !post.postComments) return null;

  return (
    <div className="comments-container">
      {!specificCommentActive && <CommentForm postId={post.id} />}
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
          Comments with "{searchQuery}"
          <span className="comment-sort-search-separator">|</span>
          <button onClick={dismissSearch} className="view-all-comments-btn">
            All Comments
          </button>
        </div>
      )}
      {showLoader && (
        <div className="comments-loading">
          <LoadingEllipsis loader={showLoader} />
        </div>
      )}
      {!showLoader && (
        <div className="all-comments">
          {commentsList.length > 0 &&
            !specificCommentActive &&
            commentsList?.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                commentId={comment.id}
                postId={post.id}
              />
            ))}
          {specificCommentActive && (
            <div className="specific-comment">
              <button
                className="view-all-comments-btn"
                onClick={() => {
                  setSpecificCommentActive(false);
                  history.push(`/posts/${post.id}`);
                }}
              >
                View all comments
              </button>
              <Comment
                key={+commentUrl}
                commentId={+commentUrl}
                postId={post.id}
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
          {!searchActive && comments.length === 0 && <NoCommentsMsg />}
        </div>
      )}
    </div>
  );
}
