// Comments.js
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsForPost } from "@/store"; // Updated Thunk
import { CommentSorting, CommentForm } from "../..";
import { Comment } from "./Comment/Comment";
import { useHistory } from "react-router-dom";
import { CommentSearch } from "./CommentSearch/CommentSearch";
import { NoResults } from "../../NewSearch/components/SearchResults/NoResults";
import { LoadingEllipsis } from "components";
import { useLoader } from "../hooks/useLoader";
import { NoCommentsMsg } from "./NoCommentsMsg";
import { sortComments } from "../utils/sortComments";
import "../styles/Comments.css";
import ScrollContext from "context/ScrollContext";

export function Comments({ post, triggerScroll, setTriggerScroll }) {
  const { targetRef } = useContext(ScrollContext);
  const history = useHistory();
  const url = window.location.href;
  const dispatch = useDispatch();
  const { postId } = useParams();
  const inputRef = useRef();
  const commentsRef = useRef(null);

  const commentsState = useSelector((state) => state.comments);

  const comments = useMemo(() => {
    const commentsArray = Object.values(commentsState);
    const commentMap = {};

    commentsArray.forEach((comment) => {
      // Create a copy of the comment and add a children array
      commentMap[comment.id] = { ...comment, children: [] };
    });

    const nestedComments = [];

    commentsArray.forEach((comment) => {
      const commentCopy = commentMap[comment.id];
      if (commentCopy.parentId) {
        const parentComment = commentMap[commentCopy.parentId];
        if (parentComment) {
          parentComment.children.push(commentCopy);
        } else {
          // Parent is missing, treat this comment as top-level
          nestedComments.push(commentCopy);
        }
      } else {
        nestedComments.push(commentCopy);
      }
    });

    return nestedComments;
  }, [commentsState]);

  const [sortedComments, setSortedComments] = useState(comments || []);
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [isLoaded, setIsLoaded] = useState(false);

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;
  const specificComment = match
    ? comments?.find((comment) => comment.id === +commentUrl)
    : null;
  const [specificCommentActive, setSpecificCommentActive] = useState(!!match);

  useEffect(() => {
    dispatch(getCommentsForPost(postId));
    setIsLoaded(true);
  }, [dispatch, postId]);

  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("triggerScroll:", triggerScroll);
    console.log("targetRef:", targetRef);
    if (isLoaded && triggerScroll) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false);
    }
  }, [isLoaded, triggerScroll, targetRef]);

  useEffect(() => {
    if (specificComment) setSpecificCommentActive(true);
  }, [specificComment]);

  useEffect(() => {
    setSortedComments(sortComments(comments, sortType));
  }, [comments, sortType]); // Added 'comments' to dependencies

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

        {searchActive && comments.length === 0 && (
          <div className="comments-search-no-results">
            <NoResults query={searchQuery} focusSearchBox={focusSearchBox} />
          </div>
        )}
        {!searchActive && comments.length === 0 && <NoCommentsMsg />}
      </div>
    </div>
  );
}
