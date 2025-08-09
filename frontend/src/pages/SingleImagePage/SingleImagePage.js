import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import "./SingleImagePage.css";
import { getPosts } from "@/store";

export function SingleImagePage() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  useEffect(() => {
    if (!postsLoaded) dispatch(getPosts());
  }, [dispatch, postsLoaded]);

  const posts = useAppSelector((state) => state.posts.posts);

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
