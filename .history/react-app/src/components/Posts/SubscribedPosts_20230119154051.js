import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions, getSubscribers } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";
import "./Posts.css";
import SinglePost from "./SinglePost/SinglePost";

export default function SubscribedPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));
  let postListItems = [];
  //   console.log("SUBBIES:", (posts[0]?.postCommunity.subscribers)[user.id]);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getCommunities());
    dispatch(getSubscribers(1));
  }, []);

  let postList = communities.map(
    (community) =>
      community.subscribers[user?.id] !== undefined && community.communityPosts
  );

  let newList = [];

  postList.forEach((item) => {
    Object.values(item).forEach((thing) => newList.push(thing));
  });

  newList.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);
    return postB - postA;
  });
  console.log(newList);

  console.log("POST LIST", postList);
  if (!user || !communities) return null;

  //   console.log(Object.values(communities).communityPosts);
  return (
    <div className="posts-container">
      {newList.map((post) => (
        <NavLink key={post.id} to={`/posts/${post.id}`}>
          <SinglePost
            key={post.id}
            id={post.id}
            postComments={Object.values(post.postComments).length}
            isCommunity={false}
          />
        </NavLink>
      ))}
    </div>
  );
}
