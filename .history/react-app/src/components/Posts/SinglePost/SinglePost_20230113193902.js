import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";

export default function SinglePost({ postId }) {
  const dispatch = useDispatch();
  //   const { postId } = useParams();
  const post = useSelector((state) => state.singlePost);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  console.log("POST:", post);

  return <div className="single-post-container"></div>;
}
