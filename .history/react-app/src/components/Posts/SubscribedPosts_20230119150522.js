import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions, getSubscribers } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";

export default function SubscribedPosts() {
  const dispatch = useDispatch();

  const [postList, setPostList] = useState([]);
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  let postListItems = [];
  //   console.log("SUBBIES:", (posts[0]?.postCommunity.subscribers)[user.id]);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getCommunities());
    dispatch(getSubscribers(1));
  }, []);

  console.log(postListItems);
  return <div>SubscribedPosts</div>;
}
