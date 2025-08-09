import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
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
import { usePageSettings } from "@/hooks/usePageSettings";
import "./PreviewCommunity.css";
import "../../../Communities/styles/CommunityPage.css";

export function PreviewCommunity() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { communityName } = useParams();
  const { format } = useContext(PostFormatContext);

  // Global state
  const user = useAppSelector((state) => state.session.user);
  const posts = useAppSelector((state) => Object.values(state.posts.posts));
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );
  const favoriteCommunities = useAppSelector(
    (state) => state.favoriteCommunities
  );

  // Identify the relevant community & ID
  const community = communities?.find((c) => c.name === communityName);
  const communityId = community?.id;
  const postsLoaded = useAppSelector((state) => state.posts.loaded);
  // Filter posts for this community
  const commPosts = posts.filter((post) => post.community.id === communityId);
  const subsLoaded = useAppSelector((state) => state.subscriptions.loaded);

  // Fetch data on mount (and/or when communityName changes)
  useEffect(() => {
    // Single effect to load what we need
    if (!subsLoaded) dispatch(getSubscriptions());
    if (!postsLoaded) dispatch(getPosts());
  }, [dispatch, subsLoaded, postsLoaded]);

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
    <div className="preview-community-page-container" tabIndex={-1}>
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
