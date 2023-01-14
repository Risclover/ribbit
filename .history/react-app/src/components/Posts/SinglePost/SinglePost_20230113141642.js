import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";

export default function SinglePost() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return <div className="single-post-container"></div>;
}
