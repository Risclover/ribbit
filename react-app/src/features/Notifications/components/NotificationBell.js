import { TfiBell } from "react-icons/tfi";
import { NotificationsDropdown } from "@/features";
import { useNotificationBell } from "../hooks";
import "../styles/Notifications.css";

export function NotificationBell() {
  const {
    showTooltip,
    unreadCount,
    handleOpenDropdown,
    setShowTooltip,
    showDropdown,
    setShowDropdown,
    wrapperRef,
  } = useNotificationBell();

  return (
    <div
      className="notifications-dropdown-wrapper"
      ref={wrapperRef}
      aria-live="polite"
    >
      <button
        className="navbar-button"
        onClick={handleOpenDropdown}
        onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <TfiBell />
        {showTooltip && (
          <span className="navbtn-tooltiptext text2">Notifications</span>
        )}
        {unreadCount > 0 && (
          <div className="notification-number">{unreadCount}</div>
        )}
      </button>
      {showDropdown && (
        <NotificationsDropdown
          msgNum={unreadCount}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
        />
      )}
    </div>
  );
}
