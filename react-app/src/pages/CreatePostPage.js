import React, { useEffect, useState } from "react";
import { CreatePostForm } from "../features/Posts/CreatePost/CreatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { CommunityDetails, CommunityRulesBox, RibbitRules } from "../features";
import { getCommunities, getPosts, getSubscriptions } from "../store";
import { useParams } from "react-router-dom";
import { usePageSettings } from "hooks";
import "../features/Posts/CreatePost/PostForm.css";
import { CreatePostIcon } from "assets/icons/CreatePostIcon";

export function CreatePostPage({ postType, setPostType, val }) {
  const { communityName } = useParams();
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const [community, setCommunity] = useState(
    Object.values(communities).find((comm) => comm.name === communityName)
  );

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    setPostType(val);
  }, [val]);

  usePageSettings({
    documentTitle: "Submit to Ribbit",
    icon: <CreatePostIcon />,
    pageTitle: `Create Post`,
  });

  useEffect(() => {
    const currentCommunity = Object.values(communities).find(
      (comm) => comm.name === communityName
    );
    if (currentCommunity) {
      setCommunity(currentCommunity);
    }
  }, [communities, communityName, setCommunity]);

  return (
    <div className="create-post-page">
      <div className="create-post-page-left">
        <CreatePostForm
          community={community}
          setCommunity={setCommunity}
          postType={postType}
          setPostType={setPostType}
        />
      </div>
      <div className="create-post-page-right">
        {community && (
          <>
            <CommunityDetails community={community} post={null} />
            {Object.values(community.communityRules).length > 0 && (
              <CommunityRulesBox community={community} />
            )}
          </>
        )}
        <RibbitRules />
      </div>
    </div>
  );
}
