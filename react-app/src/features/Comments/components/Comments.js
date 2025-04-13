import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCommentsForPost } from "@/store";
import { ScrollContext } from "@/context";
import { CommentSorting, CommentForm, Comment } from "@/features";
import { sortComments } from "../utils/sortComments";
import { CommentSearch } from "./CommentSearch";
import { NoResults } from "@/features/NewSearch/components/SearchResults/NoResults";
import { NoCommentsMsg } from "./NoCommentsMsg";
import "../styles/Comments.css";

// Helper to convert a flat array of comments into a nested structure
function buildNestedComments(commentsArray) {
  const commentMap = {};
  commentsArray.forEach((c) => {
    commentMap[c.id] = { ...c, children: [] };
  });

  const nested = [];
  commentsArray.forEach((c) => {
    if (c.parentId) {
      // If parent is found, push to parent's children
      if (commentMap[c.parentId]) {
        commentMap[c.parentId].children.push(commentMap[c.id]);
      } else {
        // If the parent doesn't exist in map, treat as top-level
        nested.push(commentMap[c.id]);
      }
    } else {
      nested.push(commentMap[c.id]);
    }
  });

  return nested;
}

export function Comments({ post, triggerScroll, setTriggerScroll }) {
  const { targetRef } = useContext(ScrollContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const inputRef = useRef();

  const url = window.location.href;

  // Redux store
  const commentsState = useSelector((state) => state.comments);
  const commentsArray = Object.values(commentsState);

  // Local state
  const [sortType, setSortType] = useState("Top");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Get comment ID from URL: #comment-123
  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const specificCommentId = match ? parseInt(match[1], 10) : null;

  useEffect(() => {
    dispatch(getCommentsForPost(postId)).then(() => setIsLoaded(true));
  }, [dispatch, postId]);

  // Scroll to targetRef if needed
  useEffect(() => {
    if (isLoaded && triggerScroll && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      setTriggerScroll(false);
    }
  }, [isLoaded, triggerScroll, targetRef, setTriggerScroll]);

  // Build nested
  const nestedComments = useMemo(() => {
    return buildNestedComments(commentsArray);
  }, [commentsArray]);

  // Sort them
  const sortedComments = useMemo(() => {
    return sortComments(nestedComments, sortType);
  }, [nestedComments, sortType]);

  // Attempt to find the specific comment in the flattened commentMap
  const specificComment = commentsState[specificCommentId] || null;
  const [specificCommentActive, setSpecificCommentActive] = useState(!!match);

  const dismissSearch = () => {
    dispatch(getCommentsForPost(post.id));
    setSearchValue("");
    setSearchActive(false);
  };

  const focusSearchBox = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  if (!post?.postComments) {
    return null;
  }

  return (
    <div className="comments-container">
      {/* If not viewing a single specific comment, show the top-level CommentForm */}
      {!specificCommentActive && <CommentForm postId={post.id} />}

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

      {/* If searching */}
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

        {/* If we are focusing on a specific comment */}
        {specificCommentActive && specificComment && (
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
            <Comment comment={specificComment} level={1} />
          </div>
        )}

        {/* If searching but no nested comments found */}
        {searchActive && nestedComments.length === 0 && (
          <div className="comments-search-no-results">
            <NoResults query={searchQuery} focusSearchBox={focusSearchBox} />
          </div>
        )}

        {/* If no comments exist at all (and not searching) */}
        {!searchActive && nestedComments.length === 0 && <NoCommentsMsg />}
      </div>
    </div>
  );
}
