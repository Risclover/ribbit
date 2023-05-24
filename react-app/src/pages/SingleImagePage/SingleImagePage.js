import React from "react";
import "./SingleImagePage.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
export default function SingleImagePage() {
  const { postId } = useParams();

  const posts = useSelector((state) => state.posts);

  const image = posts[postId];
  console.log(image);

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
