import React, { useState } from "react";
import { CreatePostBar } from "@/components";
import { sortPosts } from "@/utils";
import { PostFeed } from "@/features/Posts/components";
import { useHistory } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { useAppSelector } from "@/store";

export function CommunityPosts({ commPosts, communityName, user }) {
  const history = useHistory();
  const [sortMode, setSortMode] = useState("new");
  const postsLoaded = useAppSelector((state) => state.posts.loaded);
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);
  const posts = sortPosts(commPosts, sortMode);

  const { openLogin } = useAuthFlow();

  return (
    <div>
      {user && <CreatePostBar isCommunityPage communityName={communityName} />}

      {postsLoaded && commPosts.length === 0 ? (
        <div className="community-no-posts-container">
          <div className="community-no-posts-div"></div>
          <div className="community-no-posts-notice">
            <div className="community-no-posts">
              <div className="community-no-posts-title">
                There are no posts in this community
              </div>
              <div className="community-no-posts-content">
                Be the first to till this fertile land.
              </div>
              <button
                className="community-btn-filled blue-btn-filled community-no-posts-btn"
                onClick={() =>
                  user
                    ? history.push(`/c/${communityName}/submit`)
                    : openLogin()
                }
              >
                Add a post
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PostFeed
          setSortMode={setSortMode}
          community={communityName}
          posts={posts}
          sortMode={sortMode}
          isPage="community"
          isLoaded={postsLoaded && communitiesLoaded}
        />
      )}
    </div>
  );
}
