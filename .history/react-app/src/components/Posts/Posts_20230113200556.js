import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePostPage from "./SinglePost/SinglePostPage";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));

  console.log("POSTS:", posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //   if (!posts) return null;
  return (
    <div className="posts-container">
      {posts && posts.map((post) => <SinglePostPage id={post.id} />)}
    </div>
  );
}
