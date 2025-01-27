import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { getViewedPosts, removeViewedPosts } from "@/store";
import { RecentlyViewedType } from "./RecentlyViewedType";
import "./RecentlyViewedPosts.css";

moment.updateLocale("en-cust", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    ss: "1m",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "%dmo",
    MM: "%dmo",
    y: "%dyr",
    yy: "%dyr",
  },
});

export function RecentlyViewedPosts() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const arr = [];
      const postList = await dispatch(getViewedPosts());
      postList.ViewedPosts.map((item) => arr.push(item.post));

      setPosts(arr);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [posts]);

  const handleClear = () => {
    fetch("/api/viewed_posts/delete", { method: "DELETE" })
      .then(() => {
        dispatch(removeViewedPosts());
      })
      .catch((error) => console.error(error));
  };

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
