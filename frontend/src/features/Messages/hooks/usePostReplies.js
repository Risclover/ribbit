import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllNotifications } from "@/store";
import { getPosts } from "@/store";

export default function usePostReplies({ notification }) {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users);
  const posts = useAppSelector((state) => state.posts.posts);
  const currentUser = useAppSelector((state) => state.session.user);
  const notifications = useAppSelector((state) =>
    Object.values(state.notifications)
  );

  const community = posts[notification.postId]?.communityName;
  const postReplySender = users[notification.senderId];
  const postRepliesList = notifications.filter(
    (notification) => notification.notificationType === "post-reply"
  );

  const [markedUnread, setMarkedUnread] = useState(false);
  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  postRepliesList.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  useEffect(() => {
    if (!postsLoaded) dispatch(getPosts());
  }, [dispatch]);

  return {
    markedUnread,
    setMarkedUnread,
    postRepliesList,
    community,
    postReplySender,
  };
}
