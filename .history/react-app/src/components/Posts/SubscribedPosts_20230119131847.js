import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
import { getPosts } from "../../store/posts";

export default function SubscribedPosts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const subscriptions = useSelector(
    (state) => state.session.user.subscriptions
  );
  const posts = useSelector((state) => Object.values(state.posts));

  console.log("SUBBIES:", subscriptions);
  useEffect(() => {
    dispatch(getSubscriptions());
  });
  return <div>SubscribedPosts</div>;
}
