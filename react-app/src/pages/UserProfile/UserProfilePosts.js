import React, { useEffect, useState } from "react";
import { IoIosPaper } from "react-icons/io";
import { SortingBar } from "../../components";
import { PostFeed } from "../../components";
import { SortingFunction } from "../../utils";

export function UserProfilePosts({ user, posts, sortMode, setSortMode }) {
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sorted = SortingFunction(posts, sortMode);
    setSortedPosts(sorted);
  }, [posts, sortMode]);

  return (
    <div className="user-profile-posts-page">
      {user?.userPosts === 0 && (
        <>
          <SortingBar
            sortMode={sortMode}
            setSortMode={setSortMode}
            isPage="profile"
          />
          <div className="no-posts-div-profile-container">
            <div className="no-posts-div-profile"></div>
            <span className="no-posts-div-profile-txt">
              hmm...u/{user.username} hasn't posted anything
            </span>
          </div>
        </>
      )}
      <PostFeed
        posts={sortedPosts}
        isPage="profile"
        sortMode={sortMode}
        format="Card"
        setSortMode={setSortMode}
        user={user}
      />
    </div>
  );
}
