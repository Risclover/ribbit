import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageTitleContext } from "../../../context";
import { getUserNotifications, getPosts, getUsers } from "../../../store";
import { MessageContentMenu, MessageHead, PostReply } from "../..";
import "./PostReplies.css";
import "../Inbox/Inbox.css";

export function PostRepliesPage({ setPageIcon }) {
  const { setPageTitle } = useContext(PageTitleContext);
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
    setPageIcon(
      <img
        src={currentUser?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    );
    setPageTitle(<span className="nav-left-dropdown-item">Messages</span>);
  }, [setPageTitle, setPageIcon, currentUser?.profile_img]);

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
