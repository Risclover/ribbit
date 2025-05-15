import { TfiBell } from "react-icons/tfi";
import { NotificationsDropdown } from "@/features";
import { useNotificationBell } from "../hooks";
import "../styles/Notifications.css";
import { useIsMobile } from "hooks/useIsMobile";
import { useHistory } from "react-router-dom";

export function NotificationBell() {
  const history = useHistory();
  const {
    showTooltip,
    unreadCount,
    handleOpenDropdown,
    setShowTooltip,
    showDropdown,
    setShowDropdown,
    wrapperRef,
  } = useNotificationBell();

  const isMobile = useIsMobile();

  const handleClick = (e) => {
    
    if (!isMobile) {
      handleOpenDropdown(e);
    } else {
      history.push("/notifications");
    }
  };

  return (
    <div
      className="notifications-dropdown-wrapper"
      ref={wrapperRef}
      aria-live="polite"
    >
      <button
        className="navbar-button"
        onClick={handleClick}
        onMouseEnter={() =>
          !isMobile && setTimeout(() => setShowTooltip(true), 500)
        }
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
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
