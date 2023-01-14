import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import moment from "moment";

export default function SinglePost({ id }) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => Object.values(state.singlePost));

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [postId]);

  console.log("SINGLE POST:", post[0]);

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
