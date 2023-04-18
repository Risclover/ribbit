import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViewedPosts, removeViewedPosts } from "../../store/viewed_posts";
import moment from "moment";
import "./Posts.css";
import { NavLink } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

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

export default function RecentPosts() {
  const dispatch = useDispatch();
  const viewedPosts = useSelector((state) => state.viewedPosts);

  useEffect(() => {
    dispatch(getViewedPosts());
  }, []);

  const clearViewedPosts = () => {
    fetch("/api/viewed_posts", {
      method: "DELETE",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

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
        {Object.values(viewedPosts)
          .slice(-5)
          .map((post, idx) => (
            <li
              className={
                (Object.values(viewedPosts).length < 5 &&
                  idx === Object.values(viewedPosts).length - 1) ||
                (Object.values(viewedPosts).length >= 5 && idx === 4)
                  ? "recent-post-li li-last"
                  : "recent-post-li"
              }
              key={idx}
            >
              <NavLink to={`/posts/${post.id}`}>
                <div className="recent-post">
                  {post.imgUrl !== null && (
                    <button className="recent-post-type">
                      <img src={post.imgUrl} className="recent-post-type-img" />
                    </button>
                  )}
                  {post.linkUrl !== null && (
                    <button className="recent-post-type type-link">
                      <div className="recent-post-type-link">
                        <FiLink />
                      </div>
                      <div className="recent-post-type-link-box">
                        <HiOutlineExternalLink />
                      </div>
                    </button>
                  )}
                  {post.linkUrl === null && post.imgUrl === null && (
                    <button className="recent-post-type">
                      <div className="recent-post-type-post">
                        <CgNotes />
                      </div>{" "}
                    </button>
                  )}
                  <div className="recent-post-content">
                    <div className="recent-post-title">{post.title}</div>
                    <div className="recent-post-info-bar">
                      {post.votes} points
                      <span className="recent-post-dot-spacer"></span>
                      {post.postComments &&
                        Object.values(post.postComments).length}{" "}
                      comments
                      <span className="recent-post-dot-spacer"></span>
                      {moment(new Date(post.createdAt))
                        .locale("en-cust")
                        .fromNow()}
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
