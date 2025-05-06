import React from "react";
import { Text } from "./Text";

/**
 * Comment's content
 * - commentContent: the comment's content
 * - comment: the comment itself
 */
export function CommentContent({ commentContent, comment }) {
  if (!comment?.content) return null;

  return (
    <div className="comment-content">
      <Text content={commentContent} />
    </div>
  );
}
