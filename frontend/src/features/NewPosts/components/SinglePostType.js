import React, { useEffect } from "react";
import { SinglePostSkeleton } from "./SinglePostSkeleton";
import { SinglePost } from "@/features";
import { NoPostsMessage } from "@/components";

export function SinglePostType({
  postsLoaded,
  posts,
  isPage,
  format,
  feedType,
}) {
  useEffect(() => {
    console.log("loaded:", postsLoaded);
  }, [postsLoaded]);
  // ① skeletons while loading
  if (!postsLoaded) {
    return (
      <>
        {Array.from({ length: 15 }, (_, i) => (
          <SinglePostSkeleton key={i} />
        ))}
      </>
    );
  }

  if (postsLoaded && posts.length === 0)
    return <NoPostsMessage type={feedType} />;
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
