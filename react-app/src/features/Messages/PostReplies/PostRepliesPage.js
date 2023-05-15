import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageContentMenu from "../MessageContentMenu";
import MessageHead from "../MessageHead";
import { getUserNotifications } from "../../../store/notifications";
import PostReply from "./PostReply";
import "./PostReplies.css";
import { getPosts } from "../../../store/posts";
import { getUsers } from "../../../store/users";

import "../Inbox/Inbox.css";
import "./PostReplies.css";

export default function PostRepliesPage({ setPageTitle }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const postRepliesList = notifications.filter(
    (notification) => notification.type === "post-reply"
  );

  const [markedUnread, setMarkedUnread] = useState(false);

  postRepliesList.sort((a, b) => {
    let postA = new Date(a.createdAt);
    let postB = new Date(b.createdAt);

    return postB - postA;
  });

  useEffect(() => {
    dispatch(getUserNotifications(currentUser.id));
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Messages: Post Replies";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={currentUser?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
          alt="User"
        />
        <span className="nav-left-dropdown-item">Messages</span>
      </div>
    );
  }, [setPageTitle, currentUser?.profile_img]);

  return (
    <div className="inbox-messages-page">
      <MessageHead />
      <div className="inbox-messages-content">
        <MessageContentMenu active="Post Replies" />
        <div className="inbox-messages">
          {postRepliesList.map((post) => (
            <PostReply
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