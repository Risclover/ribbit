import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedPosts, getPosts } from "../../store/posts";
import UserOwnedCommunities from "./UserOwnedCommunities";
import UserAboutBox from "./UserAboutBox";
import UserProfilePosts from "./UserProfilePosts";
import { getUsers } from "../../store/users";
import "./UserProfile.css";
import { getCommunities } from "../../store/communities";

function UserProfile({
  setShowLoginForm,
  setPageTitle,
  setPageIcon,
  setOpenChat,
  setSelectedChat,
}) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [page, setPage] = useState("Posts");
  const [sortMode, setSortMode] = useState("new");
  const user = useSelector((state) => state.users[+userId]);
  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setPage("Posts");
    dispatch(getFollowedPosts());
    dispatch(getPosts());
    dispatch(getUsers());
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    document.title = user?.displayName + " (u/" + user?.username + ") - Ribbit";
    setPageIcon(
      <img
        src={user?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    );
    setPageTitle(
      <span className="nav-left-dropdown-item">u/{user?.username}</span>
    );
  }, [user]);

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
          setSelectedChat={setSelectedChat}
          setOpenChat={setOpenChat}
          currentUser={currentUser}
          username={user?.username}
          user={user}
          userId={+userId}
        />
        {currentUser?.id === +userId && (
          <UserOwnedCommunities
            communitiesList={Object.values(communities).filter(
              (community) => community.communityOwner.id === +userId
            )}
            userId={+userId}
          />
        )}
      </div>
    </div>
  );
}
export default UserProfile;
