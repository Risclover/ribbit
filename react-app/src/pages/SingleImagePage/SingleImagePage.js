import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SingleImagePage.css";
import { getPosts } from "../../store";

export function SingleImagePage() {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);

  if (!posts) return null;

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
