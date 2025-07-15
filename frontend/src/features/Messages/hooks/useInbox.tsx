import { useEffect, useMemo, useState } from "react";
import { usePageSettings } from "@/hooks";
import {
  readMessage,
  getMessages,
  getThreads,
  useAppDispatch,
  useAppSelector,
} from "@/store";

/* ------------ Types ---------------------------------------------------- */
interface MessageSummary {
  id: number | string;
  createdAt: string;
  read?: boolean;
}

interface NotificationSummary {
  id: number | string;
  notificationType: string; // "message" | "follow" | …
  createdAt: string;
}

interface UseInboxParams {
  message: MessageSummary;
}

/* ------------ Hook ----------------------------------------------------- */
export function useInbox({ message }: UseInboxParams) {
  const dispatch = useAppDispatch();

  /* ---------- Redux state ---------- */
  const currentUser = useAppSelector((s) => s.session.user);
  const messages = useAppSelector(
    (s) => Object.values(s.messages) as MessageSummary[]
  );
  const threads = useAppSelector((s) => s.threads);
  const notifications = useAppSelector(
    (s) => Object.values(s.notifications) as NotificationSummary[]
  );

  /* ---------- Local state ---------- */
  const [expanded, setExpanded] = useState(true);
  const [markedUnread, setMarkedUnread] = useState(() => !message.read);

  /* ---------- Handlers ------------- */
  const handleRead = async (): Promise<void> => {
    if (!markedUnread) return;
    setMarkedUnread(false);
    await dispatch(readMessage(message.id));
  };

  /* ---------- Derived data --------- */
  const messageList = useMemo(() => {
    const combined = messages.concat(
      notifications.filter((n) => n.notificationType !== "message")
    );
    return combined.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [messages, notifications]);

  /* ---------- Side-effects --------- */
  useEffect(() => {
    dispatch(getThreads());
    dispatch(getMessages());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "inbox-messages: Inbox",
    icon: (
      <img
        src={currentUser?.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User avatar"
      />
    ),
    pageTitle: "Messages",
  });

  /* ---------- Public API ----------- */
  return {
    threads,
    expanded,
    setExpanded,
    messageList,
    handleRead,
    markedUnread,
    setMarkedUnread,
  };
}
