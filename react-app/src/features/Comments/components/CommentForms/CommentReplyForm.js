import React from "react";
import { CommentForm } from "./CommentForm";

export function CommentReplyForm({ postId, parentId, onCancel }) {
  return (
    <div className="comment-reply-form-container">
      <CommentForm
        replyForm
        postId={postId}
        parentId={parentId}
        onCancel={onCancel}
      />
    </div>
  );
}
