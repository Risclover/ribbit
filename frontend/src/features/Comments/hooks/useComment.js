import { useEffect, useState } from "react";

/**
 * Custom logic for an individual Comment component.
 */
export function useComment({ comment }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content || "");
  const [highlight, setHighlight] = useState(false);

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

  useEffect(() => {
    if (comment.isDeleted || comment.votes <= -5) {
      setIsCollapsed(true);
    }
  }, [comment]);

  return {
    postId: comment?.postId,
    isCollapsed,
    setIsCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    highlight,
  };
}
