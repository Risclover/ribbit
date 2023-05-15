import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities } from "../../store/communities";
import { getFollowedPosts, getPosts } from "../../store/posts";
import UserOwnedCommunities from "./UserOwnedCommunities";
import UserAboutBox from "./UserAboutBox";
import "./UserProfile.css";
import UserProfilePosts from "./UserProfilePosts";
import { getUsers } from "../../store/users";

function UserProfile({ setShowLoginForm, setPageTitle }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [page, setPage] = useState("Posts");
  const [sortMode, setSortMode] = useState("new");
  const [communitiesList, setCommunitiesList] = useState([]);
  const user = useSelector((state) => state.users[+userId]);
  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setPage("Posts");
    dispatch(getFollowedPosts());
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    document.title = user?.displayName + " (u/" + user?.username + ") - Ribbit";

    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={user?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
        />
        <span className="nav-left-dropdown-item">u/{user?.username}</span>
      </div>
    );
  }, [user]);

  useEffect(() => {
    let communityList = [];
    for (let community of Object.values(communities)) {
      if (community.communityOwner.username === currentUser?.username) {
        communityList.push(community);
      }
    }

    let postsList = [];
    for (let post of posts) {
      if (post.postAuthor.id === +userId) {
        postsList.push(post);
      }
    }
  }, [currentUser?.username, userId]);

  useEffect(() => {
    let list = [];
    for (let community of Object.values(communities)) {
      if (community.communityOwner.id === +userId) {
        list.push(community);
      }
    }

    setCommunitiesList(list);
  }, [userId, user?.profile_img, communities]);

  if (sortMode === "new") {
    posts.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return postB - postA;
    });
  }

  if (sortMode === "top") {
    posts.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return b.votes - a.votes || postB - postA;
    });
  }

  if (!user) return null;

  return (
    <div className="user-profile-page">
      <div className="user-profile-left-col">
        {page === "Posts" && (
          <UserProfilePosts
            posts={posts}
            user={user}
            userId={userId}
            sortMode={sortMode}
            setSortMode={setSortMode}
            setShowLoginForm={setShowLoginForm}
          />
        )}
      </div>
      <div className="user-profile-right-col">
        <UserAboutBox
          currentUser={currentUser}
          username={user?.username}
          user={user}
          userId={+userId}
        />
        {currentUser?.id === +userId && (
          <UserOwnedCommunities
            communitiesList={communitiesList}
            userId={+userId}
          />
        )}
      </div>
    </div>
  );
}
export default UserProfile;
