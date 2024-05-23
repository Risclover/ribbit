import { useCommunitySettings } from "features/Posts/hooks/useCommunitySettings";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const PostPopup = ({ post }) => {
  const community = useSelector((state) => state.communities[post.communityId]);
  const { checked, setChecked } = useCommunitySettings(community);

  console.log("checked:", checked);

  return <div>PostPopup</div>;
};
