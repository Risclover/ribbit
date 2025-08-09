// src/features/notifications/hooks/useNotificationsDropdown.js
import { useAppSelector, useAppDispatch } from "@/store";
import { readAllNotifications } from "@/store";
import { groupAndSortNotifications } from "../utils";
import { useEffect } from "react";
import { getUsers } from "store";

export function useNotificationsDropdown() {
  const dispatch = useAppDispatch();

  // Pull notifications from Redux state
  const notifications = useAppSelector((state) =>
    Object.values(state.notifications)
  );
  const usersLoaded = useAppSelector((state) => state.users.loaded);

  useEffect(() => {
    if (!usersLoaded) dispatch(getUsers());
    console.log("users 4")
  }, [dispatch, usersLoaded]);

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
