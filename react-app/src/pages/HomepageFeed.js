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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="20px"
        y="20px"
        style={{ height: "20px", width: "20px" }}
        viewBox="10.07 15.03 79.86 69.94"
      >
        <style type="text/css"></style>
        <path
          className="st0"
          d="M55.355,17.231l33.658,25.804c1.239,0.949,1.201,2.683,0.039,3.543c-0.957,0.708-3.432,0.432-5.118,0.432  v33.496c0,2.456-2.01,4.466-4.466,4.466c-6.26,0-12.52,0-18.779,0c-0.433,0-0.783-0.35-0.783-0.783v-16.83  c0-2.632-1.051-5.135-2.91-6.994c-6.278-6.278-16.899-1.711-16.899,6.994v16.83c0,0.433-0.35,0.783-0.783,0.783  c-6.26,0-12.52,0-18.779,0c-2.456,0-4.466-2.01-4.466-4.466V47.01h-3.815c-2.041,0-3.04-2.615-1.265-3.975l33.658-25.804  c2.114-1.621,3.796-2.242,5.355-2.201C51.559,14.989,53.241,15.61,55.355,17.231z"
        ></path>
      </svg>
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
