import { useCallback, KeyboardEvent as ReactKeyboardEvent } from "react";
import { NavLink } from "react-router-dom";
import { RandomLogo } from "@/layouts";
import { useEscapeKey, useFocusTrap, useScrollLock } from "@/hooks";
import { useAppSelector, RootState } from "@/store";
import { LoggedOutDropdownFace } from "../LoggedOutDropdown/LoggedOutDropdownFace";
import { MobileNavbarBtns } from "./MobileNavbarBtns";
import { HamburgerMenuIcon } from "@/assets";
import "./MobileNavbar.css";

/* ─── Props ─────────────────────────────────────────────────────────────── */
interface MobileNavBarProps {
  setOpenUserDropdown: (v: boolean | ((p: boolean) => boolean)) => void;
  openUserDropdown: boolean;
  setShowSearchScreen: (v: boolean) => void;
  setShowNavSidebar: (v: boolean | ((p: boolean) => boolean)) => void;
  showNavSidebar: boolean;
  showSearchScreen: boolean;
}

const selectUser = (s: RootState) => s.session.user;

export function MobileNavBar({
  setOpenUserDropdown,
  setShowSearchScreen,
  setShowNavSidebar,
  showNavSidebar,
  showSearchScreen,
}: MobileNavBarProps) {
  const user = useAppSelector(selectUser);

  /* lock background scroll when dropdown is open */
  // useScrollLock(openUserDropdown);
  /* stable callbacks ----------------------------------------------------- */

  const openDropdown = useCallback(
    () => setOpenUserDropdown(true),
    [setOpenUserDropdown]
  );

  // const escListener = useCallback(
  //   (e: KeyboardEvent) => e.key === "Escape" && setShowNavSidebar(false),
  //   [setShowNavSidebar]
  // );

  // useEffect(() => {
  //   window.addEventListener("keydown", escListener);
  //   return () => window.removeEventListener("keydown", escListener);
  // }, [escListener]);

  useEscapeKey(() => setShowNavSidebar(false), showNavSidebar);

  return (
    <div className="navbar-nav">
      <div className="logged-out-navbar">
        <div className="logged-out-navbar-right">
          <MobileNavbarBtns
            showSearchScreen={showSearchScreen}
            setShowSearchScreen={setShowSearchScreen}
            setShowNavSidebar={setShowNavSidebar}
          />

          {user ? (
            <button
              className="open-logged-out-user-dropdown"
              aria-label="Open user menu"
              onClick={() => setOpenUserDropdown((p) => !p)}
              // onKeyDown={(e: ReactKeyboardEvent<HTMLButtonElement>) =>
              //   e.key === "Enter" && setOpenUserDropdown((p) => !p)
              // }
            >
              <img
                src={user.profileImg}
                alt={`${user.username}'s avatar`}
                loading="lazy"
              />
            </button>
          ) : (
            <LoggedOutDropdownFace onClick={openDropdown} />
          )}
        </div>
      </div>
    </div>
  );
}
