import { useRef, useState } from "react";
import { useAppSelector } from "@/store";
import { useOutsideClick } from "@/hooks";

export function useNotificationBell() {
  const wrapperRef = useRef(null);

  const notifications = useAppSelector((state) =>
    Object.values(state.notifications)
  );
  const unreadMessages = useAppSelector((state) => state.threads.unreadTotal);

  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const unreadCount =
    notifications.filter((n) => !n.isSeen).length + unreadMessages;

  const handleOpenDropdown = (e) => {
    e.preventDefault();
    setShowDropdown((prev) => !prev);
  };

  return {
    handleOpenDropdown,
    showTooltip,
    setShowTooltip,
    showDropdown,
    setShowDropdown,
    unreadCount,
    notifications,
    wrapperRef,
  };
}
