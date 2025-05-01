import React from "react";
import { useSelector } from "react-redux";
import { useCommunitySettings } from "@/features";
import { SinglePostPage } from "@/pages";

export const PostPopup = ({ post, ref }) => {
  const community = useSelector(
    (state) => state.communities[post.community.id]
  );
  useCommunitySettings(community);

  return (
    <div className="post-popup">
      <SinglePostPage selectedPost={post} ref={ref} />
    </div>
  );
};
