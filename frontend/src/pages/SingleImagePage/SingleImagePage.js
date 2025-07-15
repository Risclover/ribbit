import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import "./SingleImagePage.css";
import { getPosts } from "@/store";

export function SingleImagePage() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useAppSelector((state) => state.posts);

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
