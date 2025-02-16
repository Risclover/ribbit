import React from "react";
import { NavLink } from "react-router-dom";

export default function SinglePost({
  link,
  id,
  isPage,
  post,
  handleCommentsBtnClick,
}) {
  return (
    <article className="single-post">
      <NavLink to={`/posts/${post.id}`}>{children}</NavLink>
    </article>
  );
}
