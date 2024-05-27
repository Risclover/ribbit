import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import {
  getSinglePost,
  getPosts,
  addViewedPost,
  getViewedPosts,
  getCommunitySettings,
  getCommunities,
} from "../store";

import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityDetails,
  CommunitySelectionDropdownCommunity,
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
    dispatch(getCommunities());
    dispatch(getPosts());

    dispatch(addViewedPost(post?.id))
      .then(() => {
        dispatch(getViewedPosts());
      })
      .catch((error) => console.error("Failed to add viewed post:", error));
  }, []);

  if (!post || !community) return null;

  return (
    <div className="single-post-page">
      <div
        className="single-post-page-banner"
        style={{
          background: `var(--community-banner-img)`,
        }}
      >
        <div className="single-post-page-banner-content">
          <div className="single-post-page-community-icon">
            <img
              src={community.communitySettings[community?.id].communityIcon}
              alt={"c/" + community.name + " icon"}
            />
          </div>
          <span className="single-post-page-community-name">
            c/{post?.communityName}
          </span>
        </div>
      </div>
      <div className="single-post-page-main">
        <div className="single-post-left-col">
          <SinglePost id={post.id} post={post} isPage="singlepage" />
          <Comments post={post} />
        </div>
        <div className="single-post-right-col">
          <CommunityDetails
            post={post}
            pageType="singlepage"
            community={community}
          />
          {Object.values(post?.communityRules).length > 0 && (
            <CommunityRulesBox post={post} />
          )}
          <BackToTop />
        </div>
      </div>
    </div>
  );
}
