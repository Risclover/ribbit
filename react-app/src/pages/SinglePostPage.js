import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePost } from "../store/one_post";
import { getPosts } from "../store/posts";

import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityDetails,
} from "../features";
import { BackToTop } from "../components";
import { PostFormatContext } from "../context/PostFormat";

export function SinglePostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { setFormat } = useContext(PostFormatContext);

  setFormat("Card");

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getPosts());
  }, [dispatch]);

  const post = useSelector((state) => state.posts[postId]);

  if (!post) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost id={postId} post={post} isPage="singlepage" />
        <Comments post={post} />
      </div>
      <div className="single-post-right-col">
        <CommunityDetails post={post} pageType="singlepage" />
        <CommunityRulesBox post={post} />
        <BackToTop />
      </div>
    </div>
  );
}
