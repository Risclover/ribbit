import React from "react";
import { Text } from "./Text";

export function CommentContent({ commentContent, comment }) {
  if (!comment?.content) return null;

  return (
    <div className="comment-content">
      <Text content={commentContent} />
    </div>
  );
}
