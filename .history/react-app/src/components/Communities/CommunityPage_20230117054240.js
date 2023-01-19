import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
// import { getCommunityPosts } from "../../store/communities";
import "./CommunityPage.css";
import { getPosts } from "../../store/posts";
import SinglePost from "../Posts/SinglePost/SinglePost";

export default function CommunityPage({ isPage }) {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  const posts = useSelector((state) => Object.values(state.posts));
  let commPosts = posts.filter((post) => post.communityId == communityId);

  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
    dispatch(getPosts());
  }, [communityId, dispatch]);

  if (!community[0]) return null;
  return (
    <div className="community-page-container">
      Hello {community[0].name}
      {commPosts.map((post) => (
        <SinglePost id={post.id} isPage={isPage} />
      ))}
    </div>
  );
}
