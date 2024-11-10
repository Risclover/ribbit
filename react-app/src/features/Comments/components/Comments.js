// Comments.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsForPost } from "@/store"; // Updated Thunk
import { CommentSorting, CommentForm } from "../..";
import { Comment } from "./Comment/Comment";
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

  const comments = useSelector((state) => {
    // Convert the flat state into a nested structure
    const commentsArray = Object.values(state.comments);
    const commentMap = {};
    commentsArray.forEach((comment) => {
      comment.children = [];
      commentMap[comment.id] = comment;
    });
    const nestedComments = [];
    commentsArray.forEach((comment) => {
      if (comment.parentId) {
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].children.push(comment);
        }
      } else {
        nestedComments.push(comment);
      }
    });
    return nestedComments;
  });

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
    dispatch(getCommentsForPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (specificComment) setSpecificCommentActive(true);
  }, [specificComment]);

  useEffect(() => {
    setSortedComments(sortComments(comments, sortType));
  }, [sortType]); // Added 'comments' to dependencies

  const dismissSearch = () => {
    dispatch(getCommentsForPost(post.id));
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
                level={1}
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
                level={1}
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
