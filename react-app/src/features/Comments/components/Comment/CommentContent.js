import React from "react";
import { Text } from "./Text";

export function CommentContent({ commentContent, comment }) {
  return (
    <div className="comment-content">
      {comment?.content && <Text content={commentContent} />}
    </div>
  );
}
