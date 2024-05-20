import React, { useEffect, useState } from "react";
import "../features/Posts/CreatePost/PostForm.css";
import { CreatePostForm } from "../features/Posts/CreatePost/CreatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { CommunityDetails, CommunityRulesBox, RibbitRules } from "../features";
import { getCommunities, getPosts, getSubscriptions } from "../store";
import { useParams } from "react-router-dom";
import { usePageSettings } from "hooks";

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
    icon: (
      <svg
        className="nav-left-dropdown-item-icon"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        version="1.1"
        viewBox="0 0 17 17"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g></g>
        <path d="M16 9h-7v7h-1v-7h-7v-1h7v-7h1v7h7v1z"></path>
      </svg>
    ),
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
