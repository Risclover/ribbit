import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../store/users";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getAllComments } from "../../store/comments";
import { search } from "../../store/search";

import "./SearchResults.css";
import moment from "moment";
export default function SearchResults({ searchQuery, setSearchQuery }) {
  const dispatch = useDispatch();

  const results = useSelector((state) => Object.values(state.search));

  const posts = results.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("RESULTS:", posts);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(search(searchQuery));
    dispatch(getAllComments());
    dispatch(getCommunities());
    dispatch(getUsers());
  }, []);
  return (
    <div className="search-results-page">
      {" "}
      {results.map(
        (result) => result?.name || result?.username || result?.content
      )}
      <div className="search-results-wrapper">
        <div className="search-results-btns">
          <button className="search-results-btn results-active">Posts</button>
          <button className="search-results-btn">Comments</button>
          <button className="search-results-btn">Communities</button>
          <button className="search-results-btn">People</button>
        </div>
        <div className="search-results-main">
          <div className="search-results-left">
            {posts.map((post) => (
              <NavLink to={`/posts/${post.id}`}>
                <div className="search-results-post">
                  <div className="search-results-post-topbar">
                    <img src={post.communityImg} />
                    <NavLink to={`/c/${post.communityId}`}>
                      c/{post.communityName}
                    </NavLink>{" "}
                    <span className="topbar-dot">•</span>{" "}
                    <span className="results-topbar-info">
                      Posted by {post.postAuthor.username}{" "}
                      {moment(new Date(post.createdAt)).fromNow()}
                    </span>
                  </div>
                  <div className="search-results-post-content">
                    <h3 className="search-results-post-title">{post.title}</h3>
                    {post.imgUrl !== null && (
                      <img
                        className="search-results-post-img"
                        src={post.imgUrl}
                      />
                    )}
                  </div>
                  <div className="search-results-post-stats">
                    <span className="search-results-post-stat">
                      {post.votes} {post.votes === 1 ? "upvote" : "upvotes"}
                    </span>
                    <span className="search-results-post-stat">
                      {Object.values(post.postComments).length} comments
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
          {/* <div className="search-results-right"> </div> */}
        </div>
      </div>
    </div>
  );
}
