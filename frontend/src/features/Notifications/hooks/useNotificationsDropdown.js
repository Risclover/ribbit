// src/features/notifications/hooks/useNotificationsDropdown.js
import { useSelector, useDispatch } from "react-redux";
import { readAllNotifications } from "@/store";
import { groupAndSortNotifications } from "../utils";
import { useEffect } from "react";
import { getUsers } from "store";

export function useNotificationsDropdown() {
  const dispatch = useDispatch();

  // Pull notifications from Redux state
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // Sort + group them
  const { sorted, today, earlier } = groupAndSortNotifications(notifications);

  // Mark them all read
  const markAllRead = (e) => {
    e.preventDefault();
    dispatch(readAllNotifications());
  };

  // Return everything the component needs
  return {
    notifications: sorted, // all, sorted
    today,
    earlier,
    markAllRead,
  };
}
