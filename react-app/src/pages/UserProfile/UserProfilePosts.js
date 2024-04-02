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
        <div className="no-posts-div">
          <IoIosPaper />
          <h1 className="head">No Posts Yet</h1>
          <p>This user hasn't created any posts yet. Perhaps they're shy?</p>
        </div>
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
