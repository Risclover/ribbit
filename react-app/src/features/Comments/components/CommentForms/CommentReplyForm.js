import React from "react";
import { CommentForm } from "./CommentForm";

export default function CommentReplyForm({ postId, parentId, onCancel }) {
  return (
    <div className="comment-reply-form-container">
      <CommentForm
        replyForm={true}
        postId={postId}
        parentId={parentId}
        onCancel={onCancel}
      />
    </div>
  );
}
