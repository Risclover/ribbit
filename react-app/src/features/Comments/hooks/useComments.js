import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ScrollContext } from "@/context";
import { getCommentsForPost } from "@/store";
import { buildNestedComments } from "../utils/buildNestedComments";
import { sortComments } from "../utils/sortComments";

export function useComments({ post, triggerScroll, setTriggerScroll }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { postId } = useParams();
  const { targetRef } = useContext(ScrollContext);

  const url = window.location.href;

  const commentsState = useSelector((state) => state.comments);
  const commentsArray = Object.values(commentsState);

  const [sortType, setSortType] = useState("Top");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [newCommentIds, setNewCommentIds] = useState([]);

  // Get comment ID from URL: comment-#
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

  const nestedComments = useMemo(() => {
    return buildNestedComments(commentsArray);
  }, [commentsArray]);

  // Sort them
  const sortedComments = useMemo(() => {
    // 1) do normal sorting
    const normalSorted = sortComments([...nestedComments], sortType);

    // 2) if any comment is in `newCommentIds`, pin it at the top
    const newlyPosted = normalSorted.filter((c) =>
      newCommentIds.includes(c.id)
    );
    const theRest = normalSorted.filter((c) => !newCommentIds.includes(c.id));

    // newly posted first, then the normal sorted
    return [...newlyPosted, ...theRest];
  }, [nestedComments, sortType, newCommentIds]);

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

  const handleNewComment = (newId) => {
    setNewCommentIds((prev) => [...prev, newId]);
  };

  if (!post?.postComments) {
    return null;
  }

  return {
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
  };
}
