import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const { postId } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="single-post-page">
      <NavLink to={`/posts/${+postId}`}>
        <SinglePost id={+postId} />
      </NavLink>
    </div>
  );
}
