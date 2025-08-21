import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllNotifications } from "@/store";
import { getPosts } from "@/store";

export default function usePostReplies() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.posts.posts);
  const currentUser = useAppSelector((state) => state.session.user);
  const notifications = useAppSelector((state) =>
    Object.values(state.notifications)
  );

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
  }, [dispatch, postsLoaded]);

  return {
    postRepliesList,
  };
}
