import React, { useContext, useState } from "react";
import { SinglePost } from "..";
import { NavLink } from "react-router-dom";
import { CreatePostBar, SortingBar } from "../../components";
import { PostFormatContext } from "../../context/PostFormat";

export function CommunityPosts({
  commPosts,
  communityName,
  user,
  setShowLoginForm,
}) {
  const [sortMode, setSortMode] = useState("new");
  const { format } = useContext(PostFormatContext);

  commPosts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();

    return sortMode === "top"
      ? b.votes - a.votes || postB - postA
      : sortMode === "new"
      ? postB - postA
      : null;
  });

  return (
    <div
      className={
        format === "Card"
          ? "community-page-left-col"
          : "community-page-left-col-alt"
      }
    >
      {user && <CreatePostBar page="community" communityName={communityName} />}
      <SortingBar
        community={true}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />

      {commPosts.length === 0 && (
        <div className="community-no-posts">
          Welcome to your new community! Why don't you write your first post to
          give visitors something to read?
        </div>
      )}

      {commPosts.map((post) => (
        <NavLink
          key={post.id}
          activeClassName="single-post-active"
          to={`/posts/${post.id}`}
        >
          <SinglePost
            id={post.id}
            isPage="community"
            setShowLoginForm={setShowLoginForm}
            post={post}
          />
        </NavLink>
      ))}
    </div>
  );
}
