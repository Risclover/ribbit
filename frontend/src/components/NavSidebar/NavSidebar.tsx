import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { TfiClose } from "react-icons/tfi";
import { getUsers, useAppDispatch, useAppSelector } from "@/store";
import {
  getFavoriteCommunities,
  getFavoriteUsers,
  getFollowers,
  getSubscriptions,
} from "@/store";
import { NavLeftDropdown } from "@/components";
import {
  useEscapeKey,
  useFocusTrap,
  useOutsideClick,
  useScrollLock,
} from "@/hooks";
import { useIsSmallScreen, useIsMobile } from "hooks"; // ← simple width listeners
import "./NavSidebar.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface NavSidebarProps {
  showNavSidebar: boolean;
  setShowNavSidebar: Dispatch<SetStateAction<boolean>>;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function NavSidebar({
  showNavSidebar,
  setShowNavSidebar,
  setShowDropdown,
}: NavSidebarProps) {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useIsSmallScreen(768);
  const usersLoaded = useAppSelector((state) => state.users.loaded);

  /* ----------  Click outside closes the sidebar  ---------- */
  useOutsideClick(wrapperRef, () => setShowNavSidebar(false), isSmall);

  // local state for the “hamburger ↔ close” icon shown in <NavLeftDropdown>
  const [showIcon, setShowIcon] = useState(false);
  const subsLoaded = useAppSelector((state) => state.subscriptions.loaded);
  /* ----------  Fetch user-specific data once  ---------- */
  useEffect(() => {
    if (!usersLoaded) dispatch(getUsers());
    console.log("users 2");
    dispatch(getFollowers());
    dispatch(getFavoriteUsers());
    if (!subsLoaded) dispatch(getSubscriptions());
    dispatch(getFavoriteCommunities());
  }, [dispatch, usersLoaded, subsLoaded]);

  useEscapeKey(() => setShowNavSidebar(false), showNavSidebar);
  // useScrollLock(showNavSidebar, isSmall);
  useFocusTrap(showNavSidebar, wrapperRef, isSmall);

  /* ----------  Render ---------- */
  return (
    <>
      {showNavSidebar && isSmall && <div className="auth-modal-background" />}

      {showNavSidebar && (
        <div className="nav-sidebar-container" ref={wrapperRef}>
          {/* Close button is hidden on extra-small screens (uses system back-gesture) */}
          {!isSmall && (
            <div className="nav-sidebar-top" id="side-navigation">
              <button
                aria-label="Close navigation sidebar"
                className="close-nav-sidebar-btn"
                onClick={() => {
                  setShowNavSidebar(false);
                  setShowIcon(false);
                }}
              >
                <TfiClose />
              </button>
            </div>
          )}

          <div className="nav-left-normal">
            <NavLeftDropdown
              setShowIcon={setShowIcon}
              setShowDropdown={setShowDropdown}
              setShowNavSidebar={setShowNavSidebar}
            />
          </div>
        </div>
      )}
    </>
  );
}
