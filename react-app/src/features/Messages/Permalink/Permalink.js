import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getThread, getThreads } from "../../../store/threads";
import MessageHead from "../MessageHead";
import MessageContentMenu from "../MessageContentMenu";
import MessageThread from "../MessageThread";
import { getUsers } from "../../../store/users";
import { getMessages } from "../../../store/messages";

export default function Permalink() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads[+threadId]);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  console.log(threads?.id);
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
