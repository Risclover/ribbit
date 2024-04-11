import React, { useEffect, useState } from "react";
import "../features/Posts/CreatePost/PostForm.css";
import { CreatePostForm } from "../features/Posts/CreatePost/CreatePostForm";
import { useDispatch, useSelector } from "react-redux";
import { CommunityDetails, CommunityRulesBox, RibbitRules } from "../features";
import { getCommunities, getPosts, getSubscriptions } from "../store";
import { useParams } from "react-router-dom";

export function CreatePostPage({ postType, setPostType, val }) {
  const { communityName } = useParams();
  const dispatch = useDispatch();
  const [community, setCommunity] = useState();
  const communities = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    setPostType(val);
  }, [val]);

  useEffect(() => {
    const currentCommunity = Object.values(communities).find(
      (comm) => comm.name === communityName
    );
    if (currentCommunity) {
      setCommunity(currentCommunity);
    }
  }, [communities, communityName, setCommunity]);

  console.log(community);

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
            <CommunityRulesBox community={community} />
          </>
        )}
        <RibbitRules />
      </div>
    </div>
  );
}
