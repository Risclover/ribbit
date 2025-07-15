import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getPosts, getUsers } from "@/store";
import { MessageContentMenu, MessageHead, PostReply } from "../../..";
import "./PostReplies.css";
import "../Inbox/Inbox.css";
import { usePageSettings } from "@/hooks/usePageSettings";
import { v4 as uuidv4 } from "uuid";
import usePostReplies from "@/features/Messages/hooks/usePostReplies";

export function PostRepliesPage() {
  const { postRepliesList } = usePostReplies();
  const currentUser = useAppSelector((state) => state.current.user);

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
            <PostReply key={uuidv4()} notification={post} />
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
