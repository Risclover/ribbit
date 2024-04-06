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

import { HomeIcon } from "../assets";
import "../features/Posts/Posts.css";

export function HomepageFeed() {
  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(false);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "var(--highlight-color)"
  );

  usePageSettings({
    documentTitle: "Ribbit - Splash into anything",
    icon: (
      <img src={HomeIcon} className="nav-left-dropdown-item-icon" alt="Home" />
    ),
    pageTitle: "Home",
  });

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        <CreatePostBar />
        <NoPostsMessage sortedPosts={sortedPosts} />
        {sortedPosts && sortedPosts.length > 0 && (
          <PostFeed
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
        {viewedPosts || (viewedPosts.length > 0 && <RecentlyViewedPosts />)}
        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </FeedRightColContainer>
    </FeedContainer>
  );
}
