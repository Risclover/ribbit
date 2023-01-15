import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePostPage from "./SinglePost/SinglePostPage";
import SinglePost from "./SinglePost/SinglePost";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  //   if (!posts) return null;
  return (
    <div className="posts-container">
      {posts &&
        posts.map((post) => (
          <NavLink to={`/posts/${post.id}`}>
            <SinglePost id={post.id} />
          </NavLink>
        ))}
    </div>
  );
}
