import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";

export default function SubscribedPosts() {
  const dispatch = useDispatch();

  const [postList, setPostList] = useState([]);
  const posts = useSelector((state) =>
    Object.values(state.posts.postCommunity.subscribers)
  );
  const user = useSelector((state) => state.session.user);
  let postListItems = [];
  console.log("SUBBIES:", postListItems);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPosts());
  }, []);
  return <div>SubscribedPosts</div>;
}
