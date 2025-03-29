import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "store";
import { getPosts } from "store";

export default function usePostReplies({ notification }) {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const community = posts[notification.postId]?.communityName;
  const postReplySender = users[notification.senderId];
  const postRepliesList = notifications.filter(
    (notification) => notification.notificationType === "post-reply"
  );

  const [markedUnread, setMarkedUnread] = useState(false);

  postRepliesList.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  return {
    markedUnread,
    setMarkedUnread,
    postRepliesList,
    community,
    postReplySender,
    handleUnread,
    handleRead
  };
}
