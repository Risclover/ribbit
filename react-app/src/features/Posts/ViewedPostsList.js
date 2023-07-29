import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getViewedPosts } from "../../store/viewed_posts";

export default function ViewedPostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.viewedPosts);

  return (
    <div>
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}
