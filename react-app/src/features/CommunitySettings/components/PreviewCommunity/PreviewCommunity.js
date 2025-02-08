// src/features/CommunitySettings/components/PreviewCommunity.jsx
import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getSubscriptions, getCommunities } from "@/store";
import {
  CommunityWelcome,
  CommunityInfoBox,
  CommunityRulesBox,
  CommunityPosts,
  CommunityPageHeader,
} from "@/features";
import { BackToTop } from "@/components";
import { PostFormatContext } from "@/context";
import "../../../Communities/styles/CommunityPage.css";
import { usePageSettings } from "@/hooks/usePageSettings";
import "./PreviewCommunity.css";

export function PreviewCommunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityName } = useParams();
  const { format } = useContext(PostFormatContext);

  // Global state
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));
  const communities = useSelector((state) => Object.values(state.communities));
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  // Identify the relevant community & ID
  const community = communities?.find((c) => c.name === communityName);
  const communityId = community?.id;

  // Filter posts for this community
  const commPosts = posts.filter((post) => post.communityId === communityId);

  // Fetch data on mount (and/or when communityName changes)
  useEffect(() => {
    // Single effect to load what we need
    dispatch(getSubscriptions());
    dispatch(getPosts());
  }, [dispatch]);

  // If current user is not the community owner, redirect to actual community page
  useEffect(() => {
    if (!community || !user) return;
    if (user.id !== community.userId) {
      history.push(`/c/${communityName}`);
    }
  }, [community, user, communityName, history]);

  // Page Settings Hook
  usePageSettings({
    documentTitle: community?.displayName || "Community",
    icon: (
      <img
        style={{
          backgroundColor:
            community?.communitySettings?.[communityId]?.baseColor,
        }}
        src={community?.communitySettings?.[communityId]?.communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    ),
    pageTitle: `c/${communityName}`,
  });

  if (!community) return null; // or return <LoadingSpinner />

  return (
    <div className="preview-community-page-container">
      <CommunityPageHeader community={community} />

      <div className="posts-container">
        <div className="preview-community-body-bg-div"></div>
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          <CommunityPosts
            commPosts={commPosts}
            communityId={community.id}
            user={user}
          />
        </div>
        <div className="posts-right-col">
          <CommunityInfoBox
            user={user}
            favoriteCommunities={favoriteCommunities}
            community={community}
          />
          {Object.values(community?.communityRules || {}).length > 0 && (
            <CommunityRulesBox community={community} />
          )}
          <BackToTop community={true} />
        </div>
      </div>

      <CommunityWelcome
        community={community}
        user={user}
        posts={posts}
        commPosts={commPosts}
      />
    </div>
  );
}
