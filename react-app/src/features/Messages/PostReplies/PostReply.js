import React, { useEffect, useState } from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { HashLink as Link } from "react-router-hash-link";
import {
  addNotification,
  getAllNotifications,
  getUserNotifications,
  readNotification,
  unreadNotification,
} from "../../../store/notifications";
import {
  createMessage,
  getThreads,
  unreadMessage,
} from "../../../store/threads";
import { getMessages } from "../../../store/messages";

export default function PostReply({ notification }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  let comments = useSelector((state) => state.comments);

  const community = posts[notification.postId]?.communityName;
  const postReplySender = users[notification.senderId];

  const [markedUnread, setMarkedUnread] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleUpvote = () => {
    let comment = comments[notification?.commentId];
    console.log("comment:", comment);
  };

  console.log("post:", notification);

  // const handleReply = async (e) => {
  //   e.preventDefault();
  //   if (reply === "") {
  //     setError("we need something here");
  //   } else {
  //     const payload = {
  //       content: reply,
  //       threadId: threadId,
  //       receiverId: message.sender.id,
  //     };
  //     const msg = await dispatch(createMessage(payload));
  //     const notificationsPayload = {
  //       type: "message",
  //       id: msg.id,
  //     };
  //     dispatch(addNotification(notificationsPayload));
  //     dispatch(getThreads());
  //     setReply("");
  //     setShowReplyBox(false);
  //   }
  // };

  const handleUnread = async () => {
    await dispatch(unreadNotification(notification?.id));
    dispatch(getUserNotifications(currentUser.id));

    setMarkedUnread(true);
  };

  const handleRead = async () => {
    await dispatch(readNotification(notification?.id));
    dispatch(getUserNotifications(currentUser.id));
  };

  return (
    <div className="inbox-message" onClick={handleRead}>
      <div className="inbox-message-subject">
        post reply:{" "}
        <NavLink to={`/posts/${notification.postId}`}>
          {notification?.title}
        </NavLink>
      </div>
      <div className="post-reply-main">
        <div className="post-reply-vote-btns">
          <div className="post-reply-upvote" onClick={handleUpvote}>
            <GoArrowUp />
          </div>
          <GoArrowDown />
        </div>
        <div
          className={
            !notification?.read
              ? "post-reply-main-content post-reply-unread"
              : "post-reply-main-content"
          }
        >
          <div
            className={
              notification?.read
                ? "post-reply-author-line"
                : "post-reply-author-line-unread"
            }
          >
            from{" "}
            <NavLink to={`/users/${postReplySender?.id}/profile`}>
              /u/{postReplySender?.username}
            </NavLink>{" "}
            via{" "}
            <NavLink to={`/c/${posts[notification.postId]?.communityId}`}>
              /c/{community}
            </NavLink>{" "}
            sent {moment(notification.createdAt).fromNow()}
          </div>
          <div className="post-reply-content">{notification.content}</div>
          <div className="post-reply-btn-bar">
            <span className="messages-content-message-button">
              <Link
                to={`/posts/${notification?.postId}#comment-${notification?.commentId}`}
              >
                Context
              </Link>
            </span>

            <button
              className="messages-content-message-button"
              onClick={() => handleUnread(notification?.postId)}
            >
              Mark Unread
            </button>
            {/* <button
              className="messages-content-message-button"
              onClick={() => setShowReplyBox(true)}
            >
              Reply
            </button> */}
          </div>
        </div>
        {/* {showReplyBox && (
          <div className="messages-reply-box">
            <textarea
              className="messages-reply-input"
              onChange={(e) => setReply(e.target.value)}
              value={reply}
            ></textarea>
            <div className="messages-reply-error">{error}</div>
            <div className="messages-reply-btns">
              <button className="messages-reply-save-btn" onClick={handleReply}>
                Save
              </button>
              <button
                className="messages-reply-cancel-btn"
                onClick={() => {
                  setShowReplyBox(false);
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
