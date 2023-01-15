import React from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const { postId } = useParams();

  return (
    <div className="single-post-page">
      <NavLink to={`/posts/${+postId}`}>
        <SinglePost id={+postId} />
      </NavLink>
    </div>
  );
}
