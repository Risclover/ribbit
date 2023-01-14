import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePostPage from "./SinglePost/SinglePostPage";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));
  console.log("POSTS:", posts.id);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  //   if (!posts) return null;
  return (
    <div className="posts-container">
      {posts && posts.map((post) => <SinglePost id={post.id} />)}
    </div>
  );
}
