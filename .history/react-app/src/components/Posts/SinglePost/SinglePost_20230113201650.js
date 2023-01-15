import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import moment from "moment";

export default function SinglePost({ id }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  if (!post) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          {post.title} - {moment(new Date(post.createdAt)).fromNow()} by{" "}
          {post.postAuthor.username}
          <p>{post.content}</p>
        </div>
      )}
    </>
  );
}
