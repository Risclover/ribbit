import React, { useContext, useState } from "react";
import { PostFeed } from "../../components";
import { CreatePostBar } from "../../components";
import { PostFormatContext } from "../../context/PostFormat";
import { SortingFunction } from "../../utils";

export function CommunityPosts({ commPosts, communityName, user }) {
  const [sortMode, setSortMode] = useState("new");
  const { format } = useContext(PostFormatContext);

  const posts = SortingFunction(commPosts, sortMode);

  return (
    <div
      className={
        format === "Card"
          ? "community-page-left-col"
          : "community-page-left-col-alt"
      }
    >
      {user && <CreatePostBar page="community" communityName={communityName} />}

      <PostFeed
        setSortMode={setSortMode}
        community={true}
        posts={posts}
        sortMode={sortMode}
      />

      {commPosts.length === 0 && (
        <div className="community-no-posts">
          Welcome to your new community! Why don't you write your first post to
          give visitors something to read?
        </div>
      )}
    </div>
  );
}
