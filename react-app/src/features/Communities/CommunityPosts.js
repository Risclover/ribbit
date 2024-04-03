import React, { useState } from "react";
import { PostFeed, CreatePostBar } from "../../components";
import { SortingFunction } from "../../utils";
import { useHistory } from "react-router-dom";

export function CommunityPosts({ commPosts, communityName, user }) {
  const history = useHistory();
  const [sortMode, setSortMode] = useState("new");

  const posts = SortingFunction(commPosts, sortMode);

  return (
    <>
      {user && <CreatePostBar page="community" communityName={communityName} />}

      <PostFeed
        setSortMode={setSortMode}
        community={true}
        posts={posts}
        sortMode={sortMode}
      />

      {commPosts.length === 0 && (
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
                onClick={() => history.push(`/c/${communityName}/submit`)}
              >
                Add a post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
