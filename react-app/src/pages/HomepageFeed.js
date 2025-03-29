import React from "react";

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

export function HomepageFeed() {
  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(false);

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
        <NoPostsMessage sortedPosts={sortedPosts} />
        {sortedPosts && sortedPosts.length > 0 && (
          <PostFeed
            isPage="feedpage"
            posts={sortedPosts}
            sortMode={sortMode}
            setSortMode={setSortMode}
          />
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
