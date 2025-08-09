import React, { useState } from "react";
import { UserAboutBox } from "./UserAboutBox";
import { useAppSelector } from "@/store";
import { useParams } from "react-router-dom";
import { CommunityFeedAbout } from "features";
import { UserOwnedCommunities } from "./UserOwnedCommunities";
import { UserProfilePosts } from "./UserProfilePosts";

export function UserProfileMobile({
  communitiesList,
  showAbout,
  setShowAbout,
  posts,
  sortMode,
  setSortMode,
}) {
  const { userId } = useParams();
  const currentUser = useAppSelector((state) => state.session.user);
  const user = useAppSelector((state) => state.users.users[userId]);
  return (
    <div className="user-profile-mobile-container">
      <UserAboutBox
        currentUser={currentUser}
        user={user}
        username={user?.username}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
      />
      {showAbout && currentUser?.id === +userId && (
        <UserOwnedCommunities
          communitiesList={communitiesList}
          userId={+userId}
        />
      )}
      {!showAbout && (
        <UserProfilePosts
          posts={posts}
          user={user}
          userId={userId}
          sortMode={sortMode}
          setSortMode={setSortMode}
        />
      )}
    </div>
  );
}
