import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosPaper } from "react-icons/io";
import SortingBar from "../../components/SortingBar/SortingBar";
import SinglePost from "../../features/Posts/SinglePost/SinglePost";

export default function UserProfilePosts({
  user,
  posts,
  userId,
  sortMode,
  setSortMode,
}) {
  return (
    <div className="user-profile-posts-page">
      {user.userPosts > 0 && (
        <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
      )}
      {user.userPosts === 0 && (
        <div className="no-posts-div">
          <IoIosPaper />
          <h1 className="head">No Posts Yet</h1>
          <p>This user hasn't created any posts yet. Perhaps they're shy?</p>
        </div>
      )}
      {posts.map((post) =>
        post.postAuthor.id === +userId ? (
          <NavLink key={post.id} to={`/posts/${post.id}`}>
            <SinglePost
              key={post.id}
              id={post.id}
              isCommunity={false}
              isPage="profile"
              userId={+userId}
            />
          </NavLink>
        ) : (
          ""
        )
      )}
    </div>
  );
}
