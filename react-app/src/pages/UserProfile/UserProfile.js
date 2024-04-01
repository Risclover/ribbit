import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers, getCommunities } from "../../store";
import {
  UserOwnedCommunities,
  UserAboutBox,
  UserProfilePosts,
} from "../../pages";
import { usePageSettings } from "../../hooks/usePageSettings";
import "./UserProfile.css";

export function UserProfile({ setShowLoginForm, setOpenChat }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [sortMode, setSortMode] = useState("new");

  const user = useSelector((state) => state.users[+userId]);
  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);

  const profilePosts = posts.filter((post) => post.postAuthor.id === +userId);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
    dispatch(getCommunities());
  }, []);

  usePageSettings({
    documentTitle: user?.displayName + " (u/" + user?.username + ") - Ribbit",
    icon: (
      <img
        src={user?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: `u/${user?.username}`,
  });

  if (!user) return null;

  return (
    <div className="user-profile-page">
      <div className="user-profile-left-col">
        <UserProfilePosts
          posts={profilePosts}
          user={user}
          userId={userId}
          sortMode={sortMode}
          setSortMode={setSortMode}
          setShowLoginForm={setShowLoginForm}
        />
      </div>
      <div className="user-profile-right-col">
        <UserAboutBox
          setOpenChat={setOpenChat}
          currentUser={currentUser}
          username={user?.username}
          user={user}
          userId={userId}
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
