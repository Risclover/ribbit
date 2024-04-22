import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgNotes } from "react-icons/cg";
import { FiLink } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import moment from "moment";

import { getViewedPosts, removeViewedPosts } from "../../store";

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

const PostTypeIcon = ({ post }) => {
  if (post?.imgUrl) {
    return (
      <button className="recent-post-type">
        <img src={post?.imgUrl} className="recent-post-type-img" alt="Post" />
      </button>
    );
  }
  if (post?.linkUrl) {
    return (
      <button className="recent-post-type type-link">
        <FiLink />
        <HiOutlineExternalLink />
      </button>
    );
  }
  return (
    <button className="recent-post-type">
      <CgNotes />
    </button>
  );
};

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
        {posts.slice(0, 5).map((post, idx) => (
          <li
            key={idx}
            className={`recent-post-li ${idx === 4 ? "li-last" : ""}`}
          >
            <NavLink to={`/posts/${post?.id}`}>
              <div className="recent-post">
                <PostTypeIcon post={post} />
                <div className="recent-post-content">
                  <div className="recent-post-title">{post?.title}</div>
                  <div className="recent-post-info-bar">
                    {post?.votes} points
                    <span className="recent-post-dot-spacer"></span>
                    {post?.postComments?.length || 0} comments
                    <span className="recent-post-dot-spacer"></span>
                    {moment(post?.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={handleClear} className="recent-posts-foot">
        Clear
      </button>
    </div>
  );
}
