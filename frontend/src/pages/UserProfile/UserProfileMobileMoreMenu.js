import { FollowBtn } from "components";
import { useOutsideClick } from "hooks";
import React, { useRef } from "react";
import { SendMessage } from "./SendMessage";

export function UserProfileMobileMoreMenu({
  user,
  showMobileMoreMenu,
  setShowMobileMoreMenu,
  userId,
  currentUser,
  username,
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
            <FollowBtn user={user} isProfile={true} />
            <button className="menuitem">Chat</button>
            <SendMessage
              userId={userId}
              currentUser={currentUser}
              username={username}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
