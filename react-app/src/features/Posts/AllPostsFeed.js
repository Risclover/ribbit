import React, { useContext } from "react";
import { SortingBar, CreatePostBar, BackToTop } from "../../components";
import {
  DeveloperLinksBox,
  AboutBox,
  RecentlyViewedPosts,
  PostFeed,
} from "../../features";
import All from "../../assets/images/navbar/all-icon2.png";
import { PostFormatContext } from "../../context/PostFormat";
import { usePageSettings } from "../../hooks/usePageSettings";
import { usePosts } from "./hooks/usePosts";
import "./Posts.css";

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
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      <>
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          {user && <CreatePostBar />}
          <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
          <PostFeed posts={sortedPosts} sortMode={sortMode} />
        </div>
        <div className="posts-right-col">
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
        </div>
      </>
    </div>
  );
}
