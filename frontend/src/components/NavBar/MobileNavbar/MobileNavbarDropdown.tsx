import { useRef } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "@/store";
import { useEscapeKey, useFocusTrap, useOutsideClick } from "@/hooks";

import { NavUserDropdownBox } from "../NavUserDropdown/NavUserDropdownBox";
import { LoggedOutDropdown } from "../LoggedOutDropdown";
import { clsx } from "clsx";

interface MobileNavbarDropdownProps {
  openUserDropdown: boolean;
  setOpenUserDropdown: (open: boolean) => void;
}

export function MobileNavbarDropdown({
  openUserDropdown,
  setOpenUserDropdown,
}: MobileNavbarDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const portalRoot = document.body;

  const user = useAppSelector((s) => s.session.user);

  useEscapeKey(() => setOpenUserDropdown(false), openUserDropdown);

  useFocusTrap(openUserDropdown, wrapperRef);
  useOutsideClick(wrapperRef, () => setOpenUserDropdown(false));

  if (!openUserDropdown) return null;

  const dropdown = (
    <div className="logged-out-user-dropdown-container">
      <div
        className="auth-modal-background"
        onClick={() => setOpenUserDropdown(false)}
      />

      <div
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        className={`logged-out-user-dropdown${openUserDropdown ? " open" : ""}`}
      >
        {user ? (
          <NavUserDropdownBox
            cuser={user}
            setShowDropdown={setOpenUserDropdown}
            showDropdown={openUserDropdown}
          />
        ) : (
          <LoggedOutDropdown
            showDropdown={openUserDropdown}
            setShowDropdown={setOpenUserDropdown}
          />
        )}
      </div>
    </div>
  );

  return createPortal(dropdown, portalRoot);
}
