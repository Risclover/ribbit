import { readMessage, useAppDispatch, useAppSelector } from "@/store";
import React, { useState } from "react";

export default function usePostReply({ notification }) {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.users);
  const posts = useAppSelector((state) => state.posts.posts);

  const [markedUnread, setMarkedUnread] = useState(() => !notification.read);

  const community = posts[notification.postId]?.communityName;
  const postReplySender = users[notification.senderId];

  return { community, postReplySender };
}
