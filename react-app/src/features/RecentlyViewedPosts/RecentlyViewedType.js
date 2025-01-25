import React from "react";
import { RecentlyViewedPost } from "./RecentlyViewedPost";
import { v4 as uuidv4 } from "uuid";
export function RecentlyViewedType({ isLoading, posts }) {
  if (isLoading) {
    return (
      <div>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <RecentlyViewedPost.Skeleton key={i} />
          ))}
      </div>
    );
  } else {
    return posts
      .slice(0, 5)
      .map((post, idx) => (
        <RecentlyViewedPost post={post} key={uuidv4()} idx={idx} />
      ))
      .reverse();
  }
}
