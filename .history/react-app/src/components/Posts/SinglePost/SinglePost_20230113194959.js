import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import moment from "moment";

export default function SinglePost({ postId }) {
  const dispatch = useDispatch();
  //   const { postId } = useParams();
  const post = useSelector((state) => Object.values(state.posts));

  useEffect(() => {
    dispatch(getSinglePost(+postId));
  }, []);

  console.log("POST:", post[0]);

  if (!post[0]) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          {post[0].title} - {moment(new Date(post[0].createdAt)).fromNow()} by{" "}
          {post[0].postAuthor.username}
          <p>{post[0].content}</p>
        </div>
      )}
    </>
  );
}
