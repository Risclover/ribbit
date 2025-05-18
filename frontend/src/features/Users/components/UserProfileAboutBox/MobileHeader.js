import { UserProfileMobileMoreMenu } from "pages/UserProfile/UserProfileMobileMoreMenu";
import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export function MobileHeader({ user, about, userId, currentUser, username }) {
  return (
    <div className="user-profile-mobile-display-name">
      <div className="user-profile-mobile-left">
        <h1 className="user-profile-display-name">{user?.displayName}</h1>
        <div className="user-profile-username-year">
          <span>u/{user?.username}</span>
        </div>
      </div>

      <div className="user-profile-mobile-right">
        {about.isMe ? (
          <NavLink to="/settings/profile">
            <IoSettingsSharp />
          </NavLink>
        ) : (
          <>
            <button
              className="user-profile-more-btn"
              onClick={() => about.setShowMobileMenu((p) => !p)}
            >
              ⋯
            </button>

            <UserProfileMobileMoreMenu
              showMobileMoreMenu={about.showMobileMenu}
              setShowMobileMoreMenu={about.setShowMobileMenu}
              user={user}
              userId={userId}
              currentUser={currentUser}
              username={username}
            />
          </>
        )}
      </div>
    </div>
  );
}
