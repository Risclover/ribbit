import React, { useEffect, useState } from "react";

import {
  BackToTop,
  CreatePostBar,
  PostFeed,
  FeedRightColContainer,
  NoPostsMessage,
} from "../components";
import { FeedContainer, FeedLeftColContainer } from "../layouts";
import { AboutBox, DeveloperLinksBox, RecentlyViewedPosts } from "../features";
import { usePageSettings } from "../hooks";
import { usePosts } from "../features/Posts/hooks/usePosts";

import "../features/Posts/Posts.css";
import { HomeIcon } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "store";
import { getFollowedPosts } from "store";
import { getPosts } from "store";
import { getUserFollowers } from "store";

export function HomepageFeed() {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );
  const followerPosts = useSelector((state) =>
    Object.values(state.followers.posts)
  );

  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(false);

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let cancelled = false;

  //   const fetchPosts = async () => {
  //     setIsLoading(true); // skeletons visible immediately
  //     try {
  //       await dispatch(getSubscriptions());
  //       await dispatch(getUserFollowers(user.id));
  //     } finally {
  //       if (!cancelled) setIsLoading(false);
  //     }
  //   };

  //   fetchPosts();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [dispatch]);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "var(--highlight-color)"
  );

  usePageSettings({
    documentTitle: "Ribbit - Splash into anything",
    icon: <HomeIcon />,
    pageTitle: "Home",
  });

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        <CreatePostBar />
        {!isLoading &&
        subscriptions.length === 0 &&
        followerPosts.length === 0 ? (
          <NoPostsMessage />
        ) : (
          <>
            {sortedPosts && sortedPosts.length > 0 && (
              <PostFeed
                isPage="feedpage"
                posts={sortedPosts}
                sortMode={sortMode}
                setSortMode={setSortMode}
              />
            )}
          </>
        )}
      </FeedLeftColContainer>
      <FeedRightColContainer>
        <AboutBox
          title="Home"
          description="Your personal Ribbit frontpage. Come here to check in with your favorite communities."
          user={user}
        />
        {viewedPosts &&
          Object.values(viewedPosts).flatMap((post) => post).length > 0 && (
            <RecentlyViewedPosts />
          )}
        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </FeedRightColContainer>
    </FeedContainer>
  );
}
