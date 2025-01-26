// Comments.js
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getCommentsForPost } from "@/store";
import { ScrollContext } from "@/context";
import { CommentSorting, CommentForm, Comment } from "@/features";
import { sortComments } from "../utils/sortComments";
import "../styles/Comments.css";
import { CommentSearch } from "./CommentSearch";
import { NoResults } from "features/NewSearch/components/SearchResults/NoResults";
import { NoCommentsMsg } from "./NoCommentsMsg";

export function Comments({ post, triggerScroll, setTriggerScroll }) {
  const { targetRef } = useContext(ScrollContext);
  const history = useHistory();
  const url = window.location.href;
  const dispatch = useDispatch();
  const { postId } = useParams();
  const inputRef = useRef();

  const commentsState = useSelector((state) => state.comments);

  const { nestedComments, commentMap } = useMemo(() => {
    const commentsArray = Object.values(commentsState);
    const commentMap = {};

    // 1) Build a map of all comments by id
    commentsArray.forEach((c) => {
      commentMap[c.id] = { ...c, children: [] };
    });

    // 2) Build the tree
    const nestedComments = [];
    commentsArray.forEach((c) => {
      const commentCopy = commentMap[c.id];
      if (commentCopy.parentId) {
        if (commentMap[commentCopy.parentId]) {
          commentMap[commentCopy.parentId].children.push(commentCopy);
        } else {
          // parent not found, treat as top-level
          nestedComments.push(commentCopy);
        }
      } else {
        nestedComments.push(commentCopy);
      }
    });

    return { nestedComments, commentMap };
  }, [commentsState]);

  const [sortedComments, setSortedComments] = useState(nestedComments || []);
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [isLoaded, setIsLoaded] = useState(false);

  const commentIdPattern = /#comment-(\d+)/;

  const match = url.match(commentIdPattern);
  const commentUrl = match ? parseInt(match[1]) : null;
  const specificComment = commentUrl ? commentMap[commentUrl] : null;
  const [specificCommentActive, setSpecificCommentActive] = useState(!!match);

  useEffect(() => {
    dispatch(getCommentsForPost(postId));
    setIsLoaded(true);
  }, [dispatch, postId]);

  useEffect(() => {
    if (isLoaded && triggerScroll) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false);
    }
  }, [isLoaded, triggerScroll, targetRef]);

  useEffect(() => {
    if (specificComment) setSpecificCommentActive(true);
  }, [specificComment]);

  useEffect(() => {
    setSortedComments(sortComments(nestedComments, sortType));
  }, [nestedComments, sortType]); // Added 'comments' to dependencies

  const dismissSearch = () => {
    dispatch(getCommentsForPost(post.id));
    setSearchValue("");
    setSearchActive(false);
  };

  const focusSearchBox = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  if (!nestedComments || !post.postComments) return null;

  return (
    <div className="comments-container">
      {!specificCommentActive && <CommentForm postId={post.id} />}
      <div className="sort-search" ref={targetRef}>
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

      <div className="all-comments">
        {sortedComments.length > 0 &&
          !specificCommentActive &&
          sortedComments?.map((comment) => (
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

        {searchActive && nestedComments.length === 0 && (
          <div className="comments-search-no-results">
            <NoResults query={searchQuery} focusSearchBox={focusSearchBox} />
          </div>
        )}
        {!searchActive && nestedComments.length === 0 && <NoCommentsMsg />}
      </div>
    </div>
  );
}
