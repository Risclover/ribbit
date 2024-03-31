import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePost, getPosts } from "../store";

import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityDetails,
} from "../features";
import { BackToTop } from "../components";
import { PostFormatContext } from "../context/PostFormat";
import { usePageSettings } from "../hooks/usePageSettings";

export function SinglePostPage() {
  const dispatch = useDispatch();

  const { postId } = useParams();
  const { setFormat } = useContext(PostFormatContext);

  const post = useSelector((state) => state.posts[postId]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  usePageSettings({
    documentTitle: post?.title + " : " + post?.communityName,
    icon: (
      <img
        src={post?.communitySettings[post?.communityId].communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    ),
    pageTitle: `c/${post?.communityName}`,
  });

  useEffect(() => {
    setFormat("Card");
    dispatch(getSinglePost(postId));
    dispatch(getPosts());
  }, [dispatch]);

  if (!post) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost id={postId} post={post} isPage="singlepage" />
        <Comments post={post} />
      </div>
      <div className="single-post-right-col">
        <CommunityDetails
          post={post}
          pageType="singlepage"
          community={community}
        />
        {Object.values(post.communityRules).length > 0 && (
          <CommunityRulesBox post={post} />
        )}
        <BackToTop />
      </div>
    </div>
  );
}
