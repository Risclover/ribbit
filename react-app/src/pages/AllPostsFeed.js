import React from "react";

import { CreatePostBar, BackToTop, PostFeed } from "../components";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "../layouts";
import { DeveloperLinksBox, AboutBox, RecentlyViewedPosts } from "../features";
import { usePageSettings } from "../hooks";
import { usePosts } from "../features/Posts/hooks/usePosts";

import { AllIcon } from "../assets";
import "../features/Posts/Posts.css";

export function AllPostsFeed() {
  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(true);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "var(--highlight-color)"
  );

  usePageSettings({
    documentTitle: "c/all",
    icon: (
      <img src={AllIcon} className="nav-left-dropdown-item-icon" alt="All" />
    ),
    pageTitle: "All",
  });

  console.log("recent posts:", Object.values(viewedPosts));

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        {user && <CreatePostBar />}
        <PostFeed
          posts={sortedPosts}
          sortMode={sortMode}
          setSortMode={setSortMode}
        />
      </FeedLeftColContainer>
      <FeedRightColContainer>
        <AboutBox
          title="c/All"
          description="The most active posts from all of Ribbit. Come here to see new posts
          rising and be a part of the conversation."
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
