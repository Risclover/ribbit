import React from "react";
import { CommentResult } from "./CommentResult";
import { NoResults } from "../NoResults";

export default function CommentResultType({
  isLoading,
  comments,
  query,
  focusSearchBox,
}) {
  if (isLoading) {
    return (
      <div>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <CommentResult.CommentSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <NoResults query={query} focusSearchBox={focusSearchBox} />;
  }

  return comments.map((comment) => (
    <CommentResult key={comment.id} comment={comment} />
  ));
}
