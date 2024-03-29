import React from "react";
import { NavLink } from "react-router-dom";
import { SinglePost } from "../../Posts";

export function PostFeed({ posts }) {
  return (
    <div>
      {posts.map((post, idx) => (
        <NavLink
          data-testid={`post-${idx}`}
          key={post?.id}
          to={`/posts/${post?.id}`}
        >
          <SinglePost id={post?.id} post={post} />
        </NavLink>
      ))}
    </div>
  );
}
