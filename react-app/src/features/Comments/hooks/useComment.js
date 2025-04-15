import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertTime } from "../utils/convertTime";

/**
 * Custom logic for an individual Comment component.
 */
export function useComment(comment) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content || "");
  const [highlight, setHighlight] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[comment?.postId]);

  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);
  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  useEffect(() => {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/#comment-(\d+)/);
    if (match) {
      const commentIdFromUrl = parseInt(match[1], 10);
      if (commentIdFromUrl === comment.id) {
        setHighlight(true);
      }
    }
  }, [comment.id]);

  return {
    postId: comment?.postId,
    isCollapsed,
    setIsCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    post,
    currentUser,
    editedTime,
    commentTime,
    wasEdited,
    highlight,
  };
}
