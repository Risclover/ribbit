import React, { useEffect, useState } from "react";
import { selectThreadsLoaded, useAppDispatch, useAppSelector } from "@/store";
import { getMessages } from "@/store";
import { createThread } from "@/store";
import { addNotification } from "@/store";
import { getThread } from "@/store";
import { createMessage } from "@/store";
import { getCommunities } from "@/store";
import { getThreads } from "@/store";

export default function useMessageModal({ username }) {
  const dispatch = useAppDispatch();

  const [recipient, setRecipient] = useState(username);
  const [recipientError, setRecipientError] = useState("");
  const [receiver, setReceiver] = useState();
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const allUsers = useAppSelector((state) => Object.values(state.users.users));
  const threadsLoaded = useAppSelector((state) => state.threads.loaded);
  const currentUser = useAppSelector((state) => state.session.user);
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  useEffect(() => {
    for (let user of allUsers) {
      if (username === user.username) {
        break;
      } else {
        if (recipient) {
          if (recipient?.length > 0) {
            const split = recipient.split("");
            let communityName = split.slice(3).join("");
            if (split.slice(0, 3).join("") === "/c/") {
              for (let community of communities) {
                if (community.name === communityName) {
                  setReceiver(community.communityOwner);
                }
              }
            }
          }
        }
      }
    }
  }, [recipient]);

  useEffect(() => {
    if (!threadsLoaded) dispatch(getThreads());
    if (!communitiesLoaded) dispatch(getCommunities());
  }, [threadsLoaded, communitiesLoaded, dispatch]);

  useEffect(() => {
    for (let user of allUsers) {
      if (user?.username === recipient) {
        setReceiver(user);
      }
    }
  }, [recipient, receiver, allUsers]);

  useEffect(() => {
    if (
      currentUser.username === recipient ||
      receiver?.username === currentUser.username
    ) {
      setRecipientError("WARNING: Sorry, you can't message yourself.");
    } else {
      setRecipientError("");
    }
  }, [recipient, receiver, currentUser]);

  const handleSend = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSuccessMsg("Submitting...");
    setRecipientError("");
    setSubjectError("");
    setMessageError("");

    let recipientName;
    if (recipient.slice(0, 3) === "/c/") {
      recipientName = recipient.username;
    } else {
      recipientName = allUsers.filter((user) => user.username === recipient);
    }

    for (let user of allUsers) {
      if (user.username === recipient) {
        setReceiver(user);
      }
    }

    if (recipient.length === 0) {
      setTimeout(() => {
        setSuccessMsg("");
        setRecipientError("please enter a username");
      }, 500);
    } else if (recipientName?.length === 0) {
      setTimeout(() => {
        setSuccessMsg("");
        setRecipientError("that user does not exist");
      }, 500);
    } else {
      setRecipientError("");
      if (subject.length === 0) {
        setTimeout(() => {
          setSuccessMsg("");
          setSubjectError("please enter a subject");
        }, 500);
      } else if (message.length === 0) {
        setTimeout(() => {
          setSuccessMsg("");
          setMessageError("we need something here");
        }, 500);
      } else {
        const threadPayload = {
          receiverId: receiver.id,
          subject: subject,
        };

        const threadData = await dispatch(createThread(threadPayload));

        const thread = await dispatch(getThread(threadData?.thread.id));

        const payload = {
          content: message,
          threadId: threadData?.thread.id,
          receiverId: thread?.users[0].id,
        };
        await dispatch(createMessage(payload));
        dispatch(getMessages());

        setMessage("");
        setSubject("");
        setTimeout(() => {
          setSuccessMsg("your message has been delivered");
        }, 500);
      }
    }
  };

  return {
    recipient,
    setRecipient,
    subject,
    setSubject,
    message,
    setMessage,
    receiver,
    currentUser,
    recipientError,
    subjectError,
    messageError,
    successMsg,
    handleSend,
  };
}
