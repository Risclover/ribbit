import { NotificationsDropdown } from "components";
import { useState } from "react";
import { TfiBell } from "react-icons/tfi";
import { useSelector } from "react-redux";

function NotificationBell() {
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );
  // Filter unread
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="notifications-dropdown-wrapper">
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
          unread={notificationsList.filter(
            (notification) => notification.read === false
          )}
        />
      )}
    </div>
  );
}

export default NotificationBell;
