import { useCommunitySettings } from "features/Posts/hooks/useCommunitySettings";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const PostPopup = ({ post }) => {
  const community = useSelector((state) => state.communities[post.communityId]);
  useCommunitySettings(community);

  return <div>PostPopup</div>;
};
