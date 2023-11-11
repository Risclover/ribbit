import React, { useState } from "react";
import SinglePost from "../Posts/SinglePost/SinglePost";
import { NavLink } from "react-router-dom";
import { CreatePostBar, SortingBar } from "../../components";

export default function CommunityPosts({
  commPosts,
  format,
  communityId,
  setFormat,
  user,
  isPage,
  setShowLoginForm,
}) {
  const [sortMode, setSortMode] = useState("new");

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
      {user && (
        <CreatePostBar
          page="community"
          communityId={communityId}
          format={format}
          setFormat={setFormat}
        />
      )}
      <SortingBar
        community={true}
        sortMode={sortMode}
        setSortMode={setSortMode}
        format={format}
        setFormat={setFormat}
      />

      {commPosts.length === 0 && (
        <div className="community-no-posts">
          Welcome to your new community! Why don't you write your first post to
          give visitors something to read?
        </div>
      )}

      {commPosts.map((post, idx) => (
        <NavLink
          key={idx}
          activeClassName="single-post-active"
          to={`/posts/${post.id}`}
        >
          <SinglePost
            id={post.id}
            isPage="community"
            format={format}
            setFormat={setFormat}
            setShowLoginForm={setShowLoginForm}
            post={post}
          />
        </NavLink>
      ))}
    </div>
  );
}
