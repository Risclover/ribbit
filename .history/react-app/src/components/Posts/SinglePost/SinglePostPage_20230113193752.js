import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../../store/one_post";
import { getPosts } from "../../../store/posts";

export default function SinglePostPage() {
  useEffect(() => {
    getSinglePost(postId);
  }, []);

  return (
    <div className="single-post-page">
      <SinglePost />
    </div>
  );
}
