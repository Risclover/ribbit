import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

import {
  getAllComments,
  getCommunities,
  getPosts,
  search,
  getUsers,
} from "@/store";

import {
  SearchResultsPeople,
  SearchResultsCommunities,
  SearchResultsComments,
  SearchResultsPosts,
  SearchResultsButtons,
  SearchResultsSorting,
} from "@/features";
import SearchDude from "@/assets/images/search-icon.png";
import { usePageSettings } from "@/hooks/usePageSettings";
import { useQuery } from "../../hooks/useQuery";

export function SearchResults({ setSearchQuery, setAdjustQuery }) {
  const dispatch = useDispatch();
  const [searchPage, setSearchPage] = useState("Posts");
  const query = useQuery();
  const searchTerm = query.get("q");
  const queryParameters = new URLSearchParams(window.location.search);
  const type = queryParameters.get("type");
  const name = queryParameters.get("name");

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const allCommunities = useSelector((state) => state.communities);
  const allUsers = useSelector((state) => state.users);
  const results = useSelector((state) => Object.values(state.search));
  const allComments = useSelector((state) => state.comments);
  const allPosts = useSelector((state) => state.posts);

  usePageSettings({
    documentTitle: "Search Results",
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <BsSearch />
      </div>
    ),
    pageTitle: "Search Results",
  });

  let postList = [];
  Object.values(allPosts).forEach((post) => {
    postList.push({
      communityImg: post?.communitySettings?.[post?.communityId].communityIcon,
      bgColor: post?.communitySettings?.[post?.communityId].bgColor,
    });
  });
  for (let i = 0; i < Object.values(allPosts).length; i++) {
    postList.push({
      title: Object.values(allPosts)[i].title,
      author: Object.values(allPosts)[i].postAuthor.username,
      content: Object.values(allPosts)[i].content,
      imgUrl: Object.values(allPosts)[i].imgUrl,
      authorId: Object.values(allPosts)[i].postAuthor.id,
      communityName: Object.values(allPosts)[i].communityName,
      communityId: Object.values(allPosts)[i].communityId,
      communityImg:
        Object.values(allPosts)[i].communitySettings[
          Object.values(allPosts)[i].communityId
        ]?.communityIcon,
      id: Object.values(allPosts)[i].id,
      createdAt: Object.values(allPosts)[i].createdAt,
      updatedAt: Object.values(allPosts)[i].updatedAt,
      votes: Object.values(allPosts)[i].votes,
      postComments: Object.values(allPosts)[i].postComments,
      communityImgBg:
        Object.values(allPosts)[i].communitySettings[
          Object.values(allPosts)[i].communityId
        ]?.baseColor,
    });
  }

  let communityList = Object.values(allCommunities).map((comm) => {
    return {
      name: comm.name,
      members: comm.members,
      communityImg: comm.communitySettings[comm.id].communityIcon,
      id: comm.id,
      description: comm.description,
      bgColor: comm.communitySettings[comm.id].baseColor,
    };
  });

  let userList = [];
  for (let i = 0; i < Object.values(allUsers).length; i++) {
    userList.push({
      profileImg: Object.values(allUsers)[i].profile_img,
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
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getUsers());
    dispatch(search(searchTerm));
    dispatch(getAllComments());
  }, [dispatch, searchTerm]);

  return (
    <div className="search-results-page">
      <div className="search-results-wrapper">
        {/* Button bar */}
        <SearchResultsButtons
          searchPage={searchPage}
          setSearchPage={setSearchPage}
        />

        {/* Sorting bar */}
        <SearchResultsSorting searchPage={searchPage} />

        {/* Search results */}
        <div className="search-results-main">
          {searchPage === "Posts" && (
            <SearchResultsPosts
              posts={postList}
              setSearchPage={setSearchPage}
              searchQuery={searchTerm}
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
              posts={Object.values(allPosts)}
              searchQuery={searchTerm}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
          {searchPage === "Communities" && (
            <SearchResultsCommunities
              communities={communityList}
              searchQuery={searchTerm}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
          {searchPage === "People" && (
            <SearchResultsPeople
              userList={userList}
              searchQuery={searchTerm}
              setAdjustQuery={setAdjustQuery}
              SearchDude={SearchDude}
            />
          )}
        </div>
      </div>
    </div>
  );
}
