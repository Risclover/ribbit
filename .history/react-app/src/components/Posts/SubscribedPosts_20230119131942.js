import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";

export default function SubscribedPosts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const subscriptions = useSelector(
    (state) => state.session.user.subscriptions
  );
  const posts = useSelector((state) => state.posts);

  console.log("SUBBIES:", subscriptions);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPosts());
  });
  return <div>SubscribedPosts</div>;
}
