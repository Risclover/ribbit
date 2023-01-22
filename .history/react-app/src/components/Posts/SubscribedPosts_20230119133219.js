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
  let postListItems = [];

  const [postList, setPostList] = useState();
  const posts = useSelector((state) => Object.values(state.posts));
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getPosts());

    for (let post of posts) {
      for (let sub of subscriptions) {
        console.log("post", post.postCommunity.name);
        console.log("sub", sub.name);
        if (post.postCommunity.name === sub.name) {
          postListItems.push(post);
        }
      }
    }
  }, [postListItems]);

  console.log("SUBBIES", postListItems);
  return <div>SubscribedPosts</div>;
}
