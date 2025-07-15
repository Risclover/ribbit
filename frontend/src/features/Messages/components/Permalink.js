import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useParams } from "react-router-dom";
import { getThreads, getUsers, getMessages } from "@/store";
import { MessageContentMenu, MessageHead, MessageThread } from "../..";

export function Permalink() {
  const { threadId } = useParams();
  const dispatch = useAppDispatch();

  const threads = useAppSelector((state) => state.threads[+threadId]);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
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
