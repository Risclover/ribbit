import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications, getPosts, getUsers } from "@/store";
import { MessageContentMenu, MessageHead, PostReply } from "../../..";
import "./PostReplies.css";
import "../Inbox/Inbox.css";
import { usePageSettings } from "@/hooks/usePageSettings";
import { v4 as uuidv4 } from "uuid";

export function PostRepliesPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

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
    dispatch(getUserNotifications(currentUser?.id));
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "Messages: Post Replies",
    icon: (
      <img
        src={currentUser?.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: "Messages",
  });

  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Post Replies" />
        <div className="inbox-messages">
          {postRepliesList.map((post) => (
            <PostReply
              key={uuidv4()}
              setMarkedUnread={setMarkedUnread}
              markedUnread={markedUnread}
              notification={post}
            />
          ))}
        </div>
        {postRepliesList.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
