import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SinglePost from "./SinglePost/SinglePost";
import { getPosts } from "../../store/posts";

export default function Posts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return <div className="posts-container"></div>;
}
