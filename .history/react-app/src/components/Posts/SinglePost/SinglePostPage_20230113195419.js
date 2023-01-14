import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../../store/one_post";
import { getPosts } from "../../../store/posts";

export default function SinglePostPage({ id }) {
  //   const { postId } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, []);

  return (
    <div className="single-post-page">
      <NavLink to={`/posts/${id}`}>
        <SinglePost postId={id} />
      </NavLink>
    </div>
  );
}
