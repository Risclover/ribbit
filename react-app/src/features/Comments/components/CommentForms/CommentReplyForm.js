import React from "react";
import { CommentForm } from "./CommentForm";

/**
 * The form users use to reply to a specific comment. Although this component is just a <div> wrapped around the <CommentForm> component, it is necessary because of specific styling rules that need to happen for reply forms only.
 * - postId: id of the post these comments are under
 * - parentId: id of the parent comment
 * - onCancel: what should happen if the 'Cancel' button is pressed
 */
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
