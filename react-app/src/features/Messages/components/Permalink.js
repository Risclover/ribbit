import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getThreads, getUsers, getMessages } from "@/store";
import { MessageContentMenu, MessageHead, MessageThread } from "../..";

export function Permalink() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads[+threadId]);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="messages-page">
      <MessageHead />
      <div className="messages-content">
        <MessageContentMenu active="Messages" />
        <div className="messages-content-main">
          <MessageThread item={threads} />
        </div>
      </div>
    </div>
  );
}
