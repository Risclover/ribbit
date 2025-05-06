import React from "react";
import { SinglePostSkeleton } from "./SinglePostSkeleton";
import { SinglePost } from "@/features";
import { NoPostsMessage } from "@/components";

export function SinglePostType({ isLoading, posts, isPage, format }) {
  // ① skeletons while loading
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 15 }, (_, i) => (
          <SinglePostSkeleton key={i} />
        ))}
      </>
    );
  }

  // ② no-results after loading completes
  if (posts.length === 0) {
    return <NoPostsMessage />;
  }

  // ③ the real posts
  return (
    <>
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          link={`/posts/${post.id}`}
          id={post.id}
          isPage={isPage}
          format={format}
        />
      ))}
    </>
  );
}
