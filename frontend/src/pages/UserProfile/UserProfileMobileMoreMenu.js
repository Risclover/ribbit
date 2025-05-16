import { useOutsideClick } from "hooks";
import React, { useRef } from "react";

export function UserProfileMobileMoreMenu({
  showMobileMoreMenu,
  setShowMobileMoreMenu,
}) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowMobileMoreMenu(false));
  return (
    <div className="logged-out-user-dropdown-container">
      {showMobileMoreMenu && <div className="auth-modal-background"></div>}
      <div
        className={`logged-out-user-dropdown${
          showMobileMoreMenu ? " open" : ""
        }`}
        ref={wrapperRef}
      >
        <div className="user-profile-mobile-menu">
          <div className="community-info-menu">
            <button className="menuitem">Follow</button>
            <button className="menuitem">Chat</button>
            <button className="menuitem">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
