import React, { useContext } from "react";
import { BackToTop, SortingBar, CreatePostBar } from "../../components";
import { PostFormatContext } from "../../context";
import {
  DeveloperLinksBox,
  AboutBox,
  RecentlyViewedPosts,
  PostFeed,
} from "../../features";
import Home from "../../assets/images/navbar/home-icon.png";
import { usePageSettings } from "../../hooks/usePageSettings";
import { usePosts } from "./hooks/usePosts";
import "./Posts.css";

export function HomepageFeed() {
  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(false);
  const { format } = useContext(PostFormatContext);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "#0079d3"
  );

  usePageSettings({
    documentTitle: "Ribbit - Splash into anything",
    icon: <img src={Home} className="nav-left-dropdown-item-icon" alt="Home" />,
    pageTitle: "Home",
  });

  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      <div
        className={format === "Card" ? "posts-left-col" : "posts-left-col-alt"}
      >
        <CreatePostBar />
        {!sortedPosts ||
          (sortedPosts.length === 0 && (
            <div className="no-posts-div">
              <i className="fa-solid fa-people-group"></i>
              <h1 className="head">No Subscriptions Yet</h1>
              <p>
                Explore the All feed or the Communities Directory to discover
                new communities.
              </p>
            </div>
          ))}
        {sortedPosts && sortedPosts.length > 0 && (
          <>
            <SortingBar
              sortMode={sortMode}
              setSortMode={setSortMode}
              page="general-feed"
            />
            <PostFeed posts={sortedPosts} sortMode={sortMode} />
          </>
        )}
      </div>
      <div className="posts-right-col">
        <AboutBox
          title="Home"
          description="Your personal Ribbit frontpage. Come here to check in with your favorite communities."
          user={user}
        />
        {viewedPosts && viewedPosts.length > 0 && <RecentlyViewedPosts />}
        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </div>
    </div>
  );
}
