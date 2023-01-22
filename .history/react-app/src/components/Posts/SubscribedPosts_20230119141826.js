import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";

export default function SubscribedPosts() {
  const dispatch = useDispatch();

  const [postList, setPostList] = useState([]);
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  let postListItems = [];
  console.log(
    "SUBBIES:",
    Object.values(posts[0]?.postCommunity.subscribers)[4]
  );
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPosts());
    for (let i = 0; i < posts.length; i++) {
      postListItems.push(posts[i]?.postCommunity.subscribers);
    }
  }, []);

  console.log(postListItems);
  return <div>SubscribedPosts</div>;
}
