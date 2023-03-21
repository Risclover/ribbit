import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getAllComments } from "../../store/comments";
import { search } from "../../store/search";
import "./SearchResults.css";
import SearchDude from "../../images/search-icon.png";
import SearchResultsPeople from "./SearchResultsPeople";
import SearchResultsCommunities from "./SearchResultsCommunities";
import SearchResultsComments from "./SearchResultsComments";
import SearchResultsPosts from "./SearchResultsPosts";

export default function SearchResults({
  searchQuery,
  setSearchQuery,
  setAdjustQuery,
}) {
  const dispatch = useDispatch();
  const [searchPage, setSearchPage] = useState("Posts");

  const allCommunities = useSelector((state) => state.communities);
  const allUsers = useSelector((state) => state.users);
  const results = useSelector((state) => Object.values(state.search));
  const allComments = useSelector((state) => state.comments);
  const allPosts = useSelector((state) => state.posts);

  const posts = results.filter(
    (post) =>
      post.title &&
      post?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let postList = [];
  for (let i = 0; i < Object.values(allPosts).length; i++) {
    postList.push({
      title: Object.values(allPosts)[i].title,
      author: Object.values(allPosts)[i].postAuthor.username,
      content: Object.values(allPosts)[i].content,
      imgUrl: Object.values(allPosts)[i].imgUrl,
      authorId: Object.values(allPosts)[i].postAuthor.id,
      communityName: Object.values(allPosts)[i].communityName,
      communityId: Object.values(allPosts)[i].communityId,
      communityImg: Object.values(allPosts)[i].communityImg,
      id: Object.values(allPosts)[i].id,
      createdAt: Object.values(allPosts)[i].createdAt,
      updatedAt: Object.values(allPosts)[i].updatedAt,
      votes: Object.values(allPosts)[i].votes,
      postComments: Object.values(allPosts)[i].postComments,
    });
  }

  let communityList = [];
  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityImg: Object.values(allCommunities)[i].communityImg,
      id: Object.values(allCommunities)[i].id,
      description: Object.values(allCommunities)[i].description,
    });
  }

  let userList = [];
  for (let i = 0; i < Object.values(allUsers).length; i++) {
    userList.push({
      profile_img: Object.values(allUsers)[i].profile_img,
      username: Object.values(allUsers)[i].username,
      id: Object.values(allUsers)[i].id,
      karma: Object.values(allUsers)[i].karma,
      about: Object.values(allUsers)[i].about,
    });
  }

  let commentsList = [];
  let comment;

  for (let post of Object.values(allPosts)) {
    let postAuthor = post.postAuthor.username;
    for (let i = 0; i < Object.values(post.postComments).length; i++) {
      comment = {
        postAuthor: postAuthor,
        postId: post.id,
        postTitle: post.title,
        postDate: post.createdAt,
        communityName: post.communityName,
        content: Object.values(post.postComments)[i].content,
        commentAuthor: Object.values(post.postComments)[i].commentAuthor
          .username,
        commentDate: Object.values(post.postComments)[i].createdAt,
        commentEdited: Object.values(post.postComments)[i].updatedAt,
        postEdited: post.updatedAt,
        postUpvotes: post.votes,
        postComments: Object.values(post.postComments).length,
        commentUpvotes: Object.values(post.postComments)[i].votes,
      };
    }
    commentsList.push(comment);
  }

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
    dispatch(search(searchQuery));
    dispatch(getAllComments());
    dispatch(getCommunities());
  }, [dispatch, searchQuery]);

  return (
    <div className="search-results-page">
      <div className="search-results-wrapper">
        {/* Button bar */}
        <div className="search-results-btns">
          <button
            className={
              searchPage === "Posts"
                ? "search-results-btn results-active"
                : "search-results-btn"
            }
            onClick={() => setSearchPage("Posts")}
          >
            Posts
          </button>
          <button
            className={
              searchPage === "Comments"
                ? "search-results-btn results-active"
                : "search-results-btn"
            }
            onClick={() => setSearchPage("Comments")}
          >
            Comments
          </button>
          <button
            className={
              searchPage === "Communities"
                ? "search-results-btn results-active"
                : "search-results-btn"
            }
            onClick={() => setSearchPage("Communities")}
          >
            Communities
          </button>
          <button
            className={
              searchPage === "People"
                ? "search-results-btn results-active"
                : "search-results-btn"
            }
            onClick={() => setSearchPage("People")}
          >
            People
          </button>
        </div>

        {/* Sorting bar */}
        {/* <div className="search-results-sorting">
          {(searchPage === "Posts" || searchPage === "Comments") && (
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
          )}
          {searchPage === "Posts" && (
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
          )}
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
        </div> */}

        {/* Search results */}
        <div className="search-results-main">
          {searchPage === "Posts" && (
            <SearchResultsPosts
              posts={posts}
              setSearchPage={setSearchPage}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              communityList={communityList}
              userList={userList}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
          {searchPage === "Comments" && (
            <SearchResultsComments
              comments={allComments}
              posts={postList}
              searchQuery={searchQuery}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
          {searchPage === "Communities" && (
            <SearchResultsCommunities
              communities={communityList}
              searchQuery={searchQuery}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
          {searchPage === "People" && (
            <SearchResultsPeople
              userList={userList}
              searchQuery={searchQuery}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
        </div>
      </div>
    </div>
  );
}
