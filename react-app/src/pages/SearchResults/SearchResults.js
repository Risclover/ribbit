import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../store/users";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getAllComments } from "../../store/comments";
import { search } from "../../store/search";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import "./SearchResults.css";
import SearchDude from "../../images/search-icon.png";
import moment from "moment";

export default function SearchResults({
  searchQuery,
  setSearchQuery,
  setAdjustQuery,
  adjustQuery,
}) {
  const dispatch = useDispatch();

  const [sortOpen, setSortOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const allCommunities = useSelector((state) => state.communities);
  const results = useSelector((state) => Object.values(state.search));

  const posts = results.filter(
    (post) =>
      post.title &&
      post?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const communities = results.filter(
    (community) =>
      community.name &&
      community?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(communities);

  let communityList = [];
  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityImg: Object.values(allCommunities)[i].communityImg,
      id: Object.values(allCommunities)[i].id,
    });
  }

  console.log(communityList);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(search(searchQuery));
    // dispatch(getAllComments());
    dispatch(getCommunities());
  }, []);

  return (
    <div className="search-results-page">
      {" "}
      {results.map(
        (result) => result?.name || result?.username || result?.content
      )}
      {posts.map((post) => post?.title)}
      <div className="search-results-wrapper">
        <div className="search-results-btns">
          <button className="search-results-btn results-active">Posts</button>
          <button className="search-results-btn">Comments</button>
          <button className="search-results-btn">Communities</button>
          <button className="search-results-btn">People</button>
        </div>
        <div className="search-results-sorting">
          <button
            className={
              !sortOpen
                ? "search-results-sort"
                : "search-results-sort sort-open"
            }
            onClick={(e) => {
              e.preventDefault();
              setSortOpen(!sortOpen);
            }}
          >
            Sort {!sortOpen && <VscChevronDown />}{" "}
            {sortOpen && <VscChevronUp />}
          </button>
          <button
            className={
              !timeOpen
                ? "search-results-time"
                : "search-results-time time-open"
            }
            onClick={(e) => {
              e.preventDefault();
              setTimeOpen(!timeOpen);
            }}
          >
            Time {!timeOpen && <VscChevronDown />}{" "}
            {timeOpen && <VscChevronUp />}
          </button>
          {sortOpen && (
            <div className="search-results-sort-dropdown">
              <button className="sort-dropdown-btn-active">Relevance</button>
              <button>Hot</button>
              <button>Top</button>
              <button>New</button>
              <button>Most Comments</button>
            </div>
          )}
          {timeOpen && (
            <div className="search-results-time-dropdown">
              <button className="sort-dropdown-btn-active">All Time</button>
              <button>Past Year</button>
              <button>Past Month</button>
              <button>Past Week</button>
              <button>Past 24 Hours</button>
              <button>Past Hour</button>
            </div>
          )}
        </div>
        <div className="search-results-main">
          <div className="search-results-left">
            {posts.map((post) => (
              <NavLink to={`/posts/${post.id}`}>
                <div className="search-results-post">
                  <div className="search-results-post-topbar">
                    <img src={post.communityImg} />
                    <NavLink
                      className="results-post-community"
                      to={`/c/${post.communityId}`}
                    >
                      c/{post.communityName}
                    </NavLink>{" "}
                    <span className="topbar-dot">•</span>{" "}
                    <span className="results-topbar-info">
                      Posted by{" "}
                      <NavLink to={`/users/${post.postAuthor.id}/profile`}>
                        <span className="results-post-author">
                          u/{post.postAuthor.username}
                        </span>
                      </NavLink>{" "}
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
            {posts.length === 0 && (
              <div className="no-search-results">
                <img src={SearchDude} />
                <h2>Hm... we couldn't find any results for “{searchQuery}”</h2>
                <p>
                  Double-check your spelling or try different keywords to{" "}
                  <span onClick={() => setAdjustQuery(true)}>
                    adjust your search
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="search-results-right">
            <div className="search-results-right-box">
              <h4>Communities</h4>
              {communityList.filter((community) =>
                community["name"]
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length === 0 && <p>No results</p>}
              {communityList.filter((community) =>
                community["name"]
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length > 0 &&
                communities.map((community) => (
                  <div className="search-results-community">
                    {community.name}
                  </div>
                ))}
            </div>

            <div className="search-results-right-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
