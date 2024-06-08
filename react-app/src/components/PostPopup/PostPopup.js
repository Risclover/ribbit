import React from "react";
import { useSelector } from "react-redux";
import { useCommunitySettings } from "features/Posts/hooks/useCommunitySettings";
import { SinglePostPage } from "pages";

export const PostPopup = ({ post, ref }) => {
  const community = useSelector((state) => state.communities[post.communityId]);
  useCommunitySettings(community);

  return (
    <div className="post-popup">
      <SinglePostPage selectedPost={post} ref={ref} />
    </div>
  );
};
