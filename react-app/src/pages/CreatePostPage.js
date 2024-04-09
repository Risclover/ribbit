import React, { useEffect, useState } from "react";
import "../features/Posts/CreatePost/PostForm.css";
import { CreatePostForm } from "../features/Posts/CreatePost/CreatePostForm";
import { useDispatch } from "react-redux";
import { CommunityDetails, CommunityRulesBox, RibbitRules } from "../features";
import { getCommunities, getPosts, getSubscriptions } from "../store";

export function CreatePostPage({ postType, setPostType, val }) {
  const dispatch = useDispatch();
  const [community, setCommunity] = useState();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    setPostType(val);
  }, [val]);

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
