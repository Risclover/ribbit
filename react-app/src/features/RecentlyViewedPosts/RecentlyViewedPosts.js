import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgNotes } from "react-icons/cg";
import { FiLink } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import moment from "moment";

import { getViewedPosts, removeViewedPosts } from "../../store";

import "./RecentlyViewedPosts.css";
import { RecentlyViewedPost } from "./RecentlyViewedPost";

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

  useEffect(() => {
    const fetchPosts = async () => {
      const arr = [];
      const postList = await dispatch(getViewedPosts());
      postList.ViewedPosts.map((item) => arr.push(item.post));

      setPosts(arr);
    };

    fetchPosts();
  }, []);

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
        {posts
          .slice(0, 5)
          .map((post, idx) => (
            <RecentlyViewedPost post={post} key={idx} idx={idx} />
          ))
          .reverse()}
      </ul>
      <button onClick={handleClear} className="recent-posts-foot">
        Clear
      </button>
    </div>
  );
}
