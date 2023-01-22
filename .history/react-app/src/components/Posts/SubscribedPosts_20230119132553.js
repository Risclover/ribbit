import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
import { getCommunityPosts, getPosts } from "../../store/posts";

export default function SubscribedPosts() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const subscriptions = useSelector((state) =>
    Object.values(state.session.user.subscriptions)
  );
  const [postList, setPostList] = useState([]);
  const posts = useSelector((state) => Object.values(state.posts));
  let postListItems = [];
  console.log("SUBBIES:", subscriptions);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPosts());

    for (let post of posts) {
      for (let sub of subscriptions) {
        console.log("post", post);
        console.log("sub", sub);
        if (post.postCommunity.name === sub.name) {
          postListItems.push(post);
        }
      }
    }
  }, []);
  return <div>SubscribedPosts</div>;
}
