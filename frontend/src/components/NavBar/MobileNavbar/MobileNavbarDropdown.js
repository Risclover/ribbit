import { useFocusTrap, useOutsideClick } from "hooks";
import React, { useRef } from "react";
import { NavUserDropdown } from "../NavUserDropdown";
import { NavUserDropdownBox } from "../NavUserDropdown/NavUserDropdownBox";
import { useSelector } from "react-redux";
import { LoggedOutDropdown } from "../LoggedOutDropdown";

export function MobileNavbarDropdown({
  userImg,
  setOpenUserDropdown,
  openUserDropdown,
}) {
  const wrapperRef = useRef(null);
  useFocusTrap(openUserDropdown, wrapperRef);
  useOutsideClick(wrapperRef, () => setOpenUserDropdown(false));
  const user = useSelector((state) => state.session.user);
  return (
    <div className="logged-out-user-dropdown-container">
      {openUserDropdown && <div className="auth-modal-background"></div>}
      <div
        className={`logged-out-user-dropdown${openUserDropdown ? " open" : ""}`}
        ref={wrapperRef}
      >
        {user && (
          <NavUserDropdownBox
            setShowDropdown={setOpenUserDropdown}
            wrapperRef={wrapperRef}
            cuser={user}
          />
        )}
        {!user && <LoggedOutDropdown setShowDropdown={setOpenUserDropdown} />}
      </div>
    </div>
  );
}
