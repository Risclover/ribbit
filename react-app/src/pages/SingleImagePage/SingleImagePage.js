import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleImagePage.css";

export function SingleImagePage() {
  const { postId } = useParams();

  const posts = useSelector((state) => state.posts);

  return (
    <div className="single-image-page">
      <img
        src={posts[postId]?.imgUrl}
        className="single-image-page-img"
        alt="Post"
      />
    </div>
  );
}
