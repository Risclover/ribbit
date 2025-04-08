import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useOutsideClick } from "@/hooks";

export function useNotificationBell() {
  const wrapperRef = useRef(null);

  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
