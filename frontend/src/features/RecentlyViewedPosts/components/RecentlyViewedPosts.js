import React from "react";
import moment from "moment";
import { RecentlyViewedType } from "./RecentlyViewedType";
import { useRecentlyViewedPosts } from "../hooks";
import "../styles/RecentlyViewedPosts.css";

export function RecentlyViewedPosts() {
  const { isLoading, handleClear, posts } = useRecentlyViewedPosts();

  return (
    <div className="recent-posts-box">
      <div className="recent-posts-head">Recent Posts</div>
      <ul className="recent-post-list">
        <RecentlyViewedType isLoading={isLoading} posts={posts} />
      </ul>
      <button onClick={handleClear} className="recent-posts-foot">
        Clear
      </button>
    </div>
  );
}
