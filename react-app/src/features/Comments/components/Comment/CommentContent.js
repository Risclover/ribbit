import React from "react";
import { Text } from "./Text";

export default function CommentContent({ commentContent, comment }) {
  return (
    <div className="comment-content">
      {comment?.content && <Text content={commentContent} />}
    </div>
  );
}
