import { useRef } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "@/store";
import { useEscapeKey, useFocusTrap, useOutsideClick } from "@/hooks";

import { NavUserDropdownBox } from "../NavUserDropdown/NavUserDropdownBox";
import { LoggedOutDropdown } from "../LoggedOutDropdown";
import clsx from "clsx";

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

  // Close on Esc only when open
  useEscapeKey(() => setOpenUserDropdown(false), openUserDropdown);

  // Trap focus only when open
  useFocusTrap(openUserDropdown, wrapperRef);

  // Outside click active only when open
  useOutsideClick(wrapperRef, () => setOpenUserDropdown(false), openUserDropdown);

  const dropdown = (
    <div
      className={clsx("logged-out-user-dropdown-container", {
        open: openUserDropdown,
      })}
    >
      {/* Backdrop */}
      <div
        className="auth-modal-background"
        onClick={() => setOpenUserDropdown(false)}
      />

      {/* Sheet wrapper that controls the slide animation */}
      <div
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        className={clsx("logged-out-user-dropdown", {
          open: openUserDropdown,
        })}
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
