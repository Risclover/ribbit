// src/features/Messages/hooks/useMessageSocket.js
import { useEffect, useMemo } from "react";
import { initiateSocket } from "@/socket";
import { useAppDispatch } from "@/store";
// adjust this import to wherever you defined the action creator:
import { setThreadsUnreadTotal } from "@/store/threads";

/**
 * Wire up real-time message events (separate from chat).
 *
 * Server events used:
 *  - "unread_messages_count": { count: number }  -> update badge
 *  - "new_message":            <Message>         -> optional callback
 *  - "new_notification":       <Notification>    -> optional callback
 *
 * @param {object}   params
 * @param {object}   params.user             - the logged-in user (must have id)
 * @param {function} [params.onNewMessage]   - optional handler for "new_message"
 * @param {function} [params.onNotification] - optional handler for "new_notification"
 */
export function useMessageSocket({
  user,
} = {}) {
  const dispatch = useAppDispatch();

  // 1) (Re)create the singleton socket when user changes
  const socket = useMemo(() => initiateSocket(user?.id), [user?.id]);

  // 2) Attach listeners exactly once per socket/user
  useEffect(() => {
    if (!socket || !user) return;

    const handleUnread = ({ count }) =>
      dispatch(setThreadsUnreadTotal(count ?? 0));

    socket.on("unread_messages_count", handleUnread);

    return () => {
      socket.off("unread_messages_count", handleUnread);
    };
  }, [socket, user, dispatch]);
}
