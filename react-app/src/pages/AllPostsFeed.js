import React, { useContext } from "react";
import { CreatePostBar, BackToTop, PostFeed } from "../components";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "../layouts";
import { DeveloperLinksBox, AboutBox, RecentlyViewedPosts } from "../features";
import { PostFormatContext } from "../context";
import { usePageSettings } from "../hooks";
import { usePosts } from "../features/Posts/hooks/usePosts";
import All from "../assets/images/navbar/all-icon2.png";
import "../features/Posts/Posts.css";

export function AllPostsFeed() {
  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(true);
  const { format } = useContext(PostFormatContext);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "#0079d3"
  );

  usePageSettings({
    documentTitle: "c/all",
    icon: <img src={All} className="nav-left-dropdown-item-icon" alt="All" />,
    pageTitle: "All",
  });

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
        {viewedPosts && viewedPosts.length > 0 && <RecentlyViewedPosts />}
        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </FeedRightColContainer>
    </FeedContainer>
  );
}
